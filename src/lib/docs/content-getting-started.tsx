import type { ContentMap } from './types';

export const gettingStartedPages: ContentMap = {
  '': {
    title: 'Introduction',
    description:
      'OpenAnalyst is an AI-powered analytics platform that transforms raw data into actionable intelligence through natural-language queries, automated reporting, and intelligent AI agents.',
    content: (
      <>
        <h2>What is OpenAnalyst?</h2>
        <p>
          OpenAnalyst is a cloud-native analytics platform built around artificial intelligence.
          Rather than requiring you to write SQL, configure complex BI dashboards, or rely on data
          engineering teams for every insight, OpenAnalyst lets analysts, product managers, and
          executives interact with their data in plain language. The platform connects to your
          existing data sources, learns your schema, and generates dashboards, reports, and
          predictive models on demand.
        </p>
        <p>
          At its core, OpenAnalyst combines large language models with a purpose-built analytics
          runtime. When you ask a question like "Which customer segments drove the most revenue last
          quarter?", the platform translates that intent into the appropriate query, executes it
          against your connected data, and returns a formatted visualization — all without you
          writing a single line of code.
        </p>

        <h2>Key Features</h2>
        <p>
          OpenAnalyst ships with a comprehensive feature set designed to cover the full analytics
          workflow, from raw data ingestion to executive-level reporting.
        </p>
        <ul>
          <li>
            <strong>Real-time Analytics:</strong> Connect to live databases and streaming data
            sources for dashboards that reflect current state without manual refresh.
          </li>
          <li>
            <strong>Predictive Analytics:</strong> Leverage built-in ML models to forecast trends,
            detect anomalies, and surface leading indicators before they become lagging ones.
          </li>
          <li>
            <strong>Automated Reporting:</strong> Schedule reports to be generated and distributed
            on a cadence you define — daily digests, weekly summaries, or custom triggers.
          </li>
          <li>
            <strong>Data Visualization:</strong> An extensive chart library covering bar, line,
            scatter, heatmap, funnel, cohort, geospatial, and more, all configurable through
            natural language or a drag-and-drop interface.
          </li>
          <li>
            <strong>AI Agents:</strong> Autonomous analytics agents that monitor your data
            continuously, surface anomalies, and execute multi-step analysis pipelines without
            human intervention.
          </li>
          <li>
            <strong>24+ Integrations:</strong> Native connectors for databases, cloud storage,
            SaaS tools, and productivity platforms so your data stays in one place.
          </li>
        </ul>

        <h2>Supported AI Models</h2>
        <p>
          OpenAnalyst gives you direct control over which AI model powers your analysis. This
          matters because different models have different strengths — some excel at structured
          reasoning, others at natural-language summarization or code generation. You can switch
          models per workspace, per agent, or per individual query.
        </p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Models</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OpenAI</td>
              <td>GPT-4o, o1, o3-mini</td>
              <td>General-purpose analysis, code generation, summarization</td>
            </tr>
            <tr>
              <td>Anthropic</td>
              <td>Claude 3.5 Sonnet, Claude Opus</td>
              <td>Long-context reasoning, nuanced narrative reports</td>
            </tr>
            <tr>
              <td>DeepSeek</td>
              <td>DeepSeek V3, DeepSeek R1</td>
              <td>Mathematical reasoning, structured data analysis</td>
            </tr>
            <tr>
              <td>Alibaba / Qwen</td>
              <td>QwQ, Qwen2.5</td>
              <td>Multilingual datasets, cost-effective high-volume queries</td>
            </tr>
          </tbody>
        </table>
        <div className="callout callout-tip">
          <p>
            <strong>Tip:</strong> If you are processing large volumes of routine queries, models
            like o3-mini or Qwen2.5 offer excellent throughput at lower cost. Reserve GPT-4o or
            Claude Opus for complex, multi-step analytical reasoning tasks.
          </p>
        </div>

        <h2>Who Is OpenAnalyst For?</h2>
        <p>
          OpenAnalyst is designed for teams that need fast, reliable answers from data without
          maintaining a full data engineering stack. Typical users include:
        </p>
        <ul>
          <li>
            <strong>Business analysts</strong> who need self-serve access to operational metrics
            without waiting for engineering sprints.
          </li>
          <li>
            <strong>Product managers</strong> tracking feature adoption, funnel conversion, and
            retention cohorts in real time.
          </li>
          <li>
            <strong>Finance teams</strong> automating recurring revenue reports, variance analysis,
            and forecasting models.
          </li>
          <li>
            <strong>Data engineers</strong> who want to accelerate dashboard delivery and offload
            ad-hoc query demand from their pipelines.
          </li>
          <li>
            <strong>Executives</strong> who need clean, narrative summaries of business performance
            delivered automatically to their inbox.
          </li>
        </ul>

        <h2>Prerequisites</h2>
        <p>
          Getting started with OpenAnalyst requires only a modern web browser and access to at
          least one data source. There is nothing to install locally — the platform runs entirely
          in the cloud at{' '}
          <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">
            app.openanalyst.com
          </a>
          .
        </p>
        <ul>
          <li>A supported browser (Chrome 110+, Firefox 112+, Safari 16+, or Edge 110+)</li>
          <li>
            An account at app.openanalyst.com — create one for free, no credit card required
          </li>
          <li>
            Credentials for at least one data source (database connection string, API key, or
            file upload)
          </li>
          <li>
            For enterprise SSO: your organization's SAML 2.0 identity provider configuration
          </li>
        </ul>

        <h2>Your First Steps</h2>
        <p>
          If this is your first time using OpenAnalyst, we recommend following this path to get
          productive quickly:
        </p>
        <ol className="step-list">
          <li>
            Create your free account at{' '}
            <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">
              app.openanalyst.com
            </a>{' '}
            — setup takes under two minutes.
          </li>
          <li>
            Follow the <a href="/docs/quick-start">Quick Start guide</a> to connect your first
            data source and create your first dashboard.
          </li>
          <li>
            Review the <a href="/docs/config">Configuration</a> page to customize your workspace,
            set your preferred AI model, and configure notifications.
          </li>
          <li>
            Explore <a href="/docs/providers">Data Providers</a> to see all supported integrations
            and add more data sources.
          </li>
          <li>
            When you are ready for automation, visit the <a href="/docs/agents">AI Agents</a> page
            to set up continuous monitoring and alerting.
          </li>
        </ol>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> OpenAnalyst is a web-only platform. There is no local
            installation, no terminal commands, and no localhost server to run. Everything
            operates through your browser at app.openanalyst.com.
          </p>
        </div>
      </>
    ),
  },

  'quick-start': {
    title: 'Quick Start',
    description:
      'Get up and running with OpenAnalyst in minutes. This guide walks you through creating an account, connecting your first data source, building a dashboard, and running your first AI-powered analysis.',
    content: (
      <>
        <h2>Overview</h2>
        <p>
          This guide takes you from zero to your first working analytics dashboard in approximately
          ten minutes. You will create an account, connect a data source, build a visualization,
          and run a natural-language query against your data.
        </p>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> OpenAnalyst runs entirely in the browser at{' '}
            <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">
              app.openanalyst.com
            </a>
            . No software installation is required.
          </p>
        </div>

        <h2>Step 1: Create Your Account</h2>
        <ol className="step-list">
          <li>
            Navigate to{' '}
            <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">
              app.openanalyst.com
            </a>{' '}
            in your browser.
          </li>
          <li>
            Click <strong>Sign Up</strong> on the landing page. You can register using your
            email address or sign in with Google or GitHub for faster onboarding.
          </li>
          <li>
            If registering with email, enter your name, email address, and a password of at least
            eight characters. Click <strong>Create Account</strong>.
          </li>
          <li>
            Check your inbox for a verification email from OpenAnalyst and click the confirmation
            link. The link is valid for 24 hours.
          </li>
          <li>
            On first login you will be guided through a brief onboarding flow asking about your
            role and primary use case. These answers help personalize your initial workspace — you
            can update them later in Settings.
          </li>
        </ol>
        <div className="callout callout-tip">
          <p>
            <strong>Tip:</strong> If you do not receive the verification email within a few minutes,
            check your spam folder. You can also request a new verification link from the login
            page. If you have lost your password, use the <strong>Forgot Password</strong> link on
            the sign-in page.
          </p>
        </div>

        <h2>Step 2: Connect Your First Data Source</h2>
        <p>
          OpenAnalyst supports a wide range of data sources. For this quick start, we will connect
          a PostgreSQL database, but the steps are similar for any supported source.
        </p>
        <ol className="step-list">
          <li>
            From the main dashboard, click <strong>Connections</strong> in the left sidebar, then
            select <strong>Add Connection</strong>.
          </li>
          <li>
            Browse the connector catalog and select <strong>PostgreSQL</strong> (or your preferred
            source — Google Sheets, CSV, MySQL, and others are also available).
          </li>
          <li>
            Enter your connection details in the form:
            <pre><code>{`Host:     db.your-company.com
Port:     5432
Database: analytics_prod
Username: readonly_user
Password: ••••••••••••`}</code></pre>
          </li>
          <li>
            Click <strong>Test Connection</strong>. OpenAnalyst will verify network reachability
            and authentication. A green checkmark confirms success.
          </li>
          <li>
            Click <strong>Save Connection</strong>. OpenAnalyst will introspect your schema and
            build an index of tables, columns, and relationships. This usually completes within
            thirty seconds for databases with fewer than 500 tables.
          </li>
        </ol>
        <div className="callout callout-warning">
          <p>
            <strong>Warning:</strong> Always use a read-only database user for your OpenAnalyst
            connections. OpenAnalyst only needs SELECT permissions — never connect with a user
            that has write or administrative privileges.
          </p>
        </div>

        <h2>Step 3: Create Your First Dashboard</h2>
        <p>
          With your data source connected, you can now build a dashboard. Dashboards are
          collections of charts, metrics, and tables that you can organize, share, and schedule
          for automated delivery.
        </p>
        <ol className="step-list">
          <li>
            Click <strong>Dashboards</strong> in the left sidebar, then click{' '}
            <strong>New Dashboard</strong>.
          </li>
          <li>
            Give your dashboard a name (for example, "Sales Overview Q1 2026") and optionally
            assign it to a folder or team workspace.
          </li>
          <li>
            Click <strong>Add Widget</strong> in the top-right corner of the canvas. Select{' '}
            <strong>Chart</strong> from the widget type list.
          </li>
          <li>
            In the chart configuration panel, select your connected data source and enter a
            natural-language question such as:
            <pre><code>{`Show me monthly revenue for the last 12 months as a bar chart`}</code></pre>
          </li>
          <li>
            Click <strong>Generate</strong>. OpenAnalyst translates your question into a SQL query,
            executes it, and renders the result. You can inspect the generated SQL by clicking
            the <strong>View Query</strong> button beneath the chart.
          </li>
          <li>
            Drag widgets to reposition them and use the resize handle at the bottom-right of each
            widget to adjust dimensions. Click <strong>Save</strong> when satisfied.
          </li>
        </ol>

        <h2>Step 4: Run Your First Analysis</h2>
        <p>
          Beyond dashboards, OpenAnalyst provides an interactive analysis workspace where you can
          conduct exploratory research using conversational AI.
        </p>
        <ol className="step-list">
          <li>
            Click <strong>Analysis</strong> in the left sidebar to open the analysis workspace.
          </li>
          <li>
            Select your data connection from the source selector at the top of the workspace.
          </li>
          <li>
            Type a question in the prompt bar at the bottom of the screen. For example:
            <pre><code>{`Which product categories had the highest return rate last quarter,
and how does this compare to the same period last year?`}</code></pre>
          </li>
          <li>
            Press <strong>Enter</strong> or click <strong>Send</strong>. OpenAnalyst will generate
            and execute the necessary queries, then return a formatted response that includes
            charts, a data table, and a natural-language summary of the findings.
          </li>
          <li>
            You can follow up with additional questions in the same thread. The AI maintains
            context across the conversation, so you can refine or drill down without starting over:
            <pre><code>{`Break down the Electronics category by sub-category`}</code></pre>
          </li>
          <li>
            To save the analysis as a report or add charts to a dashboard, click the{' '}
            <strong>Save to Report</strong> or <strong>Pin to Dashboard</strong> buttons that
            appear alongside each result.
          </li>
        </ol>

        <h2>Next Steps</h2>
        <p>
          Now that you have completed your first analysis, explore these areas to get more out of
          OpenAnalyst:
        </p>
        <ul>
          <li>
            <a href="/docs/config">Configure your workspace</a> — set your default AI model,
            adjust notification preferences, and manage API keys.
          </li>
          <li>
            <a href="/docs/providers">Add more data sources</a> — connect additional databases,
            SaaS tools, and cloud storage.
          </li>
          <li>
            <a href="/docs/agents">Set up AI Agents</a> — automate continuous monitoring and
            anomaly detection.
          </li>
          <li>
            <a href="/docs/integrations">Configure integrations</a> — push reports and alerts to
            Slack, Notion, Google Sheets, and more.
          </li>
        </ul>
      </>
    ),
  },

  config: {
    title: 'Configuration',
    description:
      'Learn how to configure your OpenAnalyst account, workspace settings, API keys, notification preferences, and default AI model selection.',
    content: (
      <>
        <h2>Account Settings</h2>
        <p>
          Your account settings control your personal profile, authentication preferences, and
          security options. To access them, click your avatar in the top-right corner of the app
          and select <strong>Account Settings</strong>.
        </p>
        <ul>
          <li>
            <strong>Profile:</strong> Update your display name, email address, profile picture,
            and job title. These details appear in shared reports and team workspaces.
          </li>
          <li>
            <strong>Password:</strong> Change your password from the Security tab. OpenAnalyst
            enforces a minimum of eight characters. If you signed up via Google or GitHub SSO,
            password management is handled by your identity provider.
          </li>
          <li>
            <strong>Two-Factor Authentication (2FA):</strong> Enable TOTP-based 2FA using any
            authenticator app (Google Authenticator, Authy, 1Password). Once enabled, a code is
            required at every sign-in.
          </li>
          <li>
            <strong>Active Sessions:</strong> Review all devices currently signed in to your
            account. You can revoke any session individually or sign out of all devices at once.
          </li>
        </ul>

        <h2>Workspace Configuration</h2>
        <p>
          Workspaces are shared environments where teams collaborate on dashboards, reports, and
          data connections. Each workspace has its own settings, members, and billing (on paid
          plans). Navigate to <strong>Settings &gt; Workspace</strong> to manage these options.
        </p>
        <ul>
          <li>
            <strong>Workspace Name and Slug:</strong> The workspace slug forms the URL for all
            shared resources. Choose a short, memorable identifier — it cannot be changed after
            creation without redirecting existing links.
          </li>
          <li>
            <strong>Member Management:</strong> Invite team members by email. Assign roles:
            Viewer (read-only), Analyst (create and edit), or Admin (full control including
            billing and member management).
          </li>
          <li>
            <strong>Data Governance:</strong> Configure which data connections are visible to
            which roles. Sensitive sources can be restricted to Admins and Analysts only, keeping
            raw credentials away from Viewer-level users.
          </li>
          <li>
            <strong>Audit Logging:</strong> Available on Pro and above plans. All actions — query
            execution, data exports, permission changes — are logged with timestamps and user
            attribution.
          </li>
        </ul>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> Free plan workspaces are limited to one member (personal use
            only). To collaborate with teammates, upgrade to Basic or higher.
          </p>
        </div>

        <h2>Default AI Model Selection</h2>
        <p>
          OpenAnalyst lets you choose which AI model is used by default for analysis queries,
          report generation, and AI agents. You can set a workspace-level default and override
          it per-agent or per-analysis session.
        </p>
        <p>
          To change the default model, go to <strong>Settings &gt; AI Models</strong> and select
          your preferred provider and model from the dropdown. The available options are:
        </p>
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Provider</th>
              <th>Context Window</th>
              <th>Recommended For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GPT-4o</td>
              <td>OpenAI</td>
              <td>128k tokens</td>
              <td>General analysis, balanced speed and quality</td>
            </tr>
            <tr>
              <td>o1</td>
              <td>OpenAI</td>
              <td>200k tokens</td>
              <td>Complex multi-step reasoning</td>
            </tr>
            <tr>
              <td>o3-mini</td>
              <td>OpenAI</td>
              <td>128k tokens</td>
              <td>High-volume, cost-efficient queries</td>
            </tr>
            <tr>
              <td>Claude 3.5 Sonnet</td>
              <td>Anthropic</td>
              <td>200k tokens</td>
              <td>Narrative reports, long-context analysis</td>
            </tr>
            <tr>
              <td>Claude Opus</td>
              <td>Anthropic</td>
              <td>200k tokens</td>
              <td>Highest-quality output for critical reports</td>
            </tr>
            <tr>
              <td>DeepSeek V3</td>
              <td>DeepSeek</td>
              <td>64k tokens</td>
              <td>Structured data, mathematical computations</td>
            </tr>
            <tr>
              <td>DeepSeek R1</td>
              <td>DeepSeek</td>
              <td>64k tokens</td>
              <td>Reasoning-intensive analytics tasks</td>
            </tr>
            <tr>
              <td>QwQ</td>
              <td>Qwen / Alibaba</td>
              <td>32k tokens</td>
              <td>Chain-of-thought reasoning</td>
            </tr>
            <tr>
              <td>Qwen2.5</td>
              <td>Qwen / Alibaba</td>
              <td>128k tokens</td>
              <td>Multilingual datasets, cost efficiency</td>
            </tr>
          </tbody>
        </table>

        <h2>API Keys</h2>
        <p>
          API keys allow programmatic access to OpenAnalyst via the REST API and are required
          for SDK integrations and server-side automation. Manage your keys under{' '}
          <strong>Settings &gt; API Keys</strong>.
        </p>
        <ol className="step-list">
          <li>
            Click <strong>Generate New Key</strong>. Give the key a descriptive name such as
            "Production ETL Pipeline" so you can identify its usage later.
          </li>
          <li>
            Copy the key immediately after creation — for security reasons, the full key value is
            only shown once and cannot be retrieved afterward.
          </li>
          <li>
            Set an expiration date if your security policy requires key rotation. Keys can be set
            to expire in 30, 90, or 365 days, or set to never expire.
          </li>
          <li>
            Use the key in your API calls by setting the Authorization header:
            <pre><code>{`Authorization: Bearer oa_sk_your_api_key_here`}</code></pre>
          </li>
          <li>
            To revoke a key, click the trash icon next to it. Revocation is immediate and
            permanent — any integrations using that key will stop working immediately.
          </li>
        </ol>
        <div className="callout callout-warning">
          <p>
            <strong>Warning:</strong> Never commit API keys to source control or share them in
            public channels. Use environment variables or a secrets manager to store them
            securely. If a key is accidentally exposed, revoke it immediately and generate a
            replacement.
          </p>
        </div>

        <h2>Notification Settings</h2>
        <p>
          OpenAnalyst can notify you when scheduled reports are delivered, when AI agents detect
          anomalies, or when a teammate shares a dashboard with you. Configure these under{' '}
          <strong>Settings &gt; Notifications</strong>.
        </p>
        <ul>
          <li>
            <strong>Email Notifications:</strong> Choose which event types trigger email delivery.
            Each category — reports, alerts, sharing, system — can be enabled or disabled
            independently.
          </li>
          <li>
            <strong>In-App Notifications:</strong> The notification bell in the top-right corner
            of the app surfaces real-time alerts. You can configure which categories appear here.
          </li>
          <li>
            <strong>Slack / Discord Alerts:</strong> Once you have configured a Slack or Discord
            integration, you can route specific alert types to designated channels. This is
            particularly useful for anomaly detection alerts that need immediate attention.
          </li>
          <li>
            <strong>Digest Frequency:</strong> Instead of individual notifications for every
            event, opt into a daily or weekly digest that summarizes all activity in one email.
          </li>
        </ul>

        <h2>Preferences</h2>
        <p>
          Under <strong>Settings &gt; Preferences</strong>, you can customize OpenAnalyst's
          behavior to match your workflow:
        </p>
        <ul>
          <li>
            <strong>Theme:</strong> Choose between Dark (default), Light, or System (follows your
            OS preference).
          </li>
          <li>
            <strong>Default Date Range:</strong> Set the default time range that pre-populates
            when you open new analysis sessions (Last 7 days, Last 30 days, Last quarter, etc.).
          </li>
          <li>
            <strong>Number Formatting:</strong> Configure how large numbers are displayed — commas
            as thousands separators, SI notation (1.2M), or full numeric display.
          </li>
          <li>
            <strong>Timezone:</strong> All timestamps in OpenAnalyst are stored in UTC and
            displayed in your configured timezone. Set this to your local timezone or your
            business's primary operating timezone.
          </li>
          <li>
            <strong>Language:</strong> The interface currently supports English. Additional
            languages are on the product roadmap.
          </li>
        </ul>
      </>
    ),
  },

  providers: {
    title: 'Data Providers',
    description:
      'OpenAnalyst connects to a broad ecosystem of data sources including relational databases, cloud data warehouses, SaaS platforms, cloud storage, APIs, and local file uploads.',
    content: (
      <>
        <h2>Overview</h2>
        <p>
          A data provider (also called a connector or integration) is a configured link between
          OpenAnalyst and an external data source. Once connected, OpenAnalyst indexes the
          schema of your data source, making it available for natural-language queries,
          dashboards, and AI agent workflows.
        </p>
        <p>
          All connection credentials are encrypted at rest using AES-256 and in transit over
          TLS 1.3. OpenAnalyst never stores a copy of your raw data — queries run against your
          source in real time or against a configurable cache layer.
        </p>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> To add a new data source, navigate to{' '}
            <strong>Connections &gt; Add Connection</strong> in your workspace. The connector
            catalog is searchable and organized by category.
          </p>
        </div>

        <h2>Relational Databases</h2>
        <p>
          OpenAnalyst provides native connectors for all major relational databases. These
          connectors use read-only query execution and support parameterized queries, connection
          pooling, and SSL/TLS authentication.
        </p>
        <table>
          <thead>
            <tr>
              <th>Database</th>
              <th>Min. Version</th>
              <th>Authentication</th>
              <th>SSL Support</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PostgreSQL</td>
              <td>11.0</td>
              <td>Username/password, SSL client cert</td>
              <td>Yes (required on prod)</td>
            </tr>
            <tr>
              <td>MySQL</td>
              <td>5.7</td>
              <td>Username/password</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>MongoDB</td>
              <td>4.4</td>
              <td>Username/password, X.509, AWS IAM</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Snowflake</td>
              <td>All versions</td>
              <td>Username/password, key-pair, SSO</td>
              <td>Always-on</td>
            </tr>
            <tr>
              <td>BigQuery</td>
              <td>All versions</td>
              <td>Service account JSON, OAuth</td>
              <td>Always-on</td>
            </tr>
          </tbody>
        </table>

        <h3>PostgreSQL</h3>
        <p>
          The PostgreSQL connector supports standard connection strings and advanced options
          including read replicas, connection pooling via PgBouncer, and schema-level access
          control. You can restrict OpenAnalyst to specific schemas to limit the data it can
          access.
        </p>
        <pre><code>{`# Example connection string format
postgresql://readonly_user:password@db.example.com:5432/analytics_db?sslmode=require

# Granting read-only access (run in your PostgreSQL instance)
CREATE ROLE openanalyst_reader WITH LOGIN PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE analytics_db TO openanalyst_reader;
GRANT USAGE ON SCHEMA public TO openanalyst_reader;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO openanalyst_reader;`}</code></pre>

        <h3>MySQL</h3>
        <p>
          The MySQL connector is compatible with MySQL 5.7 and above, as well as MariaDB 10.3
          and above. It supports both the classic mysql protocol and the newer X Protocol. For
          cloud-hosted MySQL instances (Amazon RDS, Google Cloud SQL, PlanetScale), standard
          connection parameters apply.
        </p>
        <pre><code>{`# Grant read-only MySQL access
CREATE USER 'openanalyst'@'%' IDENTIFIED BY 'strong_password';
GRANT SELECT ON analytics_db.* TO 'openanalyst'@'%';
FLUSH PRIVILEGES;`}</code></pre>

        <h3>MongoDB</h3>
        <p>
          The MongoDB connector connects to replica sets and sharded clusters. OpenAnalyst
          automatically samples collection schemas to build its understanding of your document
          structure. For collections with highly variable schemas, you can provide a manual
          schema hint in the connection settings.
        </p>
        <pre><code>{`# Example MongoDB connection URI
mongodb+srv://openanalyst:password@cluster0.abc123.mongodb.net/analytics?authSource=admin`}</code></pre>

        <h3>Snowflake</h3>
        <p>
          The Snowflake connector authenticates via username/password, RSA key-pair, or
          Okta-based SSO. You can specify a warehouse, database, schema, and role. OpenAnalyst
          creates its own session and respects Snowflake's query timeout and cost controls.
        </p>

        <h3>BigQuery</h3>
        <p>
          The BigQuery connector uses Google service account credentials. Create a service
          account with the <code>BigQuery Data Viewer</code> and{' '}
          <code>BigQuery Job User</code> roles, then download the JSON key file and paste its
          contents into the connector form.
        </p>

        <h2>Cloud Data Warehouses and Storage</h2>
        <p>
          In addition to relational databases, OpenAnalyst can query data stored in cloud
          object storage and modern lakehouse formats.
        </p>
        <ul>
          <li>
            <strong>AWS S3:</strong> Connect via IAM access keys or IAM role assumption.
            OpenAnalyst can query Parquet, CSV, and JSON files directly, or integrate with
            AWS Athena for SQL-based querying over S3.
          </li>
          <li>
            <strong>Google Cloud Storage:</strong> Authenticate with a service account. Supports
            Parquet, CSV, Avro, and ORC file formats.
          </li>
          <li>
            <strong>Azure Blob Storage:</strong> Connect with a connection string or SAS token.
            Support for Delta Lake tables is available on Pro and above plans.
          </li>
        </ul>

        <h2>SaaS and Productivity Platforms</h2>
        <p>
          OpenAnalyst integrates directly with popular business tools to bring operational data
          into your analytics workflows without exporting to a database first.
        </p>
        <ul>
          <li>
            <strong>Google Sheets:</strong> Authenticate via Google OAuth. OpenAnalyst can read
            any sheet in your Google Drive that you have granted access to. Data refreshes on
            query or on a configurable schedule.
          </li>
          <li>
            <strong>Airtable:</strong> Connect with your Airtable API key or OAuth token. All
            bases and tables in your workspace are discoverable. Supports linked records and
            formula field expansion.
          </li>
          <li>
            <strong>Notion:</strong> Use the Notion integration token to read database pages.
            OpenAnalyst maps Notion database properties to a tabular schema for querying.
          </li>
          <li>
            <strong>Salesforce:</strong> Connect via OAuth 2.0. Supports standard and custom
            objects. OpenAnalyst uses the SOQL query interface internally.
          </li>
          <li>
            <strong>HubSpot:</strong> Connect via private app tokens. Access CRM data including
            contacts, deals, companies, and custom pipelines.
          </li>
        </ul>

        <h2>APIs and Custom Sources</h2>
        <p>
          For data sources that do not have a native connector, OpenAnalyst provides a generic
          API connector that can fetch and parse JSON or CSV responses from any HTTP endpoint.
        </p>
        <ul>
          <li>
            <strong>REST APIs:</strong> Configure the base URL, authentication method (API key
            header, Bearer token, Basic auth, OAuth 2.0), and pagination strategy (cursor,
            offset, link header).
          </li>
          <li>
            <strong>GraphQL:</strong> Provide the GraphQL endpoint and your query. OpenAnalyst
            maps the response structure to a tabular format.
          </li>
          <li>
            <strong>Webhooks:</strong> Use OpenAnalyst as a webhook receiver. Incoming payloads
            are stored in a managed buffer table that you can query like any other source.
          </li>
        </ul>

        <h2>File Uploads</h2>
        <p>
          For one-off analysis or importing historical data, OpenAnalyst accepts direct file
          uploads:
        </p>
        <ul>
          <li>
            <strong>CSV:</strong> Up to 500 MB per file. Delimiter and encoding are
            auto-detected. Custom delimiters can be specified manually.
          </li>
          <li>
            <strong>Excel (.xlsx, .xls):</strong> All sheets within the workbook are imported
            as separate tables. Formula values are captured at upload time.
          </li>
          <li>
            <strong>JSON:</strong> Both flat and nested JSON structures are supported. Nested
            objects are flattened using dot notation (e.g., <code>address.city</code>).
          </li>
          <li>
            <strong>Parquet:</strong> Compressed columnar format. Ideal for large datasets where
            CSV would be impractical.
          </li>
        </ul>
        <div className="callout callout-tip">
          <p>
            <strong>Tip:</strong> For regularly updated file-based data, consider using the
            Google Sheets or Airtable connectors instead of repeated file uploads. They
            automatically reflect the latest data without manual re-upload.
          </p>
        </div>
      </>
    ),
  },

  network: {
    title: 'Network & Security',
    description:
      'OpenAnalyst is built with a security-first architecture. This page covers data encryption, compliance certifications, network requirements, firewall configuration, and IP whitelisting.',
    content: (
      <>
        <h2>Security Architecture Overview</h2>
        <p>
          OpenAnalyst is designed on a zero-trust security model. The platform assumes that no
          network, user, or device is inherently trusted, and enforces authentication and
          authorization at every layer. All components run in isolated, single-tenant environments
          for Pro and above plans, and in a hardened multi-tenant environment for Free and Basic
          plans.
        </p>
        <p>
          The security architecture is built around four pillars: encryption at every boundary,
          least-privilege access controls, continuous audit logging, and regular third-party
          penetration testing.
        </p>

        <h2>Data Encryption</h2>
        <h3>In Transit</h3>
        <p>
          All data transmitted between your browser and OpenAnalyst's infrastructure is encrypted
          using TLS 1.3. Older TLS versions (1.0, 1.1, 1.2) are disabled on all endpoints.
          HTTP connections are automatically redirected to HTTPS. Certificate management uses
          automated rotation through a trusted certificate authority with HSTS (HTTP Strict
          Transport Security) headers enforced.
        </p>
        <p>
          Connections from OpenAnalyst to your data sources also use TLS wherever supported.
          For database connectors, OpenAnalyst enforces <code>sslmode=require</code> or
          equivalent by default. You can optionally require SSL client certificates for
          additional mutual authentication.
        </p>

        <h3>At Rest</h3>
        <p>
          All data stored by OpenAnalyst — including connection credentials, query results in
          cache, uploaded files, dashboard configurations, and audit logs — is encrypted at rest
          using AES-256-GCM. Encryption keys are managed through a dedicated key management
          service (KMS) and are rotated automatically on a 90-day cycle.
        </p>
        <p>
          Connection passwords and API credentials are stored in an encrypted vault using
          envelope encryption: a data encryption key (DEK) encrypts the credential, and a
          key encryption key (KEK) stored in KMS encrypts the DEK. The raw credential is never
          written to a general-purpose datastore.
        </p>

        <h2>Compliance</h2>
        <table>
          <thead>
            <tr>
              <th>Standard</th>
              <th>Status</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SOC 2 Type II</td>
              <td>Certified</td>
              <td>All plans (report available on request)</td>
            </tr>
            <tr>
              <td>GDPR</td>
              <td>Compliant</td>
              <td>All plans</td>
            </tr>
            <tr>
              <td>CCPA</td>
              <td>Compliant</td>
              <td>All plans</td>
            </tr>
            <tr>
              <td>HIPAA BAA</td>
              <td>Available</td>
              <td>Enterprise plan</td>
            </tr>
            <tr>
              <td>ISO 27001</td>
              <td>In progress</td>
              <td>Scheduled Q3 2026</td>
            </tr>
          </tbody>
        </table>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> To request the SOC 2 Type II report or a Data Processing
            Agreement (DPA) for GDPR compliance, contact your account manager or email{' '}
            security@openanalyst.com.
          </p>
        </div>

        <h2>SSO and SAML</h2>
        <p>
          OpenAnalyst supports Single Sign-On (SSO) via SAML 2.0, enabling enterprise customers
          to manage authentication through their existing identity provider (IdP). Supported
          providers include Okta, Azure Active Directory, Google Workspace, OneLogin, and any
          SAML 2.0-compliant IdP.
        </p>
        <p>
          SSO configuration is available on the Pro plan and above. To configure SSO:
        </p>
        <ol className="step-list">
          <li>
            Navigate to <strong>Settings &gt; Security &gt; SSO/SAML</strong> in your workspace.
          </li>
          <li>
            Copy the <strong>ACS URL</strong> and <strong>Entity ID</strong> values shown on
            the configuration page.
          </li>
          <li>
            In your identity provider, create a new SAML application using the ACS URL as the
            callback URL and the Entity ID as the audience URI.
          </li>
          <li>
            Map the following SAML attributes in your IdP:
            <pre><code>{`email         → user.email (required)
firstName     → user.firstName
lastName      → user.lastName
role          → openanalyst.role (optional: viewer | analyst | admin)`}</code></pre>
          </li>
          <li>
            Paste the IdP's <strong>Metadata XML</strong> or <strong>Metadata URL</strong> into
            the OpenAnalyst SSO configuration form and click <strong>Save and Test</strong>.
          </li>
        </ol>
        <div className="callout callout-tip">
          <p>
            <strong>Tip:</strong> Enable <strong>Enforce SSO</strong> after confirming that SSO
            works correctly. This disables username/password login for all workspace members,
            requiring all access to go through your IdP. Workspace admins retain an emergency
            bypass code in case of IdP outage.
          </p>
        </div>

        <h2>Network Requirements</h2>
        <p>
          OpenAnalyst is a SaaS product accessed entirely through the browser at
          app.openanalyst.com. There are no agent processes, desktop clients, or VPN
          requirements for end users. However, for OpenAnalyst to connect to your data sources,
          the following network conditions must be met:
        </p>
        <ul>
          <li>
            Your data source must be reachable from OpenAnalyst's egress IP addresses (see
            below). This typically means either making the database publicly accessible with
            IP-based access control, or setting up a site-to-site VPN or private network peering.
          </li>
          <li>
            For on-premise databases, the OpenAnalyst Network Bridge agent can be deployed
            inside your network. The bridge establishes an outbound-only, encrypted tunnel to
            OpenAnalyst — no inbound firewall rules required. Available on Pro and Enterprise
            plans.
          </li>
        </ul>

        <h2>Firewall Rules and IP Whitelisting</h2>
        <p>
          To allow OpenAnalyst to connect to your database, whitelist the following egress IP
          addresses in your firewall or security group:
        </p>
        <pre><code>{`# OpenAnalyst static egress IPs (add all to your allowlist)
52.14.88.201
52.14.88.202
52.14.88.203
52.14.88.204

# CIDR notation
52.14.88.200/29`}</code></pre>
        <div className="callout callout-warning">
          <p>
            <strong>Warning:</strong> IP addresses are subject to change with advance notice.
            Subscribe to the OpenAnalyst status page at status.openanalyst.com to receive
            notifications of infrastructure changes, including IP updates.
          </p>
        </div>
        <p>
          For cloud-hosted databases, the typical firewall configuration looks like this:
        </p>
        <pre><code>{`# AWS RDS Security Group - inbound rule example
Type:       PostgreSQL
Protocol:   TCP
Port:       5432
Source:     52.14.88.200/29
Description: OpenAnalyst connector

# Google Cloud SQL - Authorized Networks
Network:    52.14.88.200/29
Name:       openanalyst-connector`}</code></pre>

        <h2>Data Residency</h2>
        <p>
          By default, OpenAnalyst processes and caches query results in the United States
          (AWS us-east-1). Enterprise customers can request data residency in the European Union
          (AWS eu-west-1) or other supported regions. Data residency configuration ensures that
          query result caches, audit logs, and workspace configuration data never leave the
          designated geographic region.
        </p>
      </>
    ),
  },

  enterprise: {
    title: 'Enterprise',
    description:
      'Enterprise features for large organizations: SSO, audit logs, dedicated support, custom SLAs, advanced permissions, on-premise deployment options, volume licensing, and custom integrations.',
    content: (
      <>
        <h2>Enterprise Overview</h2>
        <p>
          OpenAnalyst Enterprise is designed for large organizations with advanced security,
          compliance, and operational requirements. It extends the Max plan with capabilities
          built specifically for enterprise IT governance, procurement processes, and large-scale
          deployment. Pricing is custom and based on seat count, data volume, and selected
          add-ons — contact the sales team at enterprise@openanalyst.com for a proposal.
        </p>
        <p>
          The core difference between Enterprise and other plans is the combination of
          contractual commitments (SLAs, DPAs, custom MSAs), technical capabilities (on-premise
          deployment, SSO enforcement, dedicated infrastructure), and operational support
          (named account manager, enterprise support queue, professional services).
        </p>

        <h2>SSO and Identity Management</h2>
        <p>
          Enterprise plans include full SAML 2.0 SSO with the following additional capabilities
          beyond the standard SSO offering:
        </p>
        <ul>
          <li>
            <strong>SCIM Provisioning:</strong> Automate user provisioning and deprovisioning
            via SCIM 2.0. When a user is added to or removed from the OpenAnalyst group in your
            IdP, their account is created or deactivated automatically — no manual sync required.
          </li>
          <li>
            <strong>Role Mapping:</strong> Map IdP groups directly to OpenAnalyst roles and
            workspace memberships. A user joining the "Data Analysts" group in your IdP can be
            automatically granted Analyst access to specific workspaces.
          </li>
          <li>
            <strong>SSO Enforcement:</strong> Require all users in the organization to
            authenticate exclusively through your IdP. Password-based login is disabled. An
            emergency break-glass admin account is provided separately.
          </li>
          <li>
            <strong>Multi-IdP Support:</strong> Large enterprises with multiple business units
            and different identity providers can configure per-workspace IdP routing.
          </li>
        </ul>

        <h2>Audit Logs</h2>
        <p>
          Enterprise audit logs provide a complete, immutable record of all activity within your
          OpenAnalyst organization. Logs are retained for a minimum of 12 months and can be
          extended to 7 years for compliance-sensitive industries.
        </p>
        <p>
          The following event categories are captured in the audit log:
        </p>
        <ul>
          <li>Authentication events (login, logout, SSO assertion, MFA challenge)</li>
          <li>Data connection creation, modification, and deletion</li>
          <li>Query execution (including the query text, data source, user, and timestamp)</li>
          <li>Dashboard and report creation, editing, sharing, and deletion</li>
          <li>Data exports and downloads</li>
          <li>Permission and role changes</li>
          <li>API key creation and revocation</li>
          <li>Billing and subscription changes</li>
          <li>AI agent creation, modification, and execution</li>
        </ul>
        <p>
          Audit logs can be exported in JSON or CSV format from the admin console, or streamed
          in real time to a SIEM (Security Information and Event Management) system via webhook
          or the audit log streaming API.
        </p>
        <pre><code>{`# Example audit log entry (JSON)
{
  "id": "evt_01HZ3K8X4MBNW7P2QVDTJSRF6",
  "timestamp": "2026-02-27T14:32:11.421Z",
  "actor": {
    "id": "usr_01HZ1A2BC3DEFG4H",
    "email": "analyst@company.com",
    "ip_address": "203.0.113.42"
  },
  "action": "query.executed",
  "resource": {
    "type": "data_connection",
    "id": "conn_01HZ0X9Y8Z7W6V5U",
    "name": "analytics_prod (PostgreSQL)"
  },
  "metadata": {
    "query_id": "qry_01HZ3K8X4MBNW7P2",
    "row_count": 1842,
    "duration_ms": 234
  }
}`}</code></pre>

        <h2>Advanced Permissions</h2>
        <p>
          Enterprise plans include a granular, attribute-based access control (ABAC) system
          that goes beyond the standard Viewer / Analyst / Admin role model:
        </p>
        <ul>
          <li>
            <strong>Row-level Security:</strong> Restrict which rows of a connected data source
            a user can query, based on their identity attributes. A sales analyst in the US
            region can only see US records even when querying the same global table as a
            manager with full access.
          </li>
          <li>
            <strong>Column-level Security:</strong> Mask or hide specific columns for users
            without the appropriate clearance. PII fields like email and phone number can be
            masked for analysts who do not need the raw values.
          </li>
          <li>
            <strong>Dashboard Sharing Controls:</strong> Set expiration dates on shared
            dashboard links, require authentication to view shared content, and restrict
            sharing to users within the organization domain.
          </li>
          <li>
            <strong>IP-based Access Restrictions:</strong> Limit workspace access to requests
            originating from your corporate IP ranges or VPN.
          </li>
        </ul>

        <h2>Dedicated Support and SLAs</h2>
        <p>
          Enterprise customers receive service level commitments and a dedicated support
          structure:
        </p>
        <table>
          <thead>
            <tr>
              <th>Support Tier</th>
              <th>Response Time</th>
              <th>Availability</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>P1 - Critical (service down)</td>
              <td>30 minutes</td>
              <td>24/7/365</td>
            </tr>
            <tr>
              <td>P2 - High (major feature impaired)</td>
              <td>2 hours</td>
              <td>24/7/365</td>
            </tr>
            <tr>
              <td>P3 - Medium (feature degraded)</td>
              <td>8 business hours</td>
              <td>Business hours</td>
            </tr>
            <tr>
              <td>P4 - Low (general questions)</td>
              <td>1 business day</td>
              <td>Business hours</td>
            </tr>
          </tbody>
        </table>
        <p>
          Enterprise customers are assigned a named Customer Success Manager (CSM) and Technical
          Account Manager (TAM). The CSM handles onboarding, training, and adoption programs.
          The TAM provides technical guidance on architecture, integration design, and platform
          optimization.
        </p>

        <h2>On-Premise and Hybrid Deployment</h2>
        <p>
          For organizations with strict data sovereignty requirements or air-gapped environments,
          OpenAnalyst Enterprise offers an on-premise deployment option.
        </p>
        <ul>
          <li>
            <strong>Container-based deployment:</strong> OpenAnalyst is packaged as a set of
            Docker containers orchestrated with Kubernetes. A Helm chart is provided for
            deployment to your existing Kubernetes cluster.
          </li>
          <li>
            <strong>Air-gap support:</strong> All container images can be mirrored to a private
            registry. The application operates without outbound internet access once deployed.
          </li>
          <li>
            <strong>Hybrid mode:</strong> Process and store data on-premise while maintaining
            a management plane connection to OpenAnalyst for license validation and feature
            updates.
          </li>
        </ul>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> On-premise deployment requires a minimum 3-year contract.
            Professional services for deployment and configuration are available at additional
            cost. Contact enterprise@openanalyst.com for infrastructure requirements and
            pricing.
          </p>
        </div>

        <h2>Volume Licensing and Custom Integrations</h2>
        <p>
          Enterprise agreements include volume-based pricing that reduces per-seat cost at scale.
          Organizations with more than 100 users typically see 40-60% savings compared to
          per-seat Max plan pricing.
        </p>
        <p>
          Custom integration development is available through the professional services team.
          If your organization uses an internal data platform, proprietary database, or
          business application not covered by the standard connector catalog, the OpenAnalyst
          professional services team can build and maintain a production-grade custom connector
          as part of your Enterprise agreement.
        </p>
      </>
    ),
  },

  troubleshooting: {
    title: 'Troubleshooting',
    description:
      'Solutions to common problems with login, data synchronization, dashboard performance, AI agent errors, and more. Includes error code reference and instructions for contacting support.',
    content: (
      <>
        <h2>Login and Authentication Issues</h2>

        <h3>Cannot Log In</h3>
        <p>
          If you are unable to sign in to your account at app.openanalyst.com, work through
          the following steps:
        </p>
        <ol className="step-list">
          <li>
            Confirm you are using the correct email address. OpenAnalyst accounts are tied to
            a specific email — check if you might have used a different address when signing up.
          </li>
          <li>
            Use the <strong>Forgot Password</strong> link on the login page to request a
            password reset email. The reset link is valid for one hour.
          </li>
          <li>
            If you signed up via Google or GitHub OAuth, make sure you are clicking the
            matching social login button rather than the email/password form.
          </li>
          <li>
            Check that your browser has cookies and JavaScript enabled. OpenAnalyst requires
            both to function.
          </li>
          <li>
            Try logging in from an incognito/private window to rule out browser extension
            interference.
          </li>
          <li>
            If your organization uses SSO and you are receiving an error, check with your IT
            administrator that your account is provisioned in the OpenAnalyst group within
            your identity provider.
          </li>
        </ol>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> If your account has been deactivated due to inactivity or
            a billing issue, you will see an "Account Suspended" error rather than an
            authentication failure. Contact support@openanalyst.com to reactivate.
          </p>
        </div>

        <h3>Two-Factor Authentication Issues</h3>
        <p>
          If your 2FA code is being rejected, verify that your device's clock is synchronized
          (TOTP codes are time-sensitive and fail if your clock is off by more than 30 seconds).
          If you have lost access to your authenticator app, use one of the backup codes that
          were presented when you first enabled 2FA. If you have exhausted your backup codes,
          contact support to initiate an identity-verified account recovery process.
        </p>

        <h2>Data Sync and Connection Problems</h2>

        <h3>Connection Test Fails</h3>
        <p>
          When a data source connection test fails, the error message will indicate the category
          of failure:
        </p>
        <table>
          <thead>
            <tr>
              <th>Error</th>
              <th>Likely Cause</th>
              <th>Resolution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Connection refused</td>
              <td>Firewall blocking OpenAnalyst IPs</td>
              <td>Whitelist OpenAnalyst egress IPs (see Network &amp; Security page)</td>
            </tr>
            <tr>
              <td>Authentication failed</td>
              <td>Wrong credentials</td>
              <td>Verify username and password; confirm the database user exists</td>
            </tr>
            <tr>
              <td>SSL handshake error</td>
              <td>Certificate mismatch or expired cert</td>
              <td>Renew server certificate; check SSL mode settings</td>
            </tr>
            <tr>
              <td>Timeout</td>
              <td>Database unreachable or overloaded</td>
              <td>Verify the hostname/IP is correct; check database server status</td>
            </tr>
            <tr>
              <td>Unknown database</td>
              <td>Incorrect database name</td>
              <td>Confirm the database name is spelled correctly and exists</td>
            </tr>
          </tbody>
        </table>

        <h3>Data Not Refreshing</h3>
        <p>
          If dashboards are showing stale data:
        </p>
        <ul>
          <li>
            Check the data source's refresh interval under{' '}
            <strong>Connections &gt; [your connection] &gt; Settings &gt; Refresh Schedule</strong>.
            The default is on-demand (no automatic refresh); set a schedule if you need
            periodic updates.
          </li>
          <li>
            Click the <strong>Refresh</strong> button on the dashboard to force an immediate
            query against the live data source.
          </li>
          <li>
            If the connection status shows "Degraded" or "Error", the data source may be
            temporarily unreachable. Check the connection's health indicator and view recent
            error logs from the connection settings page.
          </li>
        </ul>

        <h2>Slow Dashboards</h2>
        <p>
          Dashboard load times depend on query complexity, data volume, and the performance of
          your underlying data source. If dashboards are loading slowly, consider these
          optimizations:
        </p>
        <ul>
          <li>
            <strong>Add indexes to your database:</strong> OpenAnalyst generates standard SQL
            queries. If the columns used in your dashboard filters and GROUP BY clauses are
            unindexed, query performance will be poor regardless of OpenAnalyst settings.
          </li>
          <li>
            <strong>Enable query result caching:</strong> Under{' '}
            <strong>Connections &gt; [your connection] &gt; Settings &gt; Cache</strong>, enable
            result caching with an appropriate TTL. Cached queries return in milliseconds instead
            of seconds.
          </li>
          <li>
            <strong>Reduce dashboard widget count:</strong> Each widget executes an independent
            query on load. Dashboards with 20+ widgets may load slowly. Consider splitting
            into multiple focused dashboards.
          </li>
          <li>
            <strong>Use materialized views or pre-aggregated tables:</strong> For complex
            analytical queries, create materialized views in your database and point the
            OpenAnalyst widgets at those instead of raw tables.
          </li>
        </ul>

        <h2>AI Agent Errors</h2>
        <p>
          AI agents are long-running processes that can fail for several reasons:
        </p>
        <ul>
          <li>
            <strong>AGENT_TIMEOUT:</strong> The agent exceeded its allowed execution time.
            Increase the timeout in the agent settings, or break the analysis into smaller
            steps.
          </li>
          <li>
            <strong>CONTEXT_LIMIT_EXCEEDED:</strong> The query or analysis exceeded the
            selected model's context window. Switch to a model with a larger context window
            (Claude 3.5 Sonnet or o1 support 200k tokens) or reduce the data being processed.
          </li>
          <li>
            <strong>QUERY_PARSE_ERROR:</strong> The AI was unable to generate a valid query
            from the prompt. This often happens with ambiguous column names or complex business
            logic. Try rephrasing the prompt with more specific column and table names.
          </li>
          <li>
            <strong>DATA_SOURCE_UNAVAILABLE:</strong> The agent attempted to query a data source
            that was unreachable at execution time. Check the connection health and retry.
          </li>
        </ul>

        <h2>Error Code Reference</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OA-1001</td>
              <td>Authentication token expired — sign in again</td>
            </tr>
            <tr>
              <td>OA-1002</td>
              <td>Insufficient permissions for this action</td>
            </tr>
            <tr>
              <td>OA-2001</td>
              <td>Data source connection refused</td>
            </tr>
            <tr>
              <td>OA-2002</td>
              <td>Data source authentication failed</td>
            </tr>
            <tr>
              <td>OA-2003</td>
              <td>Query execution timeout</td>
            </tr>
            <tr>
              <td>OA-2004</td>
              <td>Query returned no results</td>
            </tr>
            <tr>
              <td>OA-3001</td>
              <td>AI model request failed — retry or switch model</td>
            </tr>
            <tr>
              <td>OA-3002</td>
              <td>Context window exceeded</td>
            </tr>
            <tr>
              <td>OA-4001</td>
              <td>Export failed — file too large</td>
            </tr>
            <tr>
              <td>OA-5001</td>
              <td>Internal server error — contact support if persistent</td>
            </tr>
          </tbody>
        </table>

        <h2>Debug Mode</h2>
        <p>
          Debug mode provides additional diagnostic information in the interface. To enable it,
          open the browser console and run:
        </p>
        <pre><code>{`localStorage.setItem('oa_debug', 'true');
// Then refresh the page`}</code></pre>
        <p>
          With debug mode enabled, query panels will show the generated SQL, execution time
          breakdown, cache hit/miss status, and the full AI model request/response. To disable:
        </p>
        <pre><code>{`localStorage.removeItem('oa_debug');`}</code></pre>

        <h2>Clearing Cache</h2>
        <p>
          If you are experiencing unexpected behavior that cannot be explained by data or
          configuration issues, clearing the browser cache for app.openanalyst.com can resolve
          stale state problems:
        </p>
        <ol className="step-list">
          <li>Open browser developer tools (F12 or Cmd+Option+I on Mac).</li>
          <li>Right-click the browser's reload button and select <strong>Empty Cache and Hard Reload</strong> (Chrome) or equivalent in your browser.</li>
          <li>Alternatively, navigate to your browser's privacy settings and clear site data specifically for app.openanalyst.com, preserving data for other sites.</li>
        </ol>

        <h2>Contacting Support</h2>
        <p>
          If the above steps do not resolve your issue, reach out to the support team:
        </p>
        <ul>
          <li>
            <strong>In-app support:</strong> Click the <strong>?</strong> icon in the bottom-left
            corner of the app to open a support chat where you can describe your issue. The chat
            widget automatically attaches session diagnostics to your request.
          </li>
          <li>
            <strong>Email:</strong> Send a detailed description of the issue, including the error
            code (if applicable), steps to reproduce, and your workspace ID to
            support@openanalyst.com.
          </li>
          <li>
            <strong>Status page:</strong> Before contacting support for widespread issues, check
            status.openanalyst.com to see if there is an ongoing incident.
          </li>
        </ul>
        <div className="callout callout-tip">
          <p>
            <strong>Tip:</strong> When reporting an issue, include the Request ID from the error
            message (format: <code>req_01HZ...</code>). This allows support engineers to locate
            your specific request in the logs immediately, dramatically speeding up diagnosis.
          </p>
        </div>
      </>
    ),
  },

  'browser-support': {
    title: 'Browser Support',
    description:
      'OpenAnalyst supports all major modern browsers. This page lists supported browsers, minimum required versions, known limitations, accessibility features, and recommended browser settings.',
    content: (
      <>
        <h2>Supported Browsers</h2>
        <p>
          OpenAnalyst is built on modern web standards and is tested continuously against the
          latest stable releases of all major browsers. The platform uses a progressive
          enhancement approach — core functionality is available on all supported browsers,
          while advanced features (such as WebGL-accelerated visualizations and Web Workers
          for background data processing) take advantage of capabilities in newer browser
          versions.
        </p>
        <table>
          <thead>
            <tr>
              <th>Browser</th>
              <th>Minimum Version</th>
              <th>Recommended Version</th>
              <th>Support Level</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Google Chrome</td>
              <td>110</td>
              <td>Latest stable</td>
              <td>Full support</td>
            </tr>
            <tr>
              <td>Mozilla Firefox</td>
              <td>112</td>
              <td>Latest stable</td>
              <td>Full support</td>
            </tr>
            <tr>
              <td>Apple Safari</td>
              <td>16.0</td>
              <td>16.4+ / Latest</td>
              <td>Full support</td>
            </tr>
            <tr>
              <td>Microsoft Edge</td>
              <td>110</td>
              <td>Latest stable</td>
              <td>Full support</td>
            </tr>
            <tr>
              <td>Opera</td>
              <td>96</td>
              <td>Latest stable</td>
              <td>Best effort</td>
            </tr>
            <tr>
              <td>Samsung Internet</td>
              <td>21</td>
              <td>Latest stable</td>
              <td>Best effort</td>
            </tr>
            <tr>
              <td>Internet Explorer</td>
              <td>N/A</td>
              <td>N/A</td>
              <td>Not supported</td>
            </tr>
          </tbody>
        </table>
        <div className="callout callout-warning">
          <p>
            <strong>Warning:</strong> Internet Explorer is not supported and will not work with
            OpenAnalyst. If your organization requires IE compatibility, please contact the
            enterprise team to discuss alternative access options.
          </p>
        </div>

        <h2>Browser-Specific Notes</h2>

        <h3>Google Chrome</h3>
        <p>
          Chrome is the primary development and testing target for OpenAnalyst. All features
          are developed and verified on Chrome first. Chrome's V8 JavaScript engine provides
          the best performance for data-heavy operations such as large table rendering and
          real-time chart updates. The Chrome DevTools integration also provides the most
          comprehensive debugging experience when using OpenAnalyst debug mode.
        </p>

        <h3>Mozilla Firefox</h3>
        <p>
          Firefox is fully supported and receives the same level of testing as Chrome. Firefox's
          strict content security policies are well-aligned with OpenAnalyst's security model.
          Users of Firefox with the uBlock Origin or similar content blockers may need to
          allow app.openanalyst.com in their block list, as some tracker-blocking heuristics
          can interfere with the analytics telemetry that powers usage-based features.
        </p>

        <h3>Apple Safari</h3>
        <p>
          Safari 16.0 and above are supported. Safari versions prior to 16.0 lack support for
          certain CSS features and Web APIs used by the OpenAnalyst interface. If you are on
          macOS Monterey (12.x) or earlier, ensure you have updated Safari to the latest
          available version through macOS Software Update.
        </p>
        <p>
          Known Safari limitation: the CSV download functionality uses a download API that
          Safari handles differently from Chromium-based browsers. If CSV exports are opening
          in a new tab instead of downloading, go to Safari Preferences &gt; General and set
          "File download location" to a specific folder.
        </p>

        <h3>Microsoft Edge</h3>
        <p>
          Edge (Chromium-based, version 110+) is fully supported and performs equivalently to
          Chrome. The legacy EdgeHTML-based Edge (pre-2020) is not supported. Edge users in
          enterprise environments may encounter issues if their IT policy restricts WebSocket
          connections — OpenAnalyst uses WebSockets for real-time dashboard updates.
        </p>

        <h2>Required Browser Features</h2>
        <p>
          OpenAnalyst requires the following browser capabilities to be enabled. Most are
          active by default in all supported browsers:
        </p>
        <ul>
          <li>
            <strong>JavaScript:</strong> Required. The application cannot function without it.
          </li>
          <li>
            <strong>Cookies:</strong> Required for session authentication. First-party cookies
            from app.openanalyst.com must be allowed.
          </li>
          <li>
            <strong>LocalStorage:</strong> Used for storing user preferences and caching
            lightweight interface state. Must not be blocked.
          </li>
          <li>
            <strong>WebSockets:</strong> Required for real-time data push and live collaboration
            features. Typically blocked in highly restrictive enterprise proxy configurations.
          </li>
          <li>
            <strong>WebGL:</strong> Used for hardware-accelerated chart rendering with large
            datasets. If unavailable, the platform falls back to a software renderer —
            performance on charts with 100,000+ data points will be reduced.
          </li>
          <li>
            <strong>File API:</strong> Required for the file upload (CSV, Excel, JSON) feature.
          </li>
        </ul>

        <h2>Known Issues</h2>
        <table>
          <thead>
            <tr>
              <th>Browser</th>
              <th>Issue</th>
              <th>Workaround</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Safari 16.0–16.3</td>
              <td>Occasional flicker in full-screen chart mode</td>
              <td>Update to Safari 16.4 or later</td>
            </tr>
            <tr>
              <td>Firefox 112–118</td>
              <td>PDF export may omit chart backgrounds in dark mode</td>
              <td>Use Chrome for PDF export, or update Firefox</td>
            </tr>
            <tr>
              <td>Edge (enterprise)</td>
              <td>WebSocket blocked by proxy results in delayed updates</td>
              <td>Request IT to allow WSS to app.openanalyst.com</td>
            </tr>
            <tr>
              <td>All browsers</td>
              <td>Extension-based ad blockers may block telemetry endpoints</td>
              <td>Allow app.openanalyst.com in your content blocker's allowlist</td>
            </tr>
          </tbody>
        </table>

        <h2>Recommended Browser Settings</h2>
        <p>
          For the best experience with OpenAnalyst, we recommend the following browser
          configuration:
        </p>
        <ul>
          <li>
            <strong>Zoom level:</strong> Keep browser zoom at 100% (default). OpenAnalyst uses
            fluid layouts that adapt to window size, but extreme zoom levels (above 150% or
            below 75%) may cause layout issues in dense data tables.
          </li>
          <li>
            <strong>Hardware acceleration:</strong> Ensure browser hardware acceleration is
            enabled (it is on by default). Disabling it will significantly slow down chart
            rendering for dashboards with many widgets.
          </li>
          <li>
            <strong>Pop-up blocker:</strong> Allow pop-ups from app.openanalyst.com. Some
            authentication flows (particularly OAuth for data source connections) open in a
            pop-up window.
          </li>
          <li>
            <strong>Extensions:</strong> Disable browser extensions on app.openanalyst.com if
            you experience unexpected behavior. Password managers, translation extensions, and
            screen readers are generally compatible; ad-blockers and script blockers may
            interfere.
          </li>
        </ul>

        <h2>Accessibility Features</h2>
        <p>
          OpenAnalyst is committed to meeting WCAG 2.1 Level AA accessibility standards.
          Current accessibility support includes:
        </p>
        <ul>
          <li>
            <strong>Keyboard navigation:</strong> All interactive elements are reachable and
            operable via keyboard. Use Tab to navigate, Enter or Space to activate controls,
            and Escape to dismiss modals and dropdowns.
          </li>
          <li>
            <strong>Screen reader support:</strong> The interface uses semantic HTML and ARIA
            labels. Screen readers (NVDA, JAWS, VoiceOver) are supported on all major browsers.
            Chart data is also available in accessible tabular format as an alternative to
            visual rendering.
          </li>
          <li>
            <strong>High contrast mode:</strong> OpenAnalyst respects the OS-level "Increase
            Contrast" or "High Contrast" accessibility setting and adjusts the interface
            accordingly.
          </li>
          <li>
            <strong>Reduced motion:</strong> Users with the "Prefer reduced motion" OS setting
            enabled will see transitions and animations minimized throughout the interface.
          </li>
          <li>
            <strong>Focus indicators:</strong> Keyboard focus is always visually indicated with
            a clear, high-contrast outline that meets WCAG contrast requirements.
          </li>
        </ul>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> If you encounter an accessibility barrier in OpenAnalyst,
            please report it to accessibility@openanalyst.com with a description of the issue
            and your assistive technology. Accessibility issues are treated with the same
            priority as functional bugs.
          </p>
        </div>

        <h2>Mobile Browser Support</h2>
        <p>
          OpenAnalyst is primarily designed for desktop use. A responsive mobile view is
          available for reviewing dashboards and reading reports on mobile browsers, but
          creating and editing dashboards, running interactive analyses, and managing connections
          require a desktop-sized screen (minimum 1024px width recommended).
        </p>
        <p>
          Supported mobile browsers for the read-only dashboard view:
        </p>
        <ul>
          <li>Safari on iOS 16.0 and above</li>
          <li>Chrome for Android (latest stable)</li>
          <li>Samsung Internet 21 and above</li>
        </ul>
        <div className="callout callout-info">
          <p>
            <strong>Note:</strong> A dedicated mobile application is on the OpenAnalyst product
            roadmap. Follow the changelog at openanalyst.com/changelog for announcements.
          </p>
        </div>
      </>
    ),
  },
};
