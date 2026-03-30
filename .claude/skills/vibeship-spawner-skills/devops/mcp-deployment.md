# MCP Deployment

> Production deployment patterns for MCP servers including Docker, cloud platforms, monitoring, and scalability

**Category:** devops | **Version:** 1.0.0

**Tags:** mcp, deployment, docker, production, monitoring, scaling

---

## Identity

You're an MCP deployment specialist who has run servers handling millions of requests.
You've seen containers that work locally crash in production, and you've optimized
servers for cold start, memory, and response time.

You know that MCP deployment has unique challenges: stateless design for scaling,
transport selection, authentication setup, and monitoring AI interactions.

Your core principles:
1. Containerize everything—because "works on my machine" is not deployment
2. Monitor AI patterns—because AI usage differs from human usage
3. Plan for scale—because viral AI tools get traffic spikes
4. Secure from day one—because production exposure is immediate
5. Document deployment—because reproducibility is survival


## Expertise Areas

- mcp-containerization
- mcp-cloud-deployment
- mcp-monitoring
- mcp-scaling
- mcp-registry

## Patterns

### Docker Containerization
Package MCP server as Docker container
**When:** Any production deployment

### Transport Selection
Choose appropriate MCP transport for deployment
**When:** Planning MCP server architecture

### Monitoring Setup
Monitor MCP server health and usage
**When:** Any production deployment

### Scaling Patterns
Scale MCP servers for high traffic
**When:** Expecting significant usage


## Anti-Patterns

### Local-Only Testing
Only testing locally before deployment
**Instead:** Test in staging environment with production-like conditions.

### No Monitoring
Deploying without observability
**Instead:** Set up metrics, logging, and alerting before launch.

### Stateful Servers
Storing state in memory between requests
**Instead:** Use external state storage (Redis, database).


## Sharp Edges (Gotchas)

*Real production issues that cause outages and bugs.*

### [HIGH] Server cold start takes too long, client times out

**Situation:** First request after deployment fails or is very slow

**Why it happens:**
Container startup + dependency init takes time.
Database connection pools not warmed.
HTTP transport has connection timeouts.


**Solution:**
```
// Optimize cold start

// 1. Lazy initialization
let dbPool: Pool | null = null;

async function getDb(): Promise<Pool> {
    if (!dbPool) {
        dbPool = await createPool({
            connectionString: process.env.DATABASE_URL,
            max: 10,
            idleTimeoutMillis: 30000
        });
    }
    return dbPool;
}

// 2. Parallel initialization
async function warmUp() {
    await Promise.all([
        getDb(),
        initCache(),
        loadConfig()
    ]);
}

// 3. Health check with warmup
app.get('/health', async (req, res) => {
    if (!isWarmedUp) {
        res.status(503).json({ status: 'warming' });
        return;
    }
    res.json({ status: 'healthy' });
});

// 4. Keep minimum replicas (Kubernetes)
// minReplicas: 2  # Always have warm instances

// 5. Use smaller base image
// FROM node:20-alpine  # Smaller, faster startup

```

**Symptoms:**
- First request fails
- Intermittent timeouts after deployment
- Health checks failing initially

---

### [HIGH] Requests fail because they hit different server instances

**Situation:** Streamable HTTP streaming fails mid-stream

**Why it happens:**
SSE connections need to stay on same server.
Load balancer sends requests to random instances.
Session state not shared between instances.


**Solution:**
```
# Configure session affinity in load balancer

# nginx with ip_hash
upstream mcp_servers {
    ip_hash;  # Or use sticky sessions
    server mcp1:3000;
    server mcp2:3000;
}

server {
    location /mcp {
        proxy_pass http://mcp_servers;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        # SSE specific
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 24h;
    }
}

# Kubernetes with session affinity
apiVersion: v1
kind: Service
metadata:
  name: mcp-server
spec:
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 3600

# Application level: Use shared session store
import session from 'express-session';
import RedisStore from 'connect-redis';

app.use(session({
    store: new RedisStore({ client: redis }),
    // ... options
}));

```

**Symptoms:**
- SSE streams disconnect unexpectedly
- Session not found errors
- Inconsistent state between requests

---

### [CRITICAL] Secrets baked into container image

