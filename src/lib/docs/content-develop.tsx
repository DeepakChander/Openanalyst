import type { ContentMap } from './types';

export const developPages: ContentMap = {
  'sdk': {
    title: 'SDK',
    description: 'Integrate OpenAnalyst into your applications using the official JavaScript/TypeScript and Python SDKs. Full access to analytics, reporting, agents, and data export.',
    content: (
      <>
        <h2>Overview</h2>
        <p>
          The OpenAnalyst SDK provides first-class programmatic access to every capability of the
          platform. Whether you are embedding analytics inside a product, automating report
          generation, or orchestrating AI agents from your own code, the SDK exposes a clean,
          consistent interface across JavaScript/TypeScript and Python.
        </p>
        <p>
          Both SDKs share an identical conceptual model: you initialize a client with your API key,
          then call methods that map directly to platform features. All network calls are
          asynchronous, responses are strongly typed, and errors follow a predictable structure that
          makes them easy to handle and log.
        </p>

        <h2>Supported Languages</h2>
        <p>
          OpenAnalyst officially maintains and supports two SDK packages:
        </p>
        <ul>
          <li><strong>JavaScript / TypeScript</strong> — published to npm as <code>@openanalyst/sdk</code>. Ships with full TypeScript type definitions. Compatible with Node.js 18+ and all modern bundlers (Webpack, Vite, esbuild, Rollup).</li>
          <li><strong>Python</strong> — published to PyPI as <code>openanalyst</code>. Requires Python 3.9+. Supports both synchronous and <code>asyncio</code>-based usage via the <code>AsyncClient</code> class.</li>
        </ul>
        <p>
          Community-maintained clients for Ruby, Go, PHP, and Java are listed in the Ecosystem
          section of this documentation.
        </p>

        <h2>Installation</h2>
        <p>Install the JavaScript/TypeScript SDK using your preferred package manager:</p>
        <pre><code>{`# npm
npm install @openanalyst/sdk

# yarn
yarn add @openanalyst/sdk

# pnpm
pnpm add @openanalyst/sdk`}</code></pre>

        <p>Install the Python SDK from PyPI:</p>
        <pre><code>{`pip install openanalyst

# With optional async support (already included, shown for clarity)
pip install "openanalyst[async]"`}</code></pre>

        <div className="callout callout-info">
          <p><strong>Note:</strong> The Python package name on PyPI is <code>openanalyst</code> (no hyphen). The import name in code is also <code>openanalyst</code>.</p>
        </div>

        <h2>Initialization</h2>
        <p>
          All SDK operations require an API key. You can generate and manage API keys from the
          Settings page inside <a href="https://app.openanalyst.com">app.openanalyst.com</a>. Store
          your key in an environment variable — never hard-code it in source files.
        </p>

        <p><strong>JavaScript / TypeScript</strong></p>
        <pre><code>{`import { OpenAnalyst } from '@openanalyst/sdk';

const client = new OpenAnalyst({
  apiKey: process.env.OPENANALYST_API_KEY,
  // Optional: override the base URL for self-hosted deployments
  baseUrl: 'https://api.openanalyst.com/v1',
  // Optional: default request timeout in milliseconds (default: 30000)
  timeout: 30000,
});`}</code></pre>

        <p><strong>Python (synchronous)</strong></p>
        <pre><code>{`import os
from openanalyst import OpenAnalyst

client = OpenAnalyst(
    api_key=os.environ["OPENANALYST_API_KEY"],
    # Optional overrides
    base_url="https://api.openanalyst.com/v1",
    timeout=30.0,
)`}</code></pre>

        <p><strong>Python (async)</strong></p>
        <pre><code>{`import os
import asyncio
from openanalyst import AsyncOpenAnalyst

async def main():
    client = AsyncOpenAnalyst(api_key=os.environ["OPENANALYST_API_KEY"])
    # ... all methods are awaitable
    datasets = await client.datasets.list()

asyncio.run(main())`}</code></pre>

        <div className="callout callout-tip">
          <p><strong>Tip:</strong> For server-side Next.js, Remix, or Express applications, initialize a single client instance at module scope and reuse it across requests rather than constructing a new client per request.</p>
        </div>

        <h2>Core Methods</h2>
        <p>
          The SDK client exposes resources as namespaced sub-objects. Each resource corresponds to
          a category of platform functionality. The table below summarizes the primary resources
          and their key methods.
        </p>
        <table>
          <thead>
            <tr>
              <th>Resource</th>
              <th>Key Methods</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>client.datasets</code></td>
              <td><code>list()</code>, <code>create()</code>, <code>get(id)</code>, <code>delete(id)</code></td>
              <td>Manage connected data sources and uploaded datasets</td>
            </tr>
            <tr>
              <td><code>client.queries</code></td>
              <td><code>run(params)</code>, <code>getResults(id)</code></td>
              <td>Execute analytical queries and retrieve results</td>
            </tr>
            <tr>
              <td><code>client.reports</code></td>
              <td><code>list()</code>, <code>create()</code>, <code>get(id)</code>, <code>update(id, patch)</code></td>
              <td>Create and manage automated reports</td>
            </tr>
            <tr>
              <td><code>client.agents</code></td>
              <td><code>run(params)</code>, <code>getSessions()</code>, <code>getSession(id)</code></td>
              <td>Trigger and monitor AI agent sessions</td>
            </tr>
            <tr>
              <td><code>client.exports</code></td>
              <td><code>create()</code>, <code>download(id)</code></td>
              <td>Export data and reports in various formats</td>
            </tr>
            <tr>
              <td><code>client.webhooks</code></td>
              <td><code>create()</code>, <code>list()</code>, <code>delete(id)</code></td>
              <td>Register and manage webhook endpoints</td>
            </tr>
          </tbody>
        </table>

        <h2>TypeScript Types</h2>
        <p>
          The JavaScript SDK ships with comprehensive TypeScript definitions. All request parameter
          objects and response shapes are exported from the package root, making it straightforward
          to type your own functions that accept or return SDK objects.
        </p>
        <pre><code>{`import type {
  Dataset,
  DatasetCreateParams,
  Query,
  QueryRunParams,
  QueryResults,
  Report,
  ReportCreateParams,
  AgentSession,
  AgentRunParams,
  Export,
  Webhook,
  WebhookCreateParams,
  OpenAnalystError,
  RateLimitError,
  AuthenticationError,
  NotFoundError,
} from '@openanalyst/sdk';

// Example: typed helper function
async function createWeeklyReport(
  client: OpenAnalyst,
  params: ReportCreateParams,
): Promise<Report> {
  return client.reports.create(params);
}`}</code></pre>

        <h2>Error Handling</h2>
        <p>
          All SDK methods throw typed error subclasses derived from <code>OpenAnalystError</code>.
          This lets you catch specific error categories and respond appropriately.
        </p>
        <pre><code>{`import {
  OpenAnalyst,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  OpenAnalystError,
} from '@openanalyst/sdk';

const client = new OpenAnalyst({ apiKey: process.env.OPENANALYST_API_KEY });

try {
  const report = await client.reports.get('rpt_nonexistent');
} catch (err) {
  if (err instanceof AuthenticationError) {
    console.error('Invalid or expired API key');
  } else if (err instanceof RateLimitError) {
    console.error(\`Rate limit exceeded. Retry after \${err.retryAfter}s\`);
  } else if (err instanceof NotFoundError) {
    console.error('The requested resource was not found');
  } else if (err instanceof OpenAnalystError) {
    console.error(\`API error \${err.statusCode}: \${err.message}\`);
  } else {
    throw err; // Re-throw unexpected errors
  }
}`}</code></pre>

        <p>In Python, the error hierarchy mirrors the JavaScript SDK:</p>
        <pre><code>{`from openanalyst.exceptions import (
    OpenAnalystError,
    AuthenticationError,
    RateLimitError,
    NotFoundError,
)

try:
    report = client.reports.get("rpt_nonexistent")
except AuthenticationError:
    print("Invalid or expired API key")
except RateLimitError as e:
    print(f"Rate limit exceeded. Retry after {e.retry_after}s")
except NotFoundError:
    print("Resource not found")
except OpenAnalystError as e:
    print(f"API error {e.status_code}: {e.message}")`}</code></pre>

        <h2>Common Operations</h2>

        <h3>Connecting a Data Source</h3>
        <pre><code>{`// JavaScript/TypeScript
const dataset = await client.datasets.create({
  name: 'Production Postgres',
  type: 'postgresql',
  connectionString: process.env.DATABASE_URL,
  // Optional: restrict synced tables
  tables: ['orders', 'customers', 'events'],
});

console.log(\`Dataset created: \${dataset.id}\`);`}</code></pre>
        <pre><code>{`# Python
dataset = client.datasets.create(
    name="Production Postgres",
    type="postgresql",
    connection_string=os.environ["DATABASE_URL"],
    tables=["orders", "customers", "events"],
)
print(f"Dataset created: {dataset.id}")`}</code></pre>

        <h3>Running a Query</h3>
        <pre><code>{`// JavaScript/TypeScript
const execution = await client.queries.run({
  datasetId: 'ds_abc123',
  sql: \`
    SELECT
      DATE_TRUNC('week', created_at) AS week,
      COUNT(*) AS new_users
    FROM customers
    WHERE created_at >= NOW() - INTERVAL '90 days'
    GROUP BY 1
    ORDER BY 1
  \`,
});

// Poll for results (or use webhooks for long-running queries)
const results = await client.queries.getResults(execution.id);
console.log(results.rows); // Array of row objects`}</code></pre>

        <h3>Generating a Report</h3>
        <pre><code>{`// JavaScript/TypeScript
const report = await client.reports.create({
  name: 'Weekly Executive Summary',
  datasetId: 'ds_abc123',
  schedule: {
    frequency: 'weekly',
    dayOfWeek: 1, // Monday
    hour: 8,
    timezone: 'America/New_York',
  },
  recipients: ['ceo@example.com', 'cto@example.com'],
  format: 'pdf',
  sections: [
    { type: 'kpi', metrics: ['total_revenue', 'active_users', 'churn_rate'] },
    { type: 'chart', chartType: 'line', metric: 'daily_revenue', days: 30 },
    { type: 'table', query: 'SELECT * FROM top_customers LIMIT 10' },
  ],
});

console.log(\`Report scheduled: \${report.id}\`);`}</code></pre>

        <h3>Triggering an AI Agent</h3>
        <pre><code>{`// JavaScript/TypeScript
const session = await client.agents.run({
  prompt: 'Analyze revenue trends over the last 90 days and identify the top 3 anomalies.',
  datasetIds: ['ds_abc123'],
  model: 'claude-3-5-sonnet',
  // Stream results as the agent works
  stream: true,
  onMessage: (message) => {
    process.stdout.write(message.content);
  },
});

console.log(\`\nAgent session complete: \${session.id}\`);
console.log(\`Final answer: \${session.finalAnswer}\`);`}</code></pre>

        <h3>Exporting Data</h3>
        <pre><code>{`// JavaScript/TypeScript
const exportJob = await client.exports.create({
  datasetId: 'ds_abc123',
  format: 'csv',
  filter: {
    dateRange: { start: '2025-01-01', end: '2025-03-31' },
  },
});

// Wait for the export to be ready, then download
const fileBuffer = await client.exports.download(exportJob.id);
require('fs').writeFileSync('export.csv', fileBuffer);`}</code></pre>

        <h2>SDK Versioning</h2>
        <p>
          The OpenAnalyst SDK follows semantic versioning. The major version is pinned to the API
          version it targets: SDK v1.x.x targets API v1. Breaking changes to the API will result
          in a new major SDK version published alongside the new API version. Minor releases add
          new capabilities without breaking existing code. Patch releases contain bug fixes only.
        </p>
        <p>
          You can check the installed SDK version at runtime:
        </p>
        <pre><code>{`import { VERSION } from '@openanalyst/sdk';
console.log(VERSION); // e.g. "1.4.2"`}</code></pre>
        <pre><code>{`import openanalyst
print(openanalyst.__version__)  # e.g. "1.4.2"`}</code></pre>

        <div className="callout callout-warning">
          <p><strong>Warning:</strong> SDK major version 0.x releases are considered pre-stable. APIs may change between minor versions. Pin your dependency to a specific patch version in production environments when using 0.x releases.</p>
        </div>
      </>
    ),
  },

  'server': {
    title: 'Server API',
    description: 'Complete REST API reference for OpenAnalyst. Covers authentication, all resource endpoints, request and response formats, pagination, rate limiting, and error handling.',
    content: (
      <>
        <h2>Base URL and Versioning</h2>
        <p>
          All API requests are made over HTTPS to the following base URL:
        </p>
        <pre><code>{`https://api.openanalyst.com/v1`}</code></pre>
        <p>
          The version segment <code>/v1</code> is part of every endpoint URL. When a new
          incompatible API version is released, it will be accessible at <code>/v2</code> while
          <code>/v1</code> remains available for a minimum deprecation period of 12 months.
          Version sunset dates are announced in the changelog at least 90 days in advance.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> The API does not support content negotiation via the <code>Accept-Version</code> header. Always include the explicit version in the URL path.</p>
        </div>

        <h2>Authentication</h2>
        <p>
          Every request must include a valid API key as a Bearer token in the
          <code>Authorization</code> header. API keys are generated from the Settings page inside
          the web app at <a href="https://app.openanalyst.com">app.openanalyst.com</a>.
        </p>
        <pre><code>{`Authorization: Bearer oa_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx`}</code></pre>
        <p>
          API keys are prefixed with <code>oa_live_</code> for production keys and
          <code>oa_test_</code> for test-mode keys. Test-mode keys return synthetic data and do
          not consume credits or trigger real webhooks.
        </p>
        <pre><code>{`curl https://api.openanalyst.com/v1/datasets \\
  -H "Authorization: Bearer oa_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`}</code></pre>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Never expose API keys in client-side JavaScript, mobile app bundles, or public repositories. If a key is compromised, revoke it immediately from the Settings page and issue a replacement.</p>
        </div>

        <h2>Request and Response Format</h2>
        <p>
          All request bodies must be JSON with the header <code>Content-Type: application/json</code>.
          All successful responses return JSON with an HTTP 2xx status code. Collections are wrapped
          in a top-level object with <code>data</code> and <code>pagination</code> keys. Single
          resources are returned directly as a JSON object.
        </p>

        <h3>Success Response — Single Resource</h3>
        <pre><code>{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "rpt_abc123",
  "name": "Weekly Executive Summary",
  "format": "pdf",
  "created_at": "2025-11-01T09:00:00Z",
  "updated_at": "2025-11-15T14:22:00Z"
}`}</code></pre>

        <h3>Success Response — Collection</h3>
        <pre><code>{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "data": [
    { "id": "rpt_abc123", "name": "Weekly Executive Summary" },
    { "id": "rpt_def456", "name": "Monthly Churn Analysis" }
  ],
  "pagination": {
    "cursor": "cur_xyz789",
    "has_more": true,
    "total": 47
  }
}`}</code></pre>

        <h2>Pagination</h2>
        <p>
          All list endpoints use cursor-based pagination. Pass the <code>cursor</code> value from a
          previous response as the <code>after</code> query parameter to retrieve the next page.
          Use the <code>limit</code> parameter to control page size (default: 20, maximum: 100).
        </p>
        <pre><code>{`# First page
curl "https://api.openanalyst.com/v1/reports?limit=25" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Next page
curl "https://api.openanalyst.com/v1/reports?limit=25&after=cur_xyz789" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"`}</code></pre>
        <p>
          When <code>pagination.has_more</code> is <code>false</code>, you have reached the last
          page. The <code>total</code> field reflects the total number of matching records and does
          not change between pages.
        </p>

        <h2>Rate Limiting</h2>
        <p>
          API rate limits are applied per API key. The default limits are:
        </p>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Requests / minute</th>
              <th>Requests / day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Starter</td>
              <td>60</td>
              <td>10,000</td>
            </tr>
            <tr>
              <td>Pro</td>
              <td>300</td>
              <td>100,000</td>
            </tr>
            <tr>
              <td>Enterprise</td>
              <td>Custom</td>
              <td>Custom</td>
            </tr>
          </tbody>
        </table>
        <p>
          Every response includes the following rate limit headers:
        </p>
        <pre><code>{`X-RateLimit-Limit: 300
X-RateLimit-Remaining: 247
X-RateLimit-Reset: 1732016460`}</code></pre>
        <p>
          When the limit is exceeded, the API returns HTTP 429 with a <code>Retry-After</code>
          header indicating the number of seconds to wait before retrying.
        </p>

        <h2>Error Response Format</h2>
        <p>All errors return a consistent JSON body regardless of the error type:</p>
        <pre><code>{`{
  "error": {
    "code": "not_found",
    "message": "Dataset ds_nonexistent does not exist or you do not have access to it.",
    "status": 404,
    "request_id": "req_8f3kd92ls"
  }
}`}</code></pre>
        <table>
          <thead>
            <tr>
              <th>HTTP Status</th>
              <th>Error Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>400</td><td><code>invalid_request</code></td><td>Missing or malformed request parameters</td></tr>
            <tr><td>401</td><td><code>authentication_required</code></td><td>Missing or invalid API key</td></tr>
            <tr><td>403</td><td><code>forbidden</code></td><td>Key does not have permission for this action</td></tr>
            <tr><td>404</td><td><code>not_found</code></td><td>The requested resource does not exist</td></tr>
            <tr><td>409</td><td><code>conflict</code></td><td>Resource already exists or state conflict</td></tr>
            <tr><td>422</td><td><code>unprocessable</code></td><td>Semantically invalid request body</td></tr>
            <tr><td>429</td><td><code>rate_limit_exceeded</code></td><td>Too many requests</td></tr>
            <tr><td>500</td><td><code>internal_error</code></td><td>Unexpected server error</td></tr>
          </tbody>
        </table>

        <h2>Datasets</h2>
        <p>Datasets represent connected data sources or uploaded data files.</p>

        <h3>GET /datasets</h3>
        <p>List all datasets accessible to the authenticated key.</p>
        <pre><code>{`curl "https://api.openanalyst.com/v1/datasets" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Response
{
  "data": [
    {
      "id": "ds_abc123",
      "name": "Production Postgres",
      "type": "postgresql",
      "status": "connected",
      "created_at": "2025-09-01T12:00:00Z"
    }
  ],
  "pagination": { "cursor": null, "has_more": false, "total": 1 }
}`}</code></pre>

        <h3>POST /datasets</h3>
        <p>Create (connect) a new dataset.</p>
        <pre><code>{`curl -X POST "https://api.openanalyst.com/v1/datasets" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Analytics Warehouse",
    "type": "bigquery",
    "credentials": {
      "project_id": "my-gcp-project",
      "dataset": "analytics",
      "service_account_key": "{ ... }"
    }
  }'`}</code></pre>

        <h3>GET /datasets/:id</h3>
        <p>Retrieve a single dataset by ID.</p>
        <pre><code>{`curl "https://api.openanalyst.com/v1/datasets/ds_abc123" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"`}</code></pre>

        <h3>DELETE /datasets/:id</h3>
        <p>Disconnect and remove a dataset. This does not delete the underlying data source.</p>
        <pre><code>{`curl -X DELETE "https://api.openanalyst.com/v1/datasets/ds_abc123" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Response: HTTP 204 No Content`}</code></pre>

        <h2>Queries</h2>
        <p>Queries execute SQL or natural-language requests against a connected dataset.</p>

        <h3>POST /queries/run</h3>
        <pre><code>{`curl -X POST "https://api.openanalyst.com/v1/queries/run" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_id": "ds_abc123",
    "sql": "SELECT country, COUNT(*) AS users FROM customers GROUP BY country ORDER BY 2 DESC LIMIT 10",
    "timeout": 60
  }'

# Response
{
  "id": "qry_xyz789",
  "status": "running",
  "created_at": "2025-11-20T10:00:00Z"
}`}</code></pre>

        <h3>GET /queries/:id/results</h3>
        <p>Retrieve the results of a completed query. Poll this endpoint until <code>status</code> is <code>completed</code> or <code>failed</code>.</p>
        <pre><code>{`curl "https://api.openanalyst.com/v1/queries/qry_xyz789/results" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Response
{
  "id": "qry_xyz789",
  "status": "completed",
  "columns": ["country", "users"],
  "rows": [
    { "country": "United States", "users": 48291 },
    { "country": "United Kingdom", "users": 12047 }
  ],
  "row_count": 10,
  "execution_time_ms": 342
}`}</code></pre>

        <h2>Reports</h2>

        <h3>GET /reports</h3>
        <pre><code>{`curl "https://api.openanalyst.com/v1/reports?limit=10" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"`}</code></pre>

        <h3>POST /reports</h3>
        <pre><code>{`curl -X POST "https://api.openanalyst.com/v1/reports" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Monthly Revenue Report",
    "dataset_id": "ds_abc123",
    "format": "pdf",
    "schedule": {
      "frequency": "monthly",
      "day_of_month": 1,
      "hour": 7,
      "timezone": "UTC"
    },
    "recipients": ["finance@example.com"]
  }'`}</code></pre>

        <h3>GET /reports/:id</h3>
        <pre><code>{`curl "https://api.openanalyst.com/v1/reports/rpt_abc123" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"`}</code></pre>

        <h3>PUT /reports/:id</h3>
        <p>Full replacement update of a report. All writable fields must be included.</p>
        <pre><code>{`curl -X PUT "https://api.openanalyst.com/v1/reports/rpt_abc123" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Monthly Revenue Report (Updated)",
    "dataset_id": "ds_abc123",
    "format": "xlsx",
    "schedule": { "frequency": "monthly", "day_of_month": 2, "hour": 8, "timezone": "UTC" },
    "recipients": ["finance@example.com", "cfo@example.com"]
  }'`}</code></pre>

        <h2>Agents</h2>

        <h3>POST /agents/run</h3>
        <p>Start a new AI agent session. The agent will autonomously query data, reason over results, and produce a final answer.</p>
        <pre><code>{`curl -X POST "https://api.openanalyst.com/v1/agents/run" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "What were the top 5 product categories by revenue last quarter, and how do they compare to the same quarter last year?",
    "dataset_ids": ["ds_abc123"],
    "model": "claude-3-5-sonnet",
    "max_steps": 15
  }'

# Response
{
  "id": "ses_kj2h8d",
  "status": "running",
  "created_at": "2025-11-20T10:05:00Z"
}`}</code></pre>

        <h3>GET /agents/sessions</h3>
        <pre><code>{`curl "https://api.openanalyst.com/v1/agents/sessions" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"`}</code></pre>

        <h3>GET /agents/sessions/:id</h3>
        <pre><code>{`curl "https://api.openanalyst.com/v1/agents/sessions/ses_kj2h8d" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Response (completed session)
{
  "id": "ses_kj2h8d",
  "status": "completed",
  "prompt": "What were the top 5 product categories ...",
  "model": "claude-3-5-sonnet",
  "steps": 8,
  "final_answer": "The top 5 product categories by revenue last quarter were ...",
  "created_at": "2025-11-20T10:05:00Z",
  "completed_at": "2025-11-20T10:05:42Z"
}`}</code></pre>

        <h2>Exports and Webhooks</h2>

        <h3>POST /exports</h3>
        <pre><code>{`curl -X POST "https://api.openanalyst.com/v1/exports" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_id": "ds_abc123",
    "format": "parquet",
    "filter": {
      "date_range": { "start": "2025-01-01", "end": "2025-12-31" }
    }
  }'`}</code></pre>

        <h3>GET /exports/:id/download</h3>
        <p>Returns a temporary pre-signed download URL valid for 15 minutes. The export must have <code>status: "ready"</code>.</p>
        <pre><code>{`curl "https://api.openanalyst.com/v1/exports/exp_mn4op9/download" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Response
{
  "download_url": "https://storage.openanalyst.com/exports/exp_mn4op9.parquet?token=...",
  "expires_at": "2025-11-20T10:20:00Z",
  "size_bytes": 4820194,
  "format": "parquet"
}`}</code></pre>

        <h3>POST /webhooks</h3>
        <pre><code>{`curl -X POST "https://api.openanalyst.com/v1/webhooks" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://yourdomain.com/hooks/openanalyst",
    "events": ["report.completed", "agent.session.completed", "export.ready"],
    "secret": "whsec_your_signing_secret"
  }'`}</code></pre>

        <h3>GET /webhooks and DELETE /webhooks/:id</h3>
        <pre><code>{`# List webhooks
curl "https://api.openanalyst.com/v1/webhooks" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"

# Delete a webhook
curl -X DELETE "https://api.openanalyst.com/v1/webhooks/wh_pq5rs1" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY"`}</code></pre>

        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Webhook payloads include an <code>X-OpenAnalyst-Signature</code> header containing an HMAC-SHA256 signature of the raw request body using your webhook secret. Always verify this signature before processing the event.</p>
        </div>
      </>
    ),
  },

  'plugins': {
    title: 'Plugins',
    description: 'Extend OpenAnalyst with custom data sources, visualizations, agent capabilities, and export formats. Build, test, and publish plugins to the marketplace.',
    content: (
      <>
        <h2>Plugin Architecture Overview</h2>
        <p>
          The OpenAnalyst plugin system allows developers to extend the platform with custom
          functionality that integrates natively into the web application. Plugins run in an
          isolated sandboxed environment within the browser, communicating with the host
          application through a structured message-passing API. They have access to a defined
          set of platform capabilities depending on the permissions declared in their manifest.
        </p>
        <p>
          Plugins are distributed as ZIP archives containing a manifest file, JavaScript entry
          point, and any static assets. They are installed by workspace administrators through
          the Settings page or the plugin marketplace and can be enabled or disabled per workspace.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Plugins execute entirely within the user's browser for web app plugins, or within the OpenAnalyst agent runtime for agent plugins. They do not run on OpenAnalyst servers and cannot access other workspaces' data.</p>
        </div>

        <h2>Plugin Types</h2>
        <p>There are four categories of plugins, each targeting a different extension point:</p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Key Identifier</th>
              <th>What It Extends</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Source Plugin</td>
              <td><code>datasource</code></td>
              <td>Adds a new connector type to the dataset library (e.g., a proprietary API or internal data warehouse)</td>
            </tr>
            <tr>
              <td>Visualization Plugin</td>
              <td><code>visualization</code></td>
              <td>Adds custom chart or table types to dashboards and reports</td>
            </tr>
            <tr>
              <td>Agent Plugin</td>
              <td><code>agent</code></td>
              <td>Provides additional tools and skills that AI agents can invoke during a session</td>
            </tr>
            <tr>
              <td>Export Plugin</td>
              <td><code>export</code></td>
              <td>Adds new export destinations or file formats (e.g., push to Notion, export as PPTX)</td>
            </tr>
          </tbody>
        </table>

        <h2>Plugin Manifest</h2>
        <p>
          Every plugin must include a <code>manifest.json</code> file at the root of its
          distribution archive. The manifest declares the plugin identity, type, entry point,
          required permissions, and configuration schema.
        </p>
        <pre><code>{`{
  "id": "com.example.radar-chart",
  "name": "Radar Chart",
  "version": "1.2.0",
  "description": "Adds a customizable radar/spider chart visualization type.",
  "author": {
    "name": "Example Corp",
    "email": "plugins@example.com",
    "url": "https://example.com"
  },
  "type": "visualization",
  "entry": "dist/index.js",
  "icon": "assets/icon.svg",
  "minAppVersion": "2.0.0",
  "permissions": [
    "read:query_results",
    "write:dashboard"
  ],
  "configSchema": {
    "type": "object",
    "properties": {
      "colorScheme": {
        "type": "string",
        "enum": ["default", "monochrome", "warm", "cool"],
        "default": "default",
        "title": "Color Scheme"
      },
      "showLabels": {
        "type": "boolean",
        "default": true,
        "title": "Show axis labels"
      }
    }
  }
}`}</code></pre>

        <h2>Plugin Entry Point and Lifecycle Hooks</h2>
        <p>
          The entry point file must export a default object conforming to the plugin interface for
          its declared type. The plugin host calls lifecycle hooks at predictable moments during
          the plugin's existence within the application.
        </p>
        <pre><code>{`// dist/index.js (Visualization Plugin entry point)
import { registerVisualization } from '@openanalyst/plugin-sdk';

export default registerVisualization({
  // Called once when the plugin is first loaded
  onLoad(context) {
    console.log('Radar Chart plugin loaded, version:', context.pluginVersion);
  },

  // Called when a chart instance is created on a dashboard
  onMount(container, queryResults, config) {
    renderRadarChart(container, queryResults, config);
  },

  // Called when query results or config change while the chart is displayed
  onUpdate(container, queryResults, config) {
    updateRadarChart(container, queryResults, config);
  },

  // Called when the chart is removed from the dashboard
  onUnmount(container) {
    destroyRadarChart(container);
  },

  // Called when the plugin is uninstalled from the workspace
  onUnload() {
    // Clean up any global state
  },
});`}</code></pre>

        <h2>Plugin API</h2>
        <p>
          Plugins communicate with OpenAnalyst through the plugin API object injected into their
          context. The available methods depend on the declared permissions.
        </p>
        <pre><code>{`// Context object available in lifecycle hooks
interface PluginContext {
  pluginId: string;
  pluginVersion: string;
  workspaceId: string;

  // Storage: key-value store scoped to this plugin and workspace
  storage: {
    get(key: string): Promise<unknown>;
    set(key: string, value: unknown): Promise<void>;
    delete(key: string): Promise<void>;
  };

  // Notifications
  notify: {
    success(message: string): void;
    error(message: string): void;
    info(message: string): void;
  };

  // Access to query results (requires read:query_results permission)
  queries: {
    getLatestResults(queryId: string): Promise<QueryResults>;
    runQuery(sql: string, datasetId: string): Promise<QueryResults>;
  };

  // Dashboard write access (requires write:dashboard permission)
  dashboard: {
    addWidget(config: WidgetConfig): Promise<void>;
    updateWidget(id: string, config: Partial<WidgetConfig>): Promise<void>;
  };
}`}</code></pre>

        <h2>Example: Creating a Custom Chart Plugin</h2>
        <p>
          The following walkthrough creates a minimal but functional radar chart plugin using
          D3.js.
        </p>
        <ol className="step-list">
          <li>Scaffold the plugin directory structure:
            <pre><code>{`radar-chart/
├── manifest.json
├── package.json
├── src/
│   └── index.ts
├── assets/
│   └── icon.svg
└── dist/          # generated by build`}</code></pre>
          </li>
          <li>Install the plugin SDK and build dependencies:
            <pre><code>{`npm install @openanalyst/plugin-sdk d3
npm install --save-dev typescript esbuild @types/d3`}</code></pre>
          </li>
          <li>Implement the visualization:
            <pre><code>{`// src/index.ts
import * as d3 from 'd3';
import { registerVisualization } from '@openanalyst/plugin-sdk';

function render(container: HTMLElement, rows: Record<string, number>[], config: Record<string, unknown>) {
  const categories = Object.keys(rows[0]);
  const values = categories.map((c) => rows[0][c] as number);
  const max = d3.max(values) ?? 1;
  const width = container.clientWidth;
  const height = container.clientHeight;
  const radius = Math.min(width, height) / 2 - 40;

  d3.select(container).selectAll('*').remove();

  const svg = d3.select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', \`translate(\${width / 2},\${height / 2})\`);

  const angleSlice = (Math.PI * 2) / categories.length;
  const rScale = d3.scaleLinear().range([0, radius]).domain([0, max]);

  // Draw axes
  categories.forEach((cat, i) => {
    const angle = angleSlice * i - Math.PI / 2;
    svg.append('line')
      .attr('x1', 0).attr('y1', 0)
      .attr('x2', rScale(max) * Math.cos(angle))
      .attr('y2', rScale(max) * Math.sin(angle))
      .attr('stroke', '#444').attr('stroke-width', 1);

    if (config.showLabels) {
      svg.append('text')
        .attr('x', (rScale(max) + 12) * Math.cos(angle))
        .attr('y', (rScale(max) + 12) * Math.sin(angle))
        .attr('text-anchor', 'middle')
        .attr('fill', '#ccc')
        .attr('font-size', '12px')
        .text(cat);
    }
  });

  // Draw data polygon
  const radarLine = d3.lineRadial<number>()
    .radius((d) => rScale(d))
    .angle((_, i) => i * angleSlice)
    .curve(d3.curveLinearClosed);

  svg.append('path')
    .datum(values)
    .attr('d', radarLine)
    .attr('fill', 'rgba(255, 133, 82, 0.3)')
    .attr('stroke', '#ff8552')
    .attr('stroke-width', 2);
}

export default registerVisualization({
  onMount(container, results, config) { render(container, results.rows, config); },
  onUpdate(container, results, config) { render(container, results.rows, config); },
  onUnmount(container) { d3.select(container).selectAll('*').remove(); },
});`}</code></pre>
          </li>
          <li>Build and package:
            <pre><code>{`# Build
npx esbuild src/index.ts --bundle --outfile=dist/index.js --format=esm

# Package as ZIP
zip -r radar-chart-v1.2.0.zip manifest.json dist/ assets/`}</code></pre>
          </li>
        </ol>

        <h2>Example: Creating a Data Source Plugin</h2>
        <p>
          A data source plugin registers a new connection type that users can select when adding
          a dataset. It must implement a connection test method and a data fetch method.
        </p>
        <pre><code>{`// src/index.ts
import { registerDataSource } from '@openanalyst/plugin-sdk';

export default registerDataSource({
  // Renders the connection form fields
  configFields: [
    { key: 'apiEndpoint', label: 'API Endpoint URL', type: 'url', required: true },
    { key: 'apiToken', label: 'API Token', type: 'password', required: true },
    { key: 'tableName', label: 'Resource Name', type: 'text', required: true },
  ],

  // Validates the connection; throw to indicate failure
  async testConnection(config) {
    const response = await fetch(config.apiEndpoint + '/health', {
      headers: { Authorization: \`Bearer \${config.apiToken}\` },
    });
    if (!response.ok) throw new Error(\`Connection test failed: \${response.statusText}\`);
  },

  // Returns the schema (columns) of the data source
  async getSchema(config) {
    const response = await fetch(\`\${config.apiEndpoint}/schema/\${config.tableName}\`, {
      headers: { Authorization: \`Bearer \${config.apiToken}\` },
    });
    const schema = await response.json();
    return schema.fields.map((f: { name: string; type: string }) => ({
      name: f.name,
      type: f.type,
    }));
  },

  // Fetches data; params contains filters, limit, offset
  async fetchData(config, params) {
    const url = new URL(\`\${config.apiEndpoint}/data/\${config.tableName}\`);
    if (params.limit) url.searchParams.set('limit', String(params.limit));
    if (params.offset) url.searchParams.set('offset', String(params.offset));
    const response = await fetch(url.toString(), {
      headers: { Authorization: \`Bearer \${config.apiToken}\` },
    });
    return response.json();
  },
});`}</code></pre>

        <h2>Plugin Permissions</h2>
        <p>Plugins must declare every permission they need in the manifest. Users are shown these permissions during installation. Attempting to use an undeclared permission throws a <code>PermissionDeniedError</code>.</p>
        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Grants Access To</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>read:query_results</code></td><td>Read query results for datasets the user can access</td></tr>
            <tr><td><code>write:dashboard</code></td><td>Add or update widgets on dashboards</td></tr>
            <tr><td><code>read:reports</code></td><td>Read report definitions and generated outputs</td></tr>
            <tr><td><code>write:reports</code></td><td>Create and modify reports</td></tr>
            <tr><td><code>read:datasets</code></td><td>Read dataset metadata (not raw data)</td></tr>
            <tr><td><code>write:datasets</code></td><td>Create and update datasets</td></tr>
            <tr><td><code>network</code></td><td>Make outbound HTTP requests to domains listed in <code>allowedDomains</code></td></tr>
            <tr><td><code>storage</code></td><td>Persist key-value data in the plugin storage namespace</td></tr>
          </tbody>
        </table>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Plugins requesting the <code>network</code> permission must also declare an <code>allowedDomains</code> array in the manifest. Requests to domains not in this list are blocked at the network layer.</p>
        </div>

        <h2>Publishing to the Marketplace</h2>
        <ol className="step-list">
          <li>Create a developer account at <a href="https://app.openanalyst.com">app.openanalyst.com</a> and enroll in the Developer Program from Settings.</li>
          <li>Build and test your plugin locally by installing it as a private plugin in a test workspace.</li>
          <li>Run the plugin validator to check manifest completeness and permission declarations:
            <pre><code>{`npx @openanalyst/plugin-cli validate ./radar-chart-v1.2.0.zip`}</code></pre>
          </li>
          <li>Submit the plugin for review through the Developer Portal. The review process typically takes 3-5 business days.</li>
          <li>Once approved, your plugin appears in the public marketplace. You can push updates by submitting a new ZIP with an incremented <code>version</code> in the manifest.</li>
        </ol>
      </>
    ),
  },

  'ecosystem': {
    title: 'Ecosystem',
    description: 'The OpenAnalyst community, open source resources, partner integrations, community-maintained client libraries, developer program, and showcase of projects built on the platform.',
    content: (
      <>
        <h2>Community Overview</h2>
        <p>
          The OpenAnalyst ecosystem brings together data engineers, analysts, developers, and
          product teams who build with and on top of the platform. The community spans official
          channels managed by the OpenAnalyst team, open source repositories, third-party
          integrations, and a growing library of templates contributed by practitioners across
          industries.
        </p>
        <p>
          Whether you are looking to get unblocked on an integration, share a dashboard template
          you built, contribute a bug fix to an official repository, or explore what others have
          created with the platform, the community resources below are your starting point.
        </p>

        <h2>Official Resources</h2>
        <table>
          <thead>
            <tr>
              <th>Resource</th>
              <th>URL</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Documentation</td>
              <td><a href="https://openanalyst.com/docs">openanalyst.com/docs</a></td>
              <td>This documentation site — guides, API reference, and tutorials</td>
            </tr>
            <tr>
              <td>Blog</td>
              <td><a href="https://openanalyst.com/blog">openanalyst.com/blog</a></td>
              <td>Product announcements, technical deep-dives, and customer stories</td>
            </tr>
            <tr>
              <td>Changelog</td>
              <td><a href="https://openanalyst.com/changelog">openanalyst.com/changelog</a></td>
              <td>Full history of platform updates, new features, and deprecation notices</td>
            </tr>
            <tr>
              <td>Status Page</td>
              <td><a href="https://status.openanalyst.com">status.openanalyst.com</a></td>
              <td>Real-time and historical uptime for the API, web app, and integrations</td>
            </tr>
            <tr>
              <td>Roadmap</td>
              <td><a href="https://openanalyst.com/roadmap">openanalyst.com/roadmap</a></td>
              <td>Public roadmap with upcoming features and voting for priorities</td>
            </tr>
          </tbody>
        </table>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Subscribe to the changelog via RSS or email to receive notifications of new releases without checking manually. The feed URL is <code>https://openanalyst.com/changelog/feed.xml</code>.</p>
        </div>

        <h2>Community Channels</h2>

        <h3>Discord</h3>
        <p>
          The official OpenAnalyst Discord server is the most active community space. Channels
          are organized by topic:
        </p>
        <ul>
          <li><strong>#announcements</strong> — Official product announcements (read-only)</li>
          <li><strong>#general</strong> — Community discussion and introductions</li>
          <li><strong>#help</strong> — Ask questions, share solutions</li>
          <li><strong>#sdk-and-api</strong> — SDK usage, API questions, integration patterns</li>
          <li><strong>#plugins</strong> — Plugin development and marketplace discussion</li>
          <li><strong>#showcase</strong> — Share dashboards, reports, and projects you have built</li>
          <li><strong>#feature-requests</strong> — Propose and discuss platform improvements</li>
        </ul>
        <p>Join at <a href="https://discord.gg/openanalyst">discord.gg/openanalyst</a>.</p>

        <h3>GitHub Discussions</h3>
        <p>
          For longer-form technical discussions, reproducible bug reports, and RFC (Request for
          Comments) proposals, use GitHub Discussions at
          <a href="https://github.com/openanalyst/openanalyst/discussions">github.com/openanalyst/openanalyst/discussions</a>.
          GitHub Discussions are indexed by search engines, making them useful for issues that
          others are likely to encounter.
        </p>

        <h3>Twitter / X</h3>
        <p>
          Follow <a href="https://x.com/openanalyst">@openanalyst</a> for product news, tips, and
          community highlights. Tag <code>#openanalyst</code> when posting about projects you
          have built — the team regularly reshares community work.
        </p>

        <h2>Open Source Contributions</h2>
        <p>
          Several components of the OpenAnalyst platform are open source. Community contributions
          are welcome and are governed by the Contributor License Agreement (CLA) which you will
          be asked to sign on your first pull request.
        </p>
        <table>
          <thead>
            <tr>
              <th>Repository</th>
              <th>License</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a href="https://github.com/openanalyst/sdk-js">openanalyst/sdk-js</a></td>
              <td>MIT</td>
              <td>Official JavaScript / TypeScript SDK</td>
            </tr>
            <tr>
              <td><a href="https://github.com/openanalyst/sdk-python">openanalyst/sdk-python</a></td>
              <td>MIT</td>
              <td>Official Python SDK</td>
            </tr>
            <tr>
              <td><a href="https://github.com/openanalyst/plugin-sdk">openanalyst/plugin-sdk</a></td>
              <td>MIT</td>
              <td>Plugin development toolkit and type definitions</td>
            </tr>
            <tr>
              <td><a href="https://github.com/openanalyst/plugin-cli">openanalyst/plugin-cli</a></td>
              <td>MIT</td>
              <td>CLI for validating, building, and publishing plugins</td>
            </tr>
            <tr>
              <td><a href="https://github.com/openanalyst/openanalyst">openanalyst/openanalyst</a></td>
              <td>Apache 2.0</td>
              <td>Community edition core (agent runtime, query engine)</td>
            </tr>
          </tbody>
        </table>

        <h3>Contributing</h3>
        <ol className="step-list">
          <li>Fork the repository on GitHub.</li>
          <li>Create a branch from <code>main</code> with a descriptive name (e.g., <code>fix/pagination-cursor-off-by-one</code> or <code>feat/add-parquet-export</code>).</li>
          <li>Make your changes, ensuring all existing tests pass and new behavior is covered by tests.</li>
          <li>Open a pull request targeting <code>main</code>. Fill in the PR template completely, including a summary of changes, motivation, and test plan.</li>
          <li>A maintainer will review within 5 business days. For significant changes, discuss the approach in a GitHub Issue or Discord first to avoid duplicated effort.</li>
        </ol>
        <div className="callout callout-info">
          <p><strong>Note:</strong> All contributions to official repositories must pass CI (lint, type-check, unit tests, and integration tests). The CI pipeline runs automatically on every pull request.</p>
        </div>

        <h2>Community Templates</h2>
        <p>
          The community template library is a curated collection of ready-to-import configurations
          maintained in the
          <a href="https://github.com/openanalyst/templates">openanalyst/templates</a> repository.
          Templates are organized into three categories:
        </p>

        <h3>Dashboard Templates</h3>
        <ul>
          <li><strong>SaaS Metrics Dashboard</strong> — MRR, churn, CAC, LTV with cohort analysis</li>
          <li><strong>E-commerce Operations</strong> — Orders, inventory, fulfillment rates, top SKUs</li>
          <li><strong>Marketing Attribution</strong> — Multi-touch attribution across paid channels</li>
          <li><strong>Product Analytics</strong> — Funnel analysis, retention curves, feature adoption</li>
          <li><strong>Infrastructure Observability</strong> — API latency, error rates, resource utilization</li>
        </ul>

        <h3>Report Templates</h3>
        <ul>
          <li><strong>Weekly Executive Summary</strong> — KPI snapshot with week-over-week variance</li>
          <li><strong>Monthly Finance Report</strong> — Revenue, expenses, EBITDA with forecast</li>
          <li><strong>Quarterly Business Review</strong> — Comprehensive QBR with cohort, growth, and retention data</li>
          <li><strong>Customer Health Report</strong> — Usage patterns, support tickets, NPS scores</li>
        </ul>

        <h3>Agent Configurations</h3>
        <ul>
          <li><strong>Anomaly Detection Agent</strong> — Monitors key metrics and surfaces statistically significant anomalies</li>
          <li><strong>Weekly Digest Agent</strong> — Automatically summarizes last 7 days of activity across all datasets</li>
          <li><strong>Forecast Agent</strong> — Generates short-term forecasts using trend decomposition</li>
          <li><strong>Data Quality Agent</strong> — Checks datasets for null rates, outliers, and schema drift</li>
        </ul>

        <p>Import any template directly from within the app:</p>
        <pre><code>{`# Using the CLI (requires @openanalyst/sdk with CLI extension)
npx openanalyst templates import saas-metrics-dashboard

# Programmatically via the API
curl -X POST "https://api.openanalyst.com/v1/templates/import" \\
  -H "Authorization: Bearer $OPENANALYST_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "template_id": "saas-metrics-dashboard", "workspace_id": "ws_abc123" }'`}</code></pre>

        <h2>Community-Maintained Client Libraries</h2>
        <p>
          The following client libraries are built and maintained by community contributors.
          They are not officially supported by OpenAnalyst but are widely used and generally
          track the official API closely. File issues and pull requests directly in their
          respective repositories.
        </p>
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Package</th>
              <th>Repository</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ruby</td>
              <td><code>openanalyst</code> (RubyGems)</td>
              <td><a href="https://github.com/community/openanalyst-ruby">community/openanalyst-ruby</a></td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Go</td>
              <td><code>github.com/community/openanalyst-go</code></td>
              <td><a href="https://github.com/community/openanalyst-go">community/openanalyst-go</a></td>
              <td>Active</td>
            </tr>
            <tr>
              <td>PHP</td>
              <td><code>openanalyst/openanalyst</code> (Packagist)</td>
              <td><a href="https://github.com/community/openanalyst-php">community/openanalyst-php</a></td>
              <td>Active</td>
            </tr>
            <tr>
              <td>Java</td>
              <td><code>com.openanalyst:openanalyst-java</code> (Maven)</td>
              <td><a href="https://github.com/community/openanalyst-java">community/openanalyst-java</a></td>
              <td>Beta</td>
            </tr>
          </tbody>
        </table>

        <h3>Ruby Example</h3>
        <pre><code>{`require 'openanalyst'

client = OpenAnalyst::Client.new(api_key: ENV['OPENANALYST_API_KEY'])

datasets = client.datasets.list
datasets.each { |ds| puts "#{ds.id}: #{ds.name}" }

report = client.reports.create(
  name: 'Weekly Summary',
  dataset_id: 'ds_abc123',
  format: 'pdf'
)`}</code></pre>

        <h3>Go Example</h3>
        <pre><code>{`package main

import (
  "context"
  "fmt"
  "os"

  openanalyst "github.com/community/openanalyst-go"
)

func main() {
  client := openanalyst.NewClient(os.Getenv("OPENANALYST_API_KEY"))
  ctx := context.Background()

  datasets, err := client.Datasets.List(ctx, nil)
  if err != nil {
    panic(err)
  }
  for _, ds := range datasets.Data {
    fmt.Printf("%s: %s\n", ds.ID, ds.Name)
  }
}`}</code></pre>

        <h2>Partner Integrations</h2>
        <p>
          OpenAnalyst maintains official integrations with 24+ data and productivity platforms.
          Partner integrations differ from community plugins in that they are co-developed or
          certified with the partner, receive dedicated support, and are tested against the
          partner's API as part of the OpenAnalyst release process.
        </p>
        <ul>
          <li><strong>Data Warehouses</strong>: Snowflake, BigQuery, Redshift, Databricks, ClickHouse</li>
          <li><strong>Databases</strong>: PostgreSQL, MySQL, MongoDB, Supabase, PlanetScale</li>
          <li><strong>SaaS Sources</strong>: Salesforce, HubSpot, Stripe, Shopify, Mixpanel, Amplitude</li>
          <li><strong>Productivity</strong>: Slack, Microsoft Teams, Notion, Google Workspace, Linear</li>
          <li><strong>Storage</strong>: AWS S3, Google Cloud Storage, Azure Blob Storage</li>
        </ul>
        <p>
          Partners interested in building a certified integration can contact the integrations
          team at <a href="mailto:integrations@openanalyst.com">integrations@openanalyst.com</a>.
        </p>

        <h2>Developer Program</h2>
        <p>
          The OpenAnalyst Developer Program is open to all developers building plugins,
          integrations, or applications powered by the platform. Program benefits include:
        </p>
        <ul>
          <li>Free Pro plan access for development and testing workspaces</li>
          <li>Early access to new API features and beta SDK versions</li>
          <li>Dedicated developer support channel in Discord with reduced response SLAs</li>
          <li>Listing in the partner and plugin marketplace with a verified badge</li>
          <li>Revenue sharing for paid marketplace plugins (70% to the developer)</li>
          <li>Co-marketing opportunities for significant integrations</li>
        </ul>
        <p>
          Apply for the Developer Program from the Settings page inside
          <a href="https://app.openanalyst.com"> app.openanalyst.com</a> under
          Developer &gt; Developer Program.
        </p>

        <h2>Showcase</h2>
        <p>
          The following projects demonstrate the range of things teams have built on top of
          OpenAnalyst. These are highlighted by the community and are not affiliated with or
          endorsed by OpenAnalyst.
        </p>
        <ul>
          <li>
            <strong>FinDash</strong> — A self-hosted finance analytics platform built for small
            accounting firms. Uses the Python SDK to sync QuickBooks data and generate monthly
            client reports automatically.
          </li>
          <li>
            <strong>FleetPulse</strong> — Real-time logistics monitoring dashboard for a
            European fleet management company. Streams GPS and sensor data via a custom data
            source plugin and uses the Anomaly Detection agent configuration to alert on
            route deviations.
          </li>
          <li>
            <strong>DevMetrics CLI</strong> — A command-line tool that pulls GitHub, Jira, and
            PagerDuty data into OpenAnalyst and generates weekly engineering team reports. Open
            source on GitHub.
          </li>
          <li>
            <strong>SupportScope</strong> — Customer support analytics built on the JavaScript
            SDK, embedded inside a Zendesk sidebar application. Agents see real-time customer
            health scores and usage analytics while working on tickets.
          </li>
        </ul>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> To submit your project to the showcase, open a pull request against the <a href="https://github.com/openanalyst/openanalyst">openanalyst/openanalyst</a> repository adding your project to the <code>SHOWCASE.md</code> file, or post in the <strong>#showcase</strong> Discord channel for the community to review.</p>
        </div>
      </>
    ),
  },
};
