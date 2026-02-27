import type { ContentMap } from './types';

export const usagePages: ContentMap = {
  'web-app': {
    title: 'Web App',
    description: 'Access OpenAnalyst from any browser at app.openanalyst.com. This guide covers account creation, authentication, workspace navigation, and core platform concepts.',
    content: (
      <>
        <h2>Getting Started with the Web App</h2>
        <p>
          OpenAnalyst is a fully browser-based platform — there is nothing to install. The web app at{' '}
          <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a>{' '}
          is the primary interface for all analytics work, including dashboards, reports, AI chat, data exploration, and team collaboration.
        </p>
        <p>
          The platform is designed to work across all modern browsers on desktop and laptop devices. For mobile access, see the <a href="/docs/mobile">Mobile</a> documentation.
        </p>

        <h2>Creating an Account</h2>
        <p>
          To get started, navigate to <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a> and click <strong>Sign Up</strong>. You can register using one of the following methods:
        </p>
        <ul>
          <li><strong>Email and password</strong> — Enter your email address and choose a secure password.</li>
          <li><strong>Google SSO</strong> — Sign up instantly using your existing Google account.</li>
          <li><strong>GitHub SSO</strong> — Authenticate with your GitHub account for seamless developer onboarding.</li>
        </ul>
        <p>
          After registering with email, you will receive a verification email. Click the link in that email to confirm your address before logging in for the first time.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> GitHub SSO is particularly convenient for teams that already use GitHub for version control, as it also enables direct repository analytics without a separate OAuth flow later.</p>
        </div>

        <h2>Logging In and Password Recovery</h2>
        <p>
          Return to <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a> and click <strong>Log In</strong>. Enter your registered email address and password, or use one of the SSO options.
        </p>
        <p>
          If you have forgotten your password, click the <strong>Forgot password?</strong> button on the login screen. Enter the email address associated with your account and a password reset link will be sent to your inbox. The link expires after 24 hours.
        </p>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> If you signed up using Google or GitHub SSO, you do not have a separate OpenAnalyst password. Use the corresponding SSO button to log in rather than the email/password form.</p>
        </div>

        <h2>Workspace Overview</h2>
        <p>
          Upon logging in, you land on the <strong>Home</strong> screen of your workspace. The workspace is the top-level container for all your projects, data connections, team members, and settings.
        </p>
        <p>
          Each workspace has its own:
        </p>
        <ul>
          <li>Projects and dashboards</li>
          <li>Data source connections and integrations</li>
          <li>Team members and permission settings</li>
          <li>AI model configuration and API key storage</li>
          <li>Billing and subscription details</li>
        </ul>
        <p>
          If you belong to multiple workspaces (for example, a personal workspace and a company workspace), you can switch between them using the workspace selector in the top-left corner of the sidebar.
        </p>

        <h2>Sidebar Navigation</h2>
        <p>
          The left sidebar is the primary navigation hub. It is organized into the following sections:
        </p>
        <table>
          <thead>
            <tr>
              <th>Section</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>Recent activity, pinned dashboards, and quick-access shortcuts.</td>
            </tr>
            <tr>
              <td>Dashboards</td>
              <td>All saved dashboards organized by project or folder.</td>
            </tr>
            <tr>
              <td>Reports</td>
              <td>Generated and scheduled reports, including PDF and CSV exports.</td>
            </tr>
            <tr>
              <td>Data Explorer</td>
              <td>Interactive query builder and raw data browsing interface.</td>
            </tr>
            <tr>
              <td>AI Chat</td>
              <td>Conversational interface for asking questions about your data.</td>
            </tr>
            <tr>
              <td>AI Agents</td>
              <td>Configure and run autonomous analytics agents.</td>
            </tr>
            <tr>
              <td>Integrations</td>
              <td>Connect data sources and manage 24+ integration providers.</td>
            </tr>
            <tr>
              <td>Settings</td>
              <td>Workspace configuration, team management, billing, and API keys.</td>
            </tr>
          </tbody>
        </table>

        <h2>Creating Projects</h2>
        <p>
          Projects are the organizational unit within a workspace. Each project groups related dashboards, reports, data connections, and team access rules together.
        </p>
        <ol className="step-list">
          <li>In the sidebar, click <strong>Dashboards</strong> or navigate to the Home screen.</li>
          <li>Click the <strong>New Project</strong> button in the top-right corner.</li>
          <li>Enter a project name and optional description.</li>
          <li>Choose a visibility setting: <strong>Private</strong> (only you), <strong>Team</strong> (workspace members), or <strong>Public</strong> (shareable link).</li>
          <li>Click <strong>Create Project</strong> to confirm.</li>
        </ol>
        <p>
          Once created, the project appears in the sidebar. You can create dashboards, connect data sources, and invite specific team members to individual projects independently of the broader workspace.
        </p>

        <h2>Recent Activity Feed</h2>
        <p>
          The Home screen displays a <strong>Recent Activity</strong> feed showing the latest actions across your workspace:
        </p>
        <ul>
          <li>Dashboards created or modified by team members</li>
          <li>Reports generated or scheduled</li>
          <li>Data source connections added or updated</li>
          <li>AI agent runs and their results</li>
          <li>Comments and collaboration events</li>
        </ul>
        <p>
          Clicking any activity item takes you directly to the relevant dashboard, report, or resource. You can filter the feed by project, team member, or activity type using the controls at the top of the feed.
        </p>
      </>
    ),
  },

  'api': {
    title: 'API',
    description: 'Interact with OpenAnalyst programmatically using the REST API. Authenticate with API keys, query datasets, run agents, and integrate analytics into your own applications.',
    content: (
      <>
        <h2>REST API Overview</h2>
        <p>
          The OpenAnalyst REST API provides full programmatic access to the platform. You can query datasets, retrieve reports, trigger AI agent runs, and manage resources — all without using the web interface. The API follows REST conventions and returns JSON responses.
        </p>
        <p>
          The base URL for all API requests is:
        </p>
        <pre><code>{`https://api.openanalyst.com/v1`}</code></pre>
        <p>
          All endpoints require HTTPS. HTTP requests will be redirected to HTTPS automatically.
        </p>

        <h2>Authentication</h2>
        <p>
          Authenticate API requests by including your API key in the <code>Authorization</code> header using the <code>Bearer</code> scheme.
        </p>
        <pre><code>{`Authorization: Bearer oa_your_api_key_here`}</code></pre>
        <p>
          To generate an API key:
        </p>
        <ol className="step-list">
          <li>Log in to <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a>.</li>
          <li>Navigate to <strong>Settings</strong> in the sidebar.</li>
          <li>Click the <strong>API Keys</strong> tab.</li>
          <li>Click <strong>Generate New Key</strong>, give it a descriptive label, and set an optional expiry date.</li>
          <li>Copy the key immediately — it will not be shown again.</li>
        </ol>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> API keys grant full access to your workspace. Store them securely using environment variables or a secrets manager. Never commit API keys to source control.</p>
        </div>

        <h2>Key Endpoints</h2>
        <p>
          The following table summarizes the most commonly used API endpoints:
        </p>
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>GET</code></td>
              <td><code>/datasets</code></td>
              <td>List all datasets in the workspace.</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/datasets/:id</code></td>
              <td>Retrieve metadata and schema for a specific dataset.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/queries</code></td>
              <td>Execute a query against a connected data source.</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/reports</code></td>
              <td>List all reports in the workspace.</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/reports/:id</code></td>
              <td>Retrieve a specific report and its data.</td>
            </tr>
            <tr>
              <td><code>POST</code></td>
              <td><code>/agents/run</code></td>
              <td>Trigger an AI agent run with a task prompt.</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/agents/runs/:id</code></td>
              <td>Poll the status and results of an agent run.</td>
            </tr>
            <tr>
              <td><code>GET</code></td>
              <td><code>/dashboards</code></td>
              <td>List all dashboards in the workspace.</td>
            </tr>
          </tbody>
        </table>

        <h2>Example Requests</h2>
        <p>
          The following examples show how to authenticate and make requests using <code>curl</code> and the JavaScript <code>fetch</code> API.
        </p>
        <h3>List datasets using curl</h3>
        <pre><code>{`curl -X GET https://api.openanalyst.com/v1/datasets \\
  -H "Authorization: Bearer oa_your_api_key_here" \\
  -H "Content-Type: application/json"`}</code></pre>

        <h3>Execute a query using curl</h3>
        <pre><code>{`curl -X POST https://api.openanalyst.com/v1/queries \\
  -H "Authorization: Bearer oa_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset_id": "ds_abc123",
    "query": "SELECT date, revenue FROM sales WHERE date >= \\'2024-01-01\\' ORDER BY date DESC LIMIT 100"
  }'`}</code></pre>

        <h3>Run an AI agent using JavaScript fetch</h3>
        <pre><code>{`const response = await fetch('https://api.openanalyst.com/v1/agents/run', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer oa_your_api_key_here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agent_id: 'agent_xyz789',
    task: 'Summarize weekly sales performance and flag any anomalies.',
    context: {
      dataset_id: 'ds_abc123',
      date_range: { start: '2024-01-01', end: '2024-01-07' },
    },
  }),
});

const data = await response.json();
console.log(data.run_id); // Poll this ID for results`}</code></pre>

        <h2>Pagination</h2>
        <p>
          List endpoints return paginated results. Use the <code>page</code> and <code>per_page</code> query parameters to control pagination:
        </p>
        <pre><code>{`GET /datasets?page=2&per_page=25`}</code></pre>
        <p>
          Each paginated response includes a <code>meta</code> object:
        </p>
        <pre><code>{`{
  "data": [...],
  "meta": {
    "page": 2,
    "per_page": 25,
    "total": 143,
    "total_pages": 6
  }
}`}</code></pre>

        <h2>Rate Limits</h2>
        <p>
          API rate limits are applied per workspace and vary by plan:
        </p>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Requests per minute</th>
              <th>Requests per day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Free</td>
              <td>30</td>
              <td>500</td>
            </tr>
            <tr>
              <td>Basic</td>
              <td>120</td>
              <td>5,000</td>
            </tr>
            <tr>
              <td>Pro</td>
              <td>600</td>
              <td>50,000</td>
            </tr>
            <tr>
              <td>Max</td>
              <td>1,200</td>
              <td>200,000</td>
            </tr>
            <tr>
              <td>Enterprise</td>
              <td>Custom</td>
              <td>Custom</td>
            </tr>
          </tbody>
        </table>
        <p>
          When a rate limit is exceeded, the API returns a <code>429 Too Many Requests</code> response. The <code>Retry-After</code> header indicates how many seconds to wait before retrying.
        </p>

        <h2>Error Handling</h2>
        <p>
          The API uses standard HTTP status codes. Error responses include a JSON body with a <code>code</code> and <code>message</code> field:
        </p>
        <pre><code>{`{
  "error": {
    "code": "DATASET_NOT_FOUND",
    "message": "No dataset with the given ID exists in this workspace.",
    "status": 404
  }
}`}</code></pre>
        <p>
          Common error codes:
        </p>
        <table>
          <thead>
            <tr>
              <th>HTTP Status</th>
              <th>Code</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>401</td>
              <td><code>UNAUTHORIZED</code></td>
              <td>Missing or invalid API key.</td>
            </tr>
            <tr>
              <td>403</td>
              <td><code>FORBIDDEN</code></td>
              <td>The API key does not have permission for this action.</td>
            </tr>
            <tr>
              <td>404</td>
              <td><code>NOT_FOUND</code></td>
              <td>The requested resource does not exist.</td>
            </tr>
            <tr>
              <td>422</td>
              <td><code>VALIDATION_ERROR</code></td>
              <td>The request body failed validation.</td>
            </tr>
            <tr>
              <td>429</td>
              <td><code>RATE_LIMITED</code></td>
              <td>Too many requests. Check the Retry-After header.</td>
            </tr>
            <tr>
              <td>500</td>
              <td><code>INTERNAL_ERROR</code></td>
              <td>An unexpected server-side error occurred.</td>
            </tr>
          </tbody>
        </table>

        <h2>Webhook Callbacks</h2>
        <p>
          For long-running operations such as agent runs and large query executions, you can provide a webhook URL to receive a callback when the operation completes, rather than polling.
        </p>
        <pre><code>{`curl -X POST https://api.openanalyst.com/v1/agents/run \\
  -H "Authorization: Bearer oa_your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "agent_xyz789",
    "task": "Generate monthly revenue summary.",
    "webhook_url": "https://your-app.com/webhooks/openanalyst"
  }'`}</code></pre>
        <p>
          OpenAnalyst will send a <code>POST</code> request to the provided URL with a JSON payload containing the run ID, status, and result when the operation finishes. Webhook payloads are signed with an <code>X-OpenAnalyst-Signature</code> header for verification.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Webhook URLs must use HTTPS and must respond with a <code>2xx</code> status code within 10 seconds. Failed deliveries are retried up to 5 times with exponential backoff.</p>
        </div>
      </>
    ),
  },

  'ide': {
    title: 'IDE',
    description: 'IDE integration for OpenAnalyst is currently in development. Learn about the planned features for VS Code and JetBrains plugins, and how to join the early access beta.',
    content: (
      <>
        <h2>IDE Integration Status</h2>
        <p>
          Native IDE integration for OpenAnalyst is currently under active development and is not yet available for general use. The goal is to bring analytics directly into the development environment, allowing engineers and data practitioners to query data, preview results, and run AI agents without leaving their editor.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> IDE extensions are coming soon. If you would like early access, join the beta waitlist as described at the bottom of this page. In the meantime, all features are fully accessible at <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a>.</p>
        </div>

        <h2>Planned: VS Code Extension</h2>
        <p>
          The OpenAnalyst VS Code extension will integrate analytics capabilities directly into Visual Studio Code. Planned features include:
        </p>
        <ul>
          <li><strong>Inline analytics sidebar</strong> — View dashboards and key metrics in a dedicated panel without switching tabs.</li>
          <li><strong>Query execution from the editor</strong> — Highlight a SQL or natural-language query and run it against any connected data source using a keyboard shortcut.</li>
          <li><strong>Data preview pane</strong> — Inspect the schema and sample rows of any connected dataset within VS Code.</li>
          <li><strong>AI Chat panel</strong> — Ask questions about your data in a chat interface embedded in the editor sidebar.</li>
          <li><strong>Agent triggers</strong> — Trigger AI agent runs directly from the command palette.</li>
          <li><strong>Results notebook</strong> — Query results displayed as an interactive data grid or chart within VS Code, similar to a Jupyter output cell.</li>
        </ul>
        <p>
          The extension will authenticate using the same API key system used by the REST API. You will configure it once by running the <strong>OpenAnalyst: Connect</strong> command from the VS Code command palette and pasting your API key.
        </p>

        <h2>Planned: JetBrains Plugin</h2>
        <p>
          A plugin for the JetBrains IDE family — including IntelliJ IDEA, PyCharm, DataGrip, and WebStorm — is also planned. It will offer feature parity with the VS Code extension, with additional focus on:
        </p>
        <ul>
          <li><strong>DataGrip integration</strong> — Direct query execution against OpenAnalyst-connected data sources from within DataGrip.</li>
          <li><strong>Tool window</strong> — A persistent tool window for browsing datasets, viewing reports, and running AI agents.</li>
          <li><strong>Database tool compatibility</strong> — The plugin will appear as a data source type in the JetBrains database tool, allowing native schema exploration.</li>
        </ul>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> While the plugin is in development, JetBrains users can use the OpenAnalyst REST API directly from their editor using the HTTP Client plugin built into JetBrains IDEs.</p>
        </div>

        <h2>Planned Features at a Glance</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>VS Code</th>
              <th>JetBrains</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Inline analytics sidebar</td>
              <td>Planned</td>
              <td>Planned</td>
            </tr>
            <tr>
              <td>Query execution from editor</td>
              <td>Planned</td>
              <td>Planned</td>
            </tr>
            <tr>
              <td>Data preview pane</td>
              <td>Planned</td>
              <td>Planned</td>
            </tr>
            <tr>
              <td>AI Chat panel</td>
              <td>Planned</td>
              <td>Planned</td>
            </tr>
            <tr>
              <td>Agent triggers</td>
              <td>Planned</td>
              <td>Planned</td>
            </tr>
            <tr>
              <td>DataGrip integration</td>
              <td>N/A</td>
              <td>Planned</td>
            </tr>
          </tbody>
        </table>

        <h2>Join the Beta Waitlist</h2>
        <p>
          To be among the first to access the IDE extensions when they launch, join the early access beta waitlist. Beta participants will receive:
        </p>
        <ul>
          <li>Early access to the extensions before public release</li>
          <li>Direct communication channel with the development team</li>
          <li>Ability to submit feature requests and bug reports</li>
          <li>Recognition in the extension changelog</li>
        </ul>
        <p>
          To join the waitlist, visit the <a href="https://openanalyst.com/waitlist" target="_blank" rel="noopener noreferrer">OpenAnalyst waitlist page</a> and select <strong>IDE Extension Beta</strong> as your area of interest. You will be notified by email when beta access becomes available.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Priority access will be given to users on Pro, Max, and Enterprise plans. Free and Basic plan users are still welcome to join the waitlist.</p>
        </div>
      </>
    ),
  },

  'mobile': {
    title: 'Mobile',
    description: 'Use OpenAnalyst on mobile devices through the responsive web app and Progressive Web App (PWA) installation. Access dashboards, reports, and AI chat from any smartphone or tablet.',
    content: (
      <>
        <h2>Mobile Web App</h2>
        <p>
          OpenAnalyst does not require a native mobile app download. The platform is fully accessible through any modern mobile browser at <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a>. The interface is responsive and adapts to smaller screens, including both smartphones and tablets.
        </p>
        <p>
          Mobile-optimized views are provided for:
        </p>
        <ul>
          <li>Dashboard browsing and chart viewing</li>
          <li>Report reading and downloading</li>
          <li>AI Chat for natural-language data queries</li>
          <li>Notification center and activity feed</li>
          <li>Basic workspace and project settings</li>
        </ul>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Complex operations such as building new dashboards from scratch, configuring data connectors, or editing agent workflows are optimized for desktop use. Mobile access is best suited for consuming and sharing existing analytics content.</p>
        </div>

        <h2>Installing as a PWA</h2>
        <p>
          OpenAnalyst supports installation as a Progressive Web App (PWA), which adds a shortcut to your home screen and provides a more app-like experience with full-screen display and faster load times.
        </p>
        <h3>iOS (Safari)</h3>
        <ol className="step-list">
          <li>Open <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a> in Safari on your iPhone or iPad.</li>
          <li>Tap the <strong>Share</strong> button (the box with an upward arrow) in the browser toolbar.</li>
          <li>Scroll down in the share sheet and tap <strong>Add to Home Screen</strong>.</li>
          <li>Edit the name if desired, then tap <strong>Add</strong> in the top-right corner.</li>
          <li>The OpenAnalyst icon will appear on your home screen. Tap it to launch the app in full-screen mode.</li>
        </ol>
        <h3>Android (Chrome)</h3>
        <ol className="step-list">
          <li>Open <a href="https://app.openanalyst.com" target="_blank" rel="noopener noreferrer">app.openanalyst.com</a> in Chrome on your Android device.</li>
          <li>Tap the three-dot menu in the top-right corner of Chrome.</li>
          <li>Tap <strong>Add to Home screen</strong> or <strong>Install app</strong> (the exact label varies by Chrome version).</li>
          <li>Confirm by tapping <strong>Add</strong> or <strong>Install</strong>.</li>
          <li>The icon appears on your home screen and app drawer.</li>
        </ol>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> On some Android devices, Chrome will automatically show an install prompt banner at the bottom of the screen after you have visited the site a few times. You can tap this banner to install directly.</p>
        </div>

        <h2>Mobile-Optimized Dashboards</h2>
        <p>
          When viewing dashboards on mobile, OpenAnalyst automatically applies a single-column layout for chart panels. This ensures that data remains readable without horizontal scrolling.
        </p>
        <p>
          Key mobile display behaviors:
        </p>
        <ul>
          <li>Charts scale proportionally to the available screen width.</li>
          <li>Data tables switch to a scrollable card layout on small screens.</li>
          <li>Filter controls collapse into a drawer that can be opened from a button at the top of the dashboard.</li>
          <li>Long text values in table cells are truncated with a tap-to-expand option.</li>
        </ul>
        <p>
          If a dashboard was designed with a desktop layout in mind, you can pinch-to-zoom to inspect specific charts in detail.
        </p>

        <h2>Touch Gestures</h2>
        <p>
          The mobile interface supports the following touch gestures throughout the app:
        </p>
        <table>
          <thead>
            <tr>
              <th>Gesture</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tap</td>
              <td>Select, open, or activate an element.</td>
            </tr>
            <tr>
              <td>Swipe left / right</td>
              <td>Navigate between dashboard pages or report sections.</td>
            </tr>
            <tr>
              <td>Swipe down</td>
              <td>Refresh the current view.</td>
            </tr>
            <tr>
              <td>Pinch to zoom</td>
              <td>Zoom into charts or dashboard panels.</td>
            </tr>
            <tr>
              <td>Long press</td>
              <td>Open context menu for charts (copy data, share, fullscreen).</td>
            </tr>
            <tr>
              <td>Two-finger scroll</td>
              <td>Scroll within an embedded chart or table that has inner scrolling.</td>
            </tr>
          </tbody>
        </table>

        <h2>Push Notifications</h2>
        <p>
          When the OpenAnalyst PWA is installed on your device, you can enable push notifications to receive real-time alerts for:
        </p>
        <ul>
          <li>AI agent run completions</li>
          <li>Scheduled report deliveries</li>
          <li>Data anomaly alerts triggered by rules</li>
          <li>Team mentions and collaboration events</li>
        </ul>
        <p>
          To enable push notifications, go to <strong>Settings &gt; Notifications</strong> in the web app and toggle on <strong>Push Notifications</strong>. Your browser will prompt you to grant permission the first time.
        </p>

        <h2>Offline Mode</h2>
        <p>
          Full offline mode is currently planned for a future release. When enabled, it will allow you to view previously loaded dashboards and reports without an active internet connection, with data syncing automatically when connectivity is restored.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> The PWA currently caches the application shell for fast load times, but live data requires an active internet connection. Offline data access is coming soon.</p>
        </div>
      </>
    ),
  },

  'focus-mode': {
    title: 'Focus Mode',
    description: 'Focus Mode provides a distraction-free, full-screen analytics view ideal for deep analysis and presenting dashboards to stakeholders.',
    content: (
      <>
        <h2>What is Focus Mode</h2>
        <p>
          Focus Mode is a distraction-free view that strips away the sidebar, navigation bar, notifications, and all other interface chrome, leaving only the dashboard or chart content on screen. It is designed for two primary use cases:
        </p>
        <ul>
          <li><strong>Deep analysis</strong> — Remove distractions when you need to concentrate on the data itself without being interrupted by notifications or navigation elements.</li>
          <li><strong>Stakeholder presentations</strong> — Present dashboards and charts in a clean, professional full-screen layout during meetings or screen shares without exposing internal navigation or workspace details.</li>
        </ul>

        <h2>Activating Focus Mode</h2>
        <p>
          Focus Mode can be activated in two ways:
        </p>
        <h3>Keyboard shortcut</h3>
        <p>
          While viewing any dashboard or chart, press <code>F</code> to toggle Focus Mode on and off. This is the fastest way to enter and exit the mode without moving your hands from the keyboard.
        </p>
        <h3>Via the menu</h3>
        <ol className="step-list">
          <li>Open any dashboard.</li>
          <li>Click the <strong>View</strong> menu in the top toolbar (or the three-dot options menu on an individual chart).</li>
          <li>Select <strong>Enter Focus Mode</strong>.</li>
        </ol>
        <p>
          To exit Focus Mode via the menu, move your cursor to the top of the screen to reveal a minimal exit toolbar, then click <strong>Exit Focus Mode</strong>, or simply press <code>Escape</code> or <code>F</code>.
        </p>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> You can also activate Focus Mode for an individual chart panel by clicking the expand icon in the chart's header. This maximizes the single chart to full screen within Focus Mode.</p>
        </div>

        <h2>What Focus Mode Hides</h2>
        <p>
          When Focus Mode is active, the following interface elements are hidden:
        </p>
        <table>
          <thead>
            <tr>
              <th>Element</th>
              <th>Hidden in Focus Mode</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Left sidebar navigation</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Top navigation bar</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Notification bell and alerts</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Breadcrumb navigation</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Dashboard edit controls</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Chart data and content</td>
              <td>No — fully visible</td>
            </tr>
            <tr>
              <td>Dashboard title and filters</td>
              <td>No — fully visible</td>
            </tr>
          </tbody>
        </table>

        <h2>Fullscreen Charts</h2>
        <p>
          Individual chart panels can be expanded to full screen independently of the dashboard-level Focus Mode. This is useful when you want to zoom in on a specific visualization without leaving the dashboard context entirely.
        </p>
        <p>
          To expand a single chart:
        </p>
        <ul>
          <li>Hover over the chart to reveal its header controls.</li>
          <li>Click the <strong>Expand</strong> icon (four outward-pointing arrows) in the top-right corner of the chart.</li>
          <li>The chart expands to fill the screen. Press <code>Escape</code> to return to the dashboard.</li>
        </ul>
        <p>
          In expanded chart view, you can interact with the chart normally — hover for tooltips, click to filter, zoom in on time series, and copy the underlying data.
        </p>

        <h2>Presentation Mode for Stakeholders</h2>
        <p>
          For formal presentations, Presentation Mode extends Focus Mode with additional polish:
        </p>
        <ul>
          <li>A clean dark background fills any gaps between chart panels.</li>
          <li>Auto-advance cycles through dashboard pages automatically on a configurable timer.</li>
          <li>A presentation toolbar appears at the bottom of the screen with slide navigation controls.</li>
          <li>The workspace name and branding can optionally be displayed in a corner watermark.</li>
        </ul>
        <p>
          To start Presentation Mode, go to <strong>View &gt; Start Presentation</strong> or press <code>P</code> while in Focus Mode. You will be prompted to configure the auto-advance timer (default: 30 seconds per page) before the presentation begins.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Presentation Mode works best when the dashboard has multiple pages. For single-page dashboards, it behaves identically to standard Focus Mode.</p>
        </div>

        <h2>Keyboard Navigation in Focus Mode</h2>
        <p>
          Focus Mode supports full keyboard navigation so you can drive a presentation without a mouse:
        </p>
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>F</code></td>
              <td>Toggle Focus Mode on/off.</td>
            </tr>
            <tr>
              <td><code>P</code></td>
              <td>Enter Presentation Mode (while in Focus Mode).</td>
            </tr>
            <tr>
              <td><code>Escape</code></td>
              <td>Exit Focus Mode or Presentation Mode.</td>
            </tr>
            <tr>
              <td><code>Arrow Right</code> / <code>N</code></td>
              <td>Next dashboard page (in Presentation Mode).</td>
            </tr>
            <tr>
              <td><code>Arrow Left</code> / <code>B</code></td>
              <td>Previous dashboard page (in Presentation Mode).</td>
            </tr>
            <tr>
              <td><code>Space</code></td>
              <td>Pause/resume auto-advance timer (in Presentation Mode).</td>
            </tr>
          </tbody>
        </table>
      </>
    ),
  },

  'share': {
    title: 'Share & Export',
    description: 'Share dashboards with your team or publicly, export data in multiple formats, schedule automated report delivery, and embed dashboards in external applications.',
    content: (
      <>
        <h2>Sharing Dashboards</h2>
        <p>
          OpenAnalyst provides flexible sharing options to suit different audiences and access requirements. All sharing is managed from the <strong>Share</strong> menu, accessible from any dashboard via the share icon in the top toolbar.
        </p>

        <h3>Private sharing (team members)</h3>
        <p>
          By default, dashboards are private and visible only to the creator. To share with specific team members:
        </p>
        <ol className="step-list">
          <li>Open the dashboard and click the <strong>Share</strong> button in the toolbar.</li>
          <li>Under <strong>Share with people</strong>, type the email addresses of team members in your workspace.</li>
          <li>Choose a permission level: <strong>View</strong> (read-only) or <strong>Edit</strong> (can modify the dashboard).</li>
          <li>Click <strong>Send Invite</strong>. Invited members will receive an email notification with a direct link.</li>
        </ol>

        <h3>Public link sharing</h3>
        <p>
          You can generate a public shareable link that allows anyone with the URL to view the dashboard, without requiring an OpenAnalyst account:
        </p>
        <ol className="step-list">
          <li>In the <strong>Share</strong> menu, toggle on <strong>Enable public link</strong>.</li>
          <li>Copy the generated URL.</li>
          <li>Optionally set a link expiry date or password-protect the link for additional security.</li>
        </ol>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Public links expose dashboard data to anyone who has the URL. Do not share public links to dashboards containing sensitive or proprietary data unless access controls (expiry date or password) are in place.</p>
        </div>

        <h3>Team sharing</h3>
        <p>
          To share a dashboard with your entire workspace:
        </p>
        <ul>
          <li>In the <strong>Share</strong> menu, under <strong>General access</strong>, select <strong>Everyone in [workspace name]</strong>.</li>
          <li>Choose whether workspace members have View or Edit access.</li>
          <li>The dashboard will appear in the workspace's shared dashboard library, accessible to all members.</li>
        </ul>

        <h2>Exporting Data and Dashboards</h2>
        <p>
          Export options are available for both individual charts and entire dashboards. To access them, click the <strong>Export</strong> button in the toolbar or right-click any chart.
        </p>
        <table>
          <thead>
            <tr>
              <th>Format</th>
              <th>Scope</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PDF</td>
              <td>Full dashboard or single chart</td>
              <td>Preserves layout and styling. Best for formal reports.</td>
            </tr>
            <tr>
              <td>PNG</td>
              <td>Single chart</td>
              <td>High-resolution image. Useful for slide decks and documents.</td>
            </tr>
            <tr>
              <td>CSV</td>
              <td>Chart data or query result</td>
              <td>Raw tabular data for further processing in spreadsheet tools.</td>
            </tr>
            <tr>
              <td>Excel (.xlsx)</td>
              <td>Chart data or query result</td>
              <td>Formatted spreadsheet with column headers and data types preserved.</td>
            </tr>
            <tr>
              <td>JSON</td>
              <td>Query result</td>
              <td>Machine-readable format for programmatic consumption.</td>
            </tr>
          </tbody>
        </table>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> PDF exports of full dashboards render each chart at high resolution. For best results, view the dashboard at 100% zoom before exporting to ensure the layout matches what you see on screen.</p>
        </div>

        <h2>Scheduled Reports</h2>
        <p>
          Scheduled reports automatically generate a snapshot of a dashboard or report and deliver it via email on a recurring schedule. This is useful for regular stakeholder updates — for example, sending a weekly sales summary every Monday morning.
        </p>
        <ol className="step-list">
          <li>Open the dashboard or report you want to schedule.</li>
          <li>Click <strong>Share &gt; Schedule delivery</strong>.</li>
          <li>Click <strong>Add schedule</strong>.</li>
          <li>Choose the frequency: <strong>Daily</strong>, <strong>Weekly</strong>, <strong>Monthly</strong>, or a custom cron expression.</li>
          <li>Select the delivery time and timezone.</li>
          <li>Enter the recipient email addresses (these do not need to be OpenAnalyst users).</li>
          <li>Choose the export format: PDF or Excel.</li>
          <li>Click <strong>Save schedule</strong>.</li>
        </ol>
        <p>
          Scheduled reports are managed under <strong>Reports &gt; Scheduled</strong> in the sidebar. You can pause, edit, or delete any schedule from that view.
        </p>

        <h2>Embedding Dashboards</h2>
        <p>
          Dashboards can be embedded in external websites, internal tools, or customer-facing portals using an <code>{'<iframe>'}</code> element.
        </p>
        <ol className="step-list">
          <li>Enable a public link for the dashboard (as described above).</li>
          <li>In the <strong>Share</strong> menu, click <strong>Embed</strong>.</li>
          <li>Copy the generated <code>{'<iframe>'}</code> code snippet.</li>
          <li>Paste the snippet into your HTML where you want the dashboard to appear.</li>
        </ol>
        <p>Example embed code:</p>
        <pre><code>{`<iframe
  src="https://app.openanalyst.com/embed/dashboard/d_abc123"
  width="100%"
  height="600"
  frameborder="0"
  allowfullscreen
></iframe>`}</code></pre>
        <p>
          Embedded dashboards respect the same access controls as public links. You can pass URL parameters to pre-filter the embedded dashboard for specific contexts — for example, embedding a customer-specific view on an account management portal.
        </p>

        <h2>API-Based Exports</h2>
        <p>
          Export operations are available through the REST API for programmatic integration into workflows and pipelines. See the <a href="/docs/api">API documentation</a> for full details. A quick example for exporting report data as CSV:
        </p>
        <pre><code>{`curl -X GET "https://api.openanalyst.com/v1/reports/r_xyz789/export?format=csv" \\
  -H "Authorization: Bearer oa_your_api_key_here" \\
  --output report.csv`}</code></pre>
      </>
    ),
  },

  'github': {
    title: 'GitHub',
    description: 'Connect GitHub repositories to OpenAnalyst to analyze commits, issues, pull requests, and contributor activity. Automate reports from GitHub events and build code analytics dashboards.',
    content: (
      <>
        <h2>Connecting GitHub</h2>
        <p>
          OpenAnalyst connects to GitHub via OAuth to read repository data. The integration supports both public and private repositories, and works with GitHub.com (cloud). GitHub Enterprise Server support is available on Max and Enterprise plans.
        </p>
        <ol className="step-list">
          <li>In the sidebar, navigate to <strong>Integrations</strong>.</li>
          <li>Find <strong>GitHub</strong> in the integrations list and click <strong>Connect</strong>.</li>
          <li>You will be redirected to GitHub to authorize the OpenAnalyst app. Review the requested permissions and click <strong>Authorize OpenAnalyst</strong>.</li>
          <li>After authorization, you are returned to OpenAnalyst. Select the repositories you want to analyze by checking them in the repository picker.</li>
          <li>Click <strong>Save configuration</strong> to complete the connection.</li>
        </ol>
        <div className="callout callout-info">
          <p><strong>Note:</strong> OpenAnalyst requests read-only access to repository data. It does not request write permissions and cannot modify your code or settings.</p>
        </div>

        <h2>Analyzing Repository Data</h2>
        <p>
          Once connected, OpenAnalyst continuously syncs data from your selected repositories and makes it available for querying and visualization. The following data types are available:
        </p>
        <table>
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Commits</td>
              <td>Commit history including author, timestamp, message, files changed, and lines added/removed.</td>
            </tr>
            <tr>
              <td>Pull Requests</td>
              <td>PR status, creation time, merge time, reviewers, and linked issues.</td>
            </tr>
            <tr>
              <td>Issues</td>
              <td>Open/closed issues, labels, assignees, time-to-close, and comment counts.</td>
            </tr>
            <tr>
              <td>Contributors</td>
              <td>Contributor activity over time, lines of code, commit frequency, and PR participation.</td>
            </tr>
            <tr>
              <td>Releases</td>
              <td>Release history, associated tags, and changelog content.</td>
            </tr>
            <tr>
              <td>Branches</td>
              <td>Active branches, last commit date, and merge status.</td>
            </tr>
          </tbody>
        </table>
        <p>
          This data is available in the <strong>Data Explorer</strong>, where you can write SQL-style queries against it, and in the AI Chat interface, where you can ask natural-language questions such as:
        </p>
        <ul>
          <li>"Which contributors had the most commits last month?"</li>
          <li>"What is the average time to merge a pull request this quarter?"</li>
          <li>"Show me the number of open issues by label over the past 30 days."</li>
        </ul>

        <h2>GitHub Actions Integration</h2>
        <p>
          OpenAnalyst can be triggered from GitHub Actions workflows to automatically generate reports or run AI agents when specific events occur in your repository.
        </p>
        <p>
          Example: Automatically generate a sprint summary report when a milestone is closed.
        </p>
        <pre><code>{`# .github/workflows/openanalyst-milestone-report.yml
name: Generate Sprint Report

on:
  milestone:
    types: [closed]

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger OpenAnalyst Report
        run: |
          curl -X POST https://api.openanalyst.com/v1/agents/run \\
            -H "Authorization: Bearer \${{ secrets.OPENANALYST_API_KEY }}" \\
            -H "Content-Type: application/json" \\
            -d '{
              "agent_id": "agent_sprint_summary",
              "task": "Generate a sprint summary for milestone: \${{ github.event.milestone.title }}",
              "context": {
                "repository": "\${{ github.repository }}",
                "milestone": "\${{ github.event.milestone.number }}"
              }
            }'`}</code></pre>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Store your OpenAnalyst API key as a GitHub Actions secret (Settings &gt; Secrets and variables &gt; Actions) and reference it as <code>{'${{ secrets.OPENANALYST_API_KEY }}'}</code> rather than hardcoding it in your workflow file.</p>
        </div>

        <h2>Setting Up Webhooks</h2>
        <p>
          For real-time event processing, configure a GitHub webhook to push events directly to OpenAnalyst:
        </p>
        <ol className="step-list">
          <li>In your GitHub repository, go to <strong>Settings &gt; Webhooks &gt; Add webhook</strong>.</li>
          <li>In the OpenAnalyst <strong>Integrations &gt; GitHub</strong> settings, copy your <strong>Webhook URL</strong>.</li>
          <li>Paste the URL into the GitHub webhook <strong>Payload URL</strong> field.</li>
          <li>Set the content type to <code>application/json</code>.</li>
          <li>Copy the <strong>Webhook Secret</strong> from OpenAnalyst and paste it into the GitHub webhook secret field.</li>
          <li>Select the events to subscribe to (for example: push, pull_request, issues, release).</li>
          <li>Click <strong>Add webhook</strong> to save.</li>
        </ol>
        <p>
          After the webhook is configured, OpenAnalyst will process events in real time and update your datasets and dashboards accordingly. You can also configure rules to trigger AI agent runs or send notifications when specific webhook events occur.
        </p>

        <h2>Code Analytics Dashboards</h2>
        <p>
          OpenAnalyst provides a set of pre-built GitHub dashboard templates to get you started quickly:
        </p>
        <ul>
          <li><strong>Repository Overview</strong> — Commits per day, active contributors, open issues, and PR merge rate over the past 30 days.</li>
          <li><strong>Contributor Activity</strong> — Per-contributor commit frequency, code churn, and PR review participation.</li>
          <li><strong>Issue Tracker Health</strong> — Issue backlog growth/shrinkage, average time to close by label, and issue resolution trends.</li>
          <li><strong>Pull Request Cycle Time</strong> — Time from PR creation to merge, broken down by reviewer and repository.</li>
          <li><strong>Release Cadence</strong> — Release frequency over time and days between major/minor/patch releases.</li>
        </ul>
        <p>
          To use a template, go to <strong>Dashboards &gt; New Dashboard &gt; From Template</strong> and filter by the <strong>GitHub</strong> category. Select a template, choose the connected repository as the data source, and click <strong>Create Dashboard</strong>.
        </p>
      </>
    ),
  },

  'gitlab': {
    title: 'GitLab',
    description: 'Connect GitLab projects to OpenAnalyst to analyze merge requests, pipelines, issues, and CI/CD performance. Supports both GitLab.com and self-hosted GitLab instances.',
    content: (
      <>
        <h2>Connecting GitLab</h2>
        <p>
          OpenAnalyst connects to GitLab using personal access tokens or OAuth. Both GitLab.com (cloud) and self-hosted GitLab instances are supported. Self-hosted GitLab is available on Max and Enterprise plans.
        </p>
        <h3>Connecting GitLab.com via OAuth</h3>
        <ol className="step-list">
          <li>In the sidebar, navigate to <strong>Integrations</strong>.</li>
          <li>Find <strong>GitLab</strong> in the integrations list and click <strong>Connect</strong>.</li>
          <li>Select <strong>GitLab.com (OAuth)</strong> as the connection method.</li>
          <li>You will be redirected to GitLab to authorize OpenAnalyst. Click <strong>Authorize</strong>.</li>
          <li>After authorization, select the groups and projects you want to analyze and click <strong>Save configuration</strong>.</li>
        </ol>
        <h3>Connecting Self-Hosted GitLab via Access Token</h3>
        <ol className="step-list">
          <li>In your GitLab instance, go to your user profile and navigate to <strong>Preferences &gt; Access Tokens</strong>.</li>
          <li>Create a new personal access token with the following scopes: <code>read_api</code>, <code>read_user</code>, <code>read_repository</code>.</li>
          <li>Copy the token value — it is only shown once.</li>
          <li>In OpenAnalyst <strong>Integrations</strong>, choose <strong>GitLab (Self-Hosted)</strong> and enter your GitLab instance URL (for example, <code>https://gitlab.yourcompany.com</code>) and the access token.</li>
          <li>Click <strong>Test connection</strong> to verify, then click <strong>Save</strong>.</li>
        </ol>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Store your GitLab access token securely. If the token is compromised, revoke it immediately from your GitLab profile and generate a new one, then update the connection in OpenAnalyst.</p>
        </div>

        <h2>Analyzing GitLab Data</h2>
        <p>
          After connecting, OpenAnalyst syncs data from your selected GitLab projects. The following data types are available for analysis:
        </p>
        <table>
          <thead>
            <tr>
              <th>Data Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Merge Requests</td>
              <td>MR status, creation and merge timestamps, reviewers, approval status, and source/target branches.</td>
            </tr>
            <tr>
              <td>Pipelines</td>
              <td>Pipeline runs, status (success/failed/cancelled), duration, and triggering event.</td>
            </tr>
            <tr>
              <td>Jobs</td>
              <td>Individual CI/CD job results, duration, stage, and runner assignment.</td>
            </tr>
            <tr>
              <td>Issues</td>
              <td>Open/closed issues, labels, milestone assignment, time estimates, and time-to-close.</td>
            </tr>
            <tr>
              <td>Commits</td>
              <td>Commit history with author, message, timestamp, and changed files.</td>
            </tr>
            <tr>
              <td>Contributors</td>
              <td>Activity per contributor including commit count, MR authorship, and code review participation.</td>
            </tr>
          </tbody>
        </table>
        <p>
          All synced data is available in the <strong>Data Explorer</strong> and the <strong>AI Chat</strong> interface. Example natural-language queries you can ask:
        </p>
        <ul>
          <li>"What is our average pipeline duration trend over the past 60 days?"</li>
          <li>"Which pipelines failed most frequently last week and in which stage?"</li>
          <li>"Show me merge request cycle time by project for this quarter."</li>
        </ul>

        <h2>CI/CD Pipeline Analytics</h2>
        <p>
          GitLab CI/CD pipeline data is one of the most powerful aspects of the OpenAnalyst GitLab integration. The platform tracks every pipeline run and surfaces metrics such as:
        </p>
        <ul>
          <li><strong>Pipeline success rate</strong> — Percentage of successful pipelines over time, broken down by branch or project.</li>
          <li><strong>Average duration</strong> — How long pipelines take to complete, with trend analysis to detect slowdowns.</li>
          <li><strong>Failure hotspots</strong> — Which jobs or stages fail most often, helping teams prioritize reliability improvements.</li>
          <li><strong>Queue time</strong> — Time jobs spend waiting for available runners, useful for capacity planning.</li>
          <li><strong>Flaky job detection</strong> — Jobs that intermittently fail and succeed without code changes are flagged for investigation.</li>
        </ul>
        <p>
          Pre-built CI/CD analytics dashboard templates are available under <strong>Dashboards &gt; New Dashboard &gt; From Template &gt; GitLab</strong>.
        </p>

        <h2>Self-Hosted GitLab Support</h2>
        <p>
          OpenAnalyst fully supports self-hosted GitLab instances (GitLab CE and EE) running version 14.0 or later. When connecting a self-hosted instance:
        </p>
        <ul>
          <li>Ensure the GitLab instance is reachable from the internet or configure a network tunnel. OpenAnalyst connects outbound to your instance's API endpoint.</li>
          <li>If your instance uses a self-signed TLS certificate, contact OpenAnalyst support to whitelist the certificate fingerprint.</li>
          <li>For instances behind a VPN, use the OpenAnalyst agent (available on Enterprise plans) which can be deployed on-premises to proxy API calls securely.</li>
        </ul>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Self-hosted GitLab connectivity requires the Max or Enterprise plan. If you are on a lower plan and need this feature, consider upgrading or contacting the OpenAnalyst sales team for a trial.</p>
        </div>

        <h2>Setting Up Access Tokens</h2>
        <p>
          For long-running integrations, OpenAnalyst recommends creating a dedicated service account in GitLab rather than using a personal access token tied to an individual user. This prevents the integration from breaking if the individual's account is deactivated.
        </p>
        <ol className="step-list">
          <li>Create a new GitLab user account for the OpenAnalyst service (for example, <code>openanalyst-bot</code>).</li>
          <li>Add the service account to each project you want to analyze with at least <strong>Reporter</strong> role access.</li>
          <li>Log in as the service account and create a personal access token with <code>read_api</code> scope.</li>
          <li>Use this token when configuring the OpenAnalyst integration.</li>
        </ol>
        <p>
          Alternatively, if your GitLab instance supports group access tokens (GitLab 15.7+), you can create a group access token scoped to an entire group rather than managing project-level access individually:
        </p>
        <pre><code>{`# GitLab API: Create group access token
curl -X POST "https://gitlab.yourcompany.com/api/v4/groups/YOUR_GROUP_ID/access_tokens" \\
  -H "PRIVATE-TOKEN: your_admin_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "OpenAnalyst Integration",
    "scopes": ["read_api", "read_repository"],
    "access_level": 20,
    "expires_at": "2026-12-31"
  }'`}</code></pre>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Set a token expiry date and schedule a calendar reminder to rotate it before it expires. An expired token will cause the integration to stop syncing, which will leave your dashboards with stale data.</p>
        </div>
      </>
    ),
  },
};