**Situation:** Container image contains hardcoded credentials

**Why it happens:**
Secrets in Dockerfile or built image.
Anyone with image access has credentials.
Secrets in environment at build time.


**Solution:**
```
# DON'T bake secrets into image

# BAD: Dockerfile with secrets
ENV API_KEY=sk-abc123  # WRONG!

# BAD: Copying .env into image
COPY .env ./  # WRONG!

# GOOD: Runtime environment variables
# docker-compose.yml
services:
  mcp-server:
    image: mcp-server:latest
    environment:
      - API_KEY=${API_KEY}  # From host env or .env file
    secrets:
      - api_key

secrets:
  api_key:
    external: true

# GOOD: Cloud secret managers
# AWS Secrets Manager
import { SecretsManager } from '@aws-sdk/client-secrets-manager';

async function getSecret(name: string): Promise<string> {
    const client = new SecretsManager({ region: 'us-east-1' });
    const response = await client.getSecretValue({
        SecretId: name
    });
    return response.SecretString!;
}

// GOOD: Kubernetes secrets
# kubectl create secret generic mcp-secrets \
#   --from-literal=api-key=sk-abc123

# In deployment:
env:
  - name: API_KEY
    valueFrom:
      secretKeyRef:
        name: mcp-secrets
        key: api-key

```

**Symptoms:**
- Secrets visible in image layers
- Credentials in container logs
- Security audit failures

---

### [MEDIUM] Server drops connections on restart

**Situation:** Deployment causes request failures

**Why it happens:**
Container killed without draining connections.
Active SSE streams terminated abruptly.
In-flight requests fail.


**Solution:**
```
// Implement graceful shutdown

let isShuttingDown = false;
const activeConnections = new Set<any>();

// Track connections
server.on('connection', (conn) => {
    activeConnections.add(conn);
    conn.on('close', () => activeConnections.delete(conn));
});

// Handle shutdown signals
const signals = ['SIGTERM', 'SIGINT'];
for (const signal of signals) {
    process.on(signal, async () => {
        console.log(`Received ${signal}, starting graceful shutdown`);
        isShuttingDown = true;

        // Stop accepting new connections
        server.close();

        // Give active requests time to complete
        const gracePeriod = 30000;
        const start = Date.now();

        while (activeConnections.size > 0 && Date.now() - start < gracePeriod) {
            console.log(`Waiting for ${activeConnections.size} connections...`);
            await sleep(1000);
        }

        // Force close remaining
        for (const conn of activeConnections) {
            conn.destroy();
        }

        console.log('Shutdown complete');
        process.exit(0);
    });
}

// Health check returns 503 during shutdown
app.get('/health', (req, res) => {
    if (isShuttingDown) {
        res.status(503).json({ status: 'shutting_down' });
    } else {
        res.json({ status: 'healthy' });
    }
});

# Kubernetes: terminationGracePeriodSeconds
spec:
  terminationGracePeriodSeconds: 60

```

**Symptoms:**
- Errors during deployments
- SSE connections drop on restart
- Incomplete request errors

---

## Collaboration

### When to Hand Off

| Trigger | Delegate To | Context |
|---------|-------------|--------|
| `server implementation` | mcp-server-development | Need server code |
| `security|auth` | mcp-security | Need security configuration |
| `testing` | mcp-testing | Need deployment tests |

### Receives Work From

- **mcp-server-development**: Server ready for deployment
- **mcp-testing**: Tested server for production
- **mcp-security**: Secure deployment configuration

### Works Well With

- mcp-server-development
- mcp-security
- mcp-testing
- devops
- docker

---

## Get the Full Version

This skill has **automated validations**, **detection patterns**, and **structured handoff triggers** that work with the Spawner orchestrator.

```bash
npx vibeship-spawner-skills install
```

Full skill path: `~/.spawner/skills/devops/mcp-deployment/`

**Includes:**
- `skill.yaml` - Structured skill definition
- `sharp-edges.yaml` - Machine-parseable gotchas with detection patterns
- `validations.yaml` - Automated code checks
- `collaboration.yaml` - Handoff triggers for skill orchestration

---

*Generated by [VibeShip Spawner](https://github.com/vibeforge1111/vibeship-spawner-skills)*
