import type { ContentMap } from './types';

export const configurePages: ContentMap = {
  'tools': {
    title: 'Analytics Tools',
    description: 'Explore the full suite of built-in visualization, querying, and statistical analysis tools available in OpenAnalyst.',
    content: (
      <>
        <h2>Chart Types</h2>
        <p>
          OpenAnalyst ships with a comprehensive library of chart types suitable for every analytical scenario.
          All charts are interactive by default — hover for tooltips, click to filter, and drag to zoom.
        </p>
        <ul>
          <li><strong>Line chart</strong> — Time-series trends, continuous data, and multi-series comparisons. Supports area fills, smoothing, and reference lines.</li>
          <li><strong>Bar chart</strong> — Categorical comparisons in vertical or horizontal orientation. Supports grouped, stacked, and 100% stacked variants.</li>
          <li><strong>Pie and donut chart</strong> — Part-to-whole relationships. Donut variant supports a center metric for at-a-glance KPIs.</li>
          <li><strong>Scatter plot</strong> — Correlation and distribution between two continuous variables. Bubble mode adds a third dimension via point size.</li>
          <li><strong>Heatmap</strong> — Two-dimensional density visualization, ideal for time-of-day activity grids and correlation matrices.</li>
          <li><strong>Funnel chart</strong> — Conversion analysis across sequential stages. Supports drop-off percentage labels between stages.</li>
          <li><strong>Treemap</strong> — Hierarchical data as nested rectangles, sized and colored by chosen metrics. Drilldown navigation is built in.</li>
          <li><strong>Gauge chart</strong> — Single-metric progress toward a goal or threshold, with configurable color bands for status indication.</li>
        </ul>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Any chart can be converted to a different type without losing data bindings. Use the chart switcher in the top-right corner of the edit panel.</p>
        </div>

        <h2>Table and Pivot Views</h2>
        <p>
          Raw tabular data is rendered through a high-performance table component capable of displaying millions of rows using virtual scrolling.
          Columns are sortable, filterable, and resizable. Built-in pagination controls allow you to set page size from 25 to 500 rows.
        </p>
        <p>
          The pivot table extends the standard table with drag-and-drop row and column groupings. Place any dimension in the row or column axis and
          choose an aggregation function — sum, average, count, min, max, or custom expression — for the value cells. Pivot results can be exported
          to CSV or loaded directly into a chart.
        </p>
        <pre><code>{`-- Example: pivot aggregation via SQL
SELECT
  region,
  product_category,
  SUM(revenue) AS total_revenue
FROM sales
GROUP BY region, product_category
ORDER BY region, product_category;`}</code></pre>

        <h2>Statistical Tools</h2>
        <p>
          OpenAnalyst includes a set of statistical analysis capabilities that run server-side and return results as chart overlays or separate panels.
        </p>
        <ul>
          <li><strong>Regression</strong> — Linear, polynomial, and logistic regression. Results display the equation, R-squared, and a trend line overlay on scatter or line charts.</li>
          <li><strong>Correlation matrix</strong> — Pearson or Spearman correlation between all numeric columns in a dataset, rendered as an interactive heatmap.</li>
          <li><strong>Distribution analysis</strong> — Histogram with optional kernel density estimate (KDE) overlay, plus summary statistics (mean, median, std, skewness, kurtosis).</li>
          <li><strong>Outlier detection</strong> — IQR-based and Z-score methods flag anomalous data points directly on charts.</li>
          <li><strong>Moving averages</strong> — Simple, weighted, and exponential moving averages configurable as overlays on any time-series chart.</li>
        </ul>

        <h2>SQL Editor</h2>
        <p>
          The built-in SQL editor provides a full-featured query environment with syntax highlighting, auto-complete, and schema browsing.
          Write standard SQL against any connected data source and visualize results immediately.
        </p>
        <ul>
          <li>Schema explorer panel shows tables, columns, and data types from all connected connectors.</li>
          <li>Query history stores the last 500 queries per workspace, searchable by keyword or date.</li>
          <li>Saved queries can be named, tagged, and shared with team members.</li>
          <li>Results are paginated and exportable to CSV, JSON, or Excel.</li>
        </ul>
        <div className="callout callout-info">
          <p><strong>Note:</strong> The SQL editor respects connector-level read-only restrictions. Write operations (INSERT, UPDATE, DELETE) are only permitted on connectors explicitly configured to allow writes.</p>
        </div>

        <h2>Natural Language Queries</h2>
        <p>
          Ask questions in plain English and OpenAnalyst will generate the appropriate SQL, execute it, and return a chart or table — no SQL knowledge required.
          Natural language queries are powered by the AI model selected in your workspace settings.
        </p>
        <p>
          Type your question in the query bar at the top of any dashboard or report panel, for example:
        </p>
        <pre><code>{`"Show me monthly revenue by region for the past 12 months"
"Which products had the highest return rate last quarter?"
"Compare this week's signups to the same period last year"`}</code></pre>
        <p>
          The generated SQL is shown below the result so you can inspect, copy, or further refine it in the SQL editor.
        </p>
      </>
    ),
  },

  'rules': {
    title: 'Rules & Alerts',
    description: 'Configure automated monitoring rules that notify your team when data conditions change, thresholds are crossed, or anomalies are detected.',
    content: (
      <>
        <h2>Creating an Alert Rule</h2>
        <p>
          Alert rules continuously evaluate conditions against your data and trigger notifications when those conditions are met.
          Rules can be created from any chart or data panel using the alert button, or from the dedicated Rules page in workspace settings.
        </p>
        <ol className="step-list">
          <li>Navigate to <strong>Settings &gt; Rules &amp; Alerts</strong> or click the bell icon on any chart.</li>
          <li>Click <strong>New Rule</strong> and give it a descriptive name.</li>
          <li>Choose the data source and metric to monitor.</li>
          <li>Define the condition type and threshold values.</li>
          <li>Select notification channels and optionally configure escalation.</li>
          <li>Set the evaluation schedule and click <strong>Save Rule</strong>.</li>
        </ol>

        <h2>Condition Types</h2>
        <p>
          Rules support three classes of conditions, each suited to a different monitoring scenario.
        </p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Example Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Threshold</td>
              <td>Triggers when a metric crosses a fixed numeric boundary (above, below, or equals).</td>
              <td>Alert when error rate exceeds 5%.</td>
            </tr>
            <tr>
              <td>Anomaly</td>
              <td>Uses statistical modeling to detect values significantly outside expected range based on historical patterns.</td>
              <td>Alert on unusual traffic spikes or drops.</td>
            </tr>
            <tr>
              <td>Trend change</td>
              <td>Triggers when the slope or direction of a metric changes beyond a configured sensitivity.</td>
              <td>Alert when weekly revenue growth turns negative.</td>
            </tr>
          </tbody>
        </table>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Anomaly detection requires at least 14 days of historical data to establish a reliable baseline. Rules configured before sufficient history is available will enter a learning state and begin evaluating once the baseline is ready.</p>
        </div>

        <h2>Notification Channels</h2>
        <p>
          Configure where alerts are sent when a rule triggers. Multiple channels can be added to a single rule for redundancy.
        </p>
        <ul>
          <li><strong>Email</strong> — Send to one or more email addresses. Supports HTML message templates with metric values and chart snapshots embedded inline.</li>
          <li><strong>Slack</strong> — Post to any channel or direct message. Requires the Slack integration to be configured first in the Integrations settings.</li>
          <li><strong>Webhook</strong> — Send a JSON payload to any URL. Useful for connecting to PagerDuty, Opsgenie, or custom internal systems.</li>
          <li><strong>In-app notification</strong> — Always enabled. Alerts appear in the notification center accessible from the top navigation bar.</li>
        </ul>
        <pre><code>{`// Example webhook payload
{
  "rule_id": "rule_abc123",
  "rule_name": "Error Rate High",
  "triggered_at": "2026-02-27T14:32:00Z",
  "condition": "threshold_exceeded",
  "metric": "error_rate",
  "current_value": 7.4,
  "threshold": 5.0,
  "dashboard_url": "https://app.openanalyst.com/d/dashboard-id"
}`}</code></pre>

        <h2>Scheduling and Evaluation</h2>
        <p>
          Rules evaluate on a schedule you define. More frequent evaluation increases responsiveness but may consume additional query credits on high-volume data sources.
        </p>
        <ul>
          <li><strong>Real-time</strong> — Evaluates on every data refresh (available on Pro and Max plans).</li>
          <li><strong>Every 5 / 15 / 30 minutes</strong> — Suitable for operational metrics.</li>
          <li><strong>Hourly / Daily</strong> — Suitable for business KPIs and reporting metrics.</li>
        </ul>

        <h2>Alert History, Snoozing, and Escalation</h2>
        <p>
          The alert history log records every trigger event with a timestamp, the metric value at time of trigger, and the notification status for each channel.
          Entries are retained for 90 days and are exportable.
        </p>
        <p>
          Snoozing temporarily suppresses notifications for a rule without disabling it. Set a snooze duration of 1 hour up to 7 days.
          The rule continues to evaluate and the alert state is still recorded in history; notifications simply are not sent during the snooze window.
        </p>
        <p>
          Escalation policies define secondary notification channels that activate if the primary channel does not receive an acknowledgement within a configured time window.
          Escalation is available on Pro and Max plans and is configured per rule in the Advanced section of the rule editor.
        </p>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Disabling a rule entirely clears its current alert state. If the condition is still active when the rule is re-enabled, it will re-trigger immediately upon the first evaluation.</p>
        </div>
      </>
    ),
  },

  'agents': {
    title: 'AI Agents',
    description: 'Understand and configure AI agents — autonomous assistants that analyze data, write reports, detect anomalies, and more on your behalf.',
    content: (
      <>
        <h2>What Are AI Agents?</h2>
        <p>
          AI agents in OpenAnalyst are autonomous task executors that combine access to your data, a selected AI model, and a defined skill set to accomplish
          analytical goals with minimal manual input. Unlike a simple query or chart, an agent can plan multi-step tasks, call tools, reason about intermediate
          results, and produce structured outputs such as reports, dashboards, or recommendations.
        </p>
        <p>
          Agents operate within your workspace context — they can access the connectors, dashboards, and reports you have permission to see, and they respect
          all existing data governance rules.
        </p>

        <h2>Available Agent Types</h2>
        <table>
          <thead>
            <tr>
              <th>Agent</th>
              <th>Primary Capability</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Analyst</td>
              <td>Explores datasets, surfaces insights, answers ad-hoc questions.</td>
              <td>Exploratory analysis, executive summaries.</td>
            </tr>
            <tr>
              <td>Report Writer</td>
              <td>Generates structured narrative reports from data with charts and commentary.</td>
              <td>Weekly business reviews, board decks.</td>
            </tr>
            <tr>
              <td>Anomaly Detector</td>
              <td>Scans datasets for statistical outliers and unusual patterns.</td>
              <td>Fraud detection, infrastructure monitoring.</td>
            </tr>
            <tr>
              <td>Forecaster</td>
              <td>Builds time-series forecasts using statistical and ML models.</td>
              <td>Revenue forecasting, demand planning.</td>
            </tr>
            <tr>
              <td>SQL Expert</td>
              <td>Generates, optimizes, and explains complex SQL queries.</td>
              <td>Query optimization, schema documentation.</td>
            </tr>
            <tr>
              <td>Data Cleaner</td>
              <td>Identifies and corrects data quality issues — duplicates, nulls, type mismatches.</td>
              <td>Data preparation before analysis or migration.</td>
            </tr>
          </tbody>
        </table>

        <h2>Configuring an Agent</h2>
        <p>
          Each agent can be configured with a name, a base AI model, a set of enabled skills, and context such as which data sources it should prioritize.
          Navigate to <strong>Settings &gt; AI Agents</strong> and click <strong>New Agent</strong>.
        </p>
        <ol className="step-list">
          <li>Select an agent type from the list above.</li>
          <li>Choose the AI model to power the agent (see the AI Models page for guidance on which model to select).</li>
          <li>Enable or disable individual skills — each agent type ships with a default skill set that you can customize.</li>
          <li>Set data source scope: all connectors, specific connectors, or specific schemas.</li>
          <li>Optionally add a system prompt to shape the agent's tone, focus area, or output format.</li>
          <li>Save the agent. It is now available in the agent panel and via the API.</li>
        </ol>

        <h2>Agent Conversations</h2>
        <p>
          Interact with any agent through the conversational interface accessible from the right-hand panel on any page. The conversation is threaded —
          follow-up questions retain context from earlier messages in the same session. You can reference charts, tables, or data sources by name and
          the agent will resolve them automatically.
        </p>
        <pre><code>{`You: Summarize the key trends in our Q1 sales data.

Agent: Based on your Q1 Sales dashboard, here are the three key trends:
1. Total revenue grew 14% month-over-month in March, led by the Enterprise segment.
2. The APAC region showed the highest growth rate at 32%, though it remains the smallest by volume.
3. Churn-adjusted net revenue retention improved from 108% in January to 117% in March.

Would you like me to generate a full report or drill into any of these areas?`}</code></pre>

        <h2>Agent Memory and Chaining</h2>
        <p>
          Agents maintain a session memory that persists for the duration of a conversation, allowing them to reference earlier results, build on previous queries,
          and avoid redundant data fetches. Memory is scoped to the session and is not shared between separate conversation threads.
        </p>
        <p>
          Agent chaining allows the output of one agent to become the input of another. For example, the Data Cleaner agent can preprocess a dataset and pass
          the cleaned result to the Forecaster agent, which then generates predictions. Chains are configured in the agent editor under the Pipeline tab,
          where you connect agents in sequence and map output fields to input parameters.
        </p>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Use agent chains for recurring workflows. Save a chain as a scheduled pipeline to run automatically on a daily or weekly basis, delivering results to a specified dashboard or Slack channel.</p>
        </div>
      </>
    ),
  },

  'models': {
    title: 'AI Models',
    description: 'Review the AI models available in OpenAnalyst, understand their capabilities and costs, and configure your default model and per-agent settings.',
    content: (
      <>
        <h2>Supported Models</h2>
        <p>
          OpenAnalyst integrates with multiple leading AI providers. The table below lists all available models, their provider, and their primary strengths.
        </p>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Model</th>
              <th>Strengths</th>
              <th>Context Window</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OpenAI</td>
              <td>GPT-4o</td>
              <td>Balanced reasoning and speed; strong at SQL generation and explanation.</td>
              <td>128K tokens</td>
            </tr>
            <tr>
              <td>OpenAI</td>
              <td>o1</td>
              <td>Deep reasoning with chain-of-thought; best for complex analytical planning.</td>
              <td>200K tokens</td>
            </tr>
            <tr>
              <td>OpenAI</td>
              <td>o3-mini</td>
              <td>Fast and cost-effective reasoning; suitable for high-volume tasks.</td>
              <td>128K tokens</td>
            </tr>
            <tr>
              <td>Anthropic</td>
              <td>Claude 3.5 Sonnet</td>
              <td>Excellent code generation, data interpretation, and nuanced writing.</td>
              <td>200K tokens</td>
            </tr>
            <tr>
              <td>Anthropic</td>
              <td>Claude Opus</td>
              <td>Highest-capability model for complex multi-step analysis and report writing.</td>
              <td>200K tokens</td>
            </tr>
            <tr>
              <td>DeepSeek</td>
              <td>DeepSeek V3</td>
              <td>Strong at data-intensive reasoning; competitive with frontier models at lower cost.</td>
              <td>128K tokens</td>
            </tr>
            <tr>
              <td>DeepSeek</td>
              <td>DeepSeek R1</td>
              <td>Chain-of-thought reasoning model; excellent for mathematical and statistical tasks.</td>
              <td>64K tokens</td>
            </tr>
            <tr>
              <td>Alibaba</td>
              <td>Qwen QwQ</td>
              <td>Long-context reasoning with multilingual support.</td>
              <td>128K tokens</td>
            </tr>
            <tr>
              <td>Alibaba</td>
              <td>Qwen 2.5</td>
              <td>Fast general-purpose model; strong coding and multilingual capabilities.</td>
              <td>128K tokens</td>
            </tr>
          </tbody>
        </table>

        <h2>Selecting a Default Model</h2>
        <p>
          The workspace default model is used for all agents and natural language queries unless an agent-specific override is set.
          To change the default, navigate to <strong>Settings &gt; AI Models</strong> and select from the dropdown.
          Your selection is saved per workspace and applies to all members.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Personal model preferences (set in your profile settings) override the workspace default for queries and conversations you initiate, but not for scheduled agent pipelines, which always use the workspace default or the model configured on that specific agent.</p>
        </div>

        <h2>Model-Specific Settings</h2>
        <p>
          Advanced model parameters can be tuned per agent in the agent configuration panel. These settings affect the character of model responses.
        </p>
        <ul>
          <li><strong>Temperature</strong> — Controls randomness. Lower values (0.0–0.3) produce more deterministic, fact-focused outputs. Higher values (0.7–1.0) produce more varied, creative outputs. For analytical tasks, temperatures in the 0.0–0.2 range are recommended.</li>
          <li><strong>Max tokens</strong> — Sets the maximum length of a single response. Increase this for agents expected to write long reports. Keep it low for quick query agents to control latency and cost.</li>
          <li><strong>Top-p (nucleus sampling)</strong> — An alternative to temperature for controlling output diversity. Not available on all models.</li>
          <li><strong>System prompt</strong> — A persistent instruction prepended to every conversation turn. Use it to establish domain context, output format requirements, or persona constraints.</li>
        </ul>

        <h2>Cost by Plan</h2>
        <p>
          Model usage is governed by AI credits, which are allocated per billing cycle based on your plan. The table below shows the included credits and relative costs per model tier.
        </p>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Monthly AI Credits</th>
              <th>Models Available</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Free</td>
              <td>100 credits</td>
              <td>GPT-4o, DeepSeek V3, Qwen 2.5</td>
            </tr>
            <tr>
              <td>Basic ($29/mo)</td>
              <td>500 credits</td>
              <td>All models except Claude Opus and o1</td>
            </tr>
            <tr>
              <td>Pro ($79/mo)</td>
              <td>2,000 credits</td>
              <td>All models</td>
            </tr>
            <tr>
              <td>Max ($149/mo)</td>
              <td>10,000 credits</td>
              <td>All models with priority throughput</td>
            </tr>
            <tr>
              <td>Enterprise</td>
              <td>Custom / unlimited options</td>
              <td>All models, custom fine-tuning available</td>
            </tr>
          </tbody>
        </table>

        <h2>Choosing the Right Model</h2>
        <p>
          Different tasks benefit from different model characteristics. Use this guidance to match tasks to models:
        </p>
        <ul>
          <li><strong>Ad-hoc data questions</strong> — GPT-4o or Claude 3.5 Sonnet for a good balance of speed and accuracy.</li>
          <li><strong>Complex analytical reports</strong> — Claude Opus or o1 for depth and coherent long-form output.</li>
          <li><strong>High-volume automated pipelines</strong> — o3-mini, DeepSeek V3, or Qwen 2.5 for cost efficiency at scale.</li>
          <li><strong>Statistical and mathematical tasks</strong> — DeepSeek R1 for structured step-by-step reasoning.</li>
          <li><strong>Multilingual workspaces</strong> — Qwen QwQ or Qwen 2.5 for robust multilingual support.</li>
        </ul>
      </>
    ),
  },

  'themes': {
    title: 'Themes',
    description: 'Customize the visual appearance of OpenAnalyst with light and dark modes, custom color schemes, and per-dashboard theme settings.',
    content: (
      <>
        <h2>Light and Dark Mode</h2>
        <p>
          OpenAnalyst supports light mode, dark mode, and system-preference detection. The default theme respects your operating system setting and
          switches automatically when the system preference changes. You can override this at the profile level from <strong>Settings &gt; Appearance</strong>.
        </p>
        <p>
          Dark mode uses a deep neutral background palette optimized for long working sessions and for displaying data-dense visualizations with high contrast.
          Light mode uses clean white and light gray surfaces, suited for shared screens, presentations, and printed exports.
        </p>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Exported PDFs and shared public dashboards always render in light mode by default, regardless of your personal preference setting, to ensure legibility in most viewing contexts. You can override this per dashboard in share settings.</p>
        </div>

        <h2>Custom Color Schemes</h2>
        <p>
          Beyond light and dark, you can define a custom color scheme that replaces the default accent color (OpenAnalyst orange) with your brand color.
          Custom schemes are available on Pro, Max, and Enterprise plans.
        </p>
        <ol className="step-list">
          <li>Go to <strong>Settings &gt; Appearance &gt; Custom Theme</strong>.</li>
          <li>Enter your primary brand color as a hex value.</li>
          <li>OpenAnalyst generates a full palette — including lighter and darker tints, hover states, and accessible text colors — automatically.</li>
          <li>Preview the palette across all UI components in the live preview panel.</li>
          <li>Save and apply to the workspace.</li>
        </ol>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Custom color schemes are applied workspace-wide. All members see the custom theme. Individual members cannot override it with a different custom color, though they can still switch between light and dark base modes.</p>
        </div>

        <h2>Chart Color Palettes</h2>
        <p>
          Chart series colors are drawn from a configurable palette. The default palette is designed for accessibility, with colors distinguishable by both
          color-sighted and color-blind users. Four built-in palettes are available:
        </p>
        <ul>
          <li><strong>Default</strong> — OpenAnalyst branded palette, 10 distinct colors.</li>
          <li><strong>Accessible</strong> — High-contrast palette verified against WCAG 2.1 AA for color blindness.</li>
          <li><strong>Monochrome</strong> — Shades of a single hue — useful for printed reports.</li>
          <li><strong>Sequential</strong> — A gradient palette for heatmaps and choropleth maps where color intensity encodes magnitude.</li>
        </ul>
        <p>
          Custom palettes can be defined by providing up to 12 hex color values. Palettes are saved per workspace and can be set as the workspace default
          or applied per chart.
        </p>

        <h2>Dashboard Themes</h2>
        <p>
          Each dashboard can have its own theme override independent of the workspace default. This is useful for executive-facing dashboards that require
          branded styling, or for embedding dashboards in external portals with different visual requirements.
        </p>
        <p>
          Dashboard theme settings are found in the dashboard editor under <strong>Dashboard Settings &gt; Appearance</strong>. Options include:
        </p>
        <ul>
          <li>Base mode (light, dark, or system).</li>
          <li>Chart color palette override.</li>
          <li>Custom background color.</li>
          <li>Font size scale (compact, standard, large) for accessibility.</li>
          <li>Card border style (none, subtle, or prominent).</li>
        </ul>

        <h2>Themes on Shared Dashboards</h2>
        <p>
          When a dashboard is shared via a public link or embedded via iframe, the theme applied is determined by the dashboard-level setting, not the viewer's
          personal preference. This ensures visual consistency for all external viewers regardless of their device or browser settings.
          Authenticated shared dashboards (shared within the workspace) do respect the recipient's personal light/dark preference.
        </p>
      </>
    ),
  },

  'keybinds': {
    title: 'Keyboard Shortcuts',
    description: 'Master the default keyboard shortcuts in OpenAnalyst and learn how to customize, reassign, or reset them to fit your workflow.',
    content: (
      <>
        <h2>Default Shortcuts</h2>
        <p>
          OpenAnalyst provides keyboard shortcuts across four areas: navigation, editing, dashboard controls, and search. All shortcuts are active when
          focus is not inside a text input field. The modifier key is <code>Ctrl</code> on Windows/Linux and <code>Cmd</code> on macOS.
        </p>

        <h3>Navigation</h3>
        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>Ctrl+K</code></td><td>Open command palette</td></tr>
            <tr><td><code>G then D</code></td><td>Go to Dashboards</td></tr>
            <tr><td><code>G then R</code></td><td>Go to Reports</td></tr>
            <tr><td><code>G then A</code></td><td>Go to AI Agents</td></tr>
            <tr><td><code>G then S</code></td><td>Go to Settings</td></tr>
            <tr><td><code>Alt+Left</code></td><td>Navigate back</td></tr>
            <tr><td><code>Alt+Right</code></td><td>Navigate forward</td></tr>
          </tbody>
        </table>

        <h3>Dashboard Controls</h3>
        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>E</code></td><td>Toggle edit mode on current dashboard</td></tr>
            <tr><td><code>R</code></td><td>Refresh all panels</td></tr>
            <tr><td><code>F</code></td><td>Enter focus / full-screen mode for selected panel</td></tr>
            <tr><td><code>Escape</code></td><td>Exit focus mode or close modal</td></tr>
            <tr><td><code>Ctrl+S</code></td><td>Save dashboard changes</td></tr>
            <tr><td><code>Ctrl+Z</code></td><td>Undo last layout change</td></tr>
            <tr><td><code>Ctrl+Shift+Z</code></td><td>Redo layout change</td></tr>
          </tbody>
        </table>

        <h3>Editing</h3>
        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>N</code></td><td>Add new panel to dashboard</td></tr>
            <tr><td><code>Ctrl+D</code></td><td>Duplicate selected panel</td></tr>
            <tr><td><code>Delete</code></td><td>Remove selected panel (with confirmation)</td></tr>
            <tr><td><code>Ctrl+C</code></td><td>Copy panel configuration</td></tr>
            <tr><td><code>Ctrl+V</code></td><td>Paste panel configuration</td></tr>
          </tbody>
        </table>

        <h3>Search and Focus</h3>
        <table>
          <thead>
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>/</code></td><td>Focus global search bar</td></tr>
            <tr><td><code>Ctrl+F</code></td><td>Search within current page (data tables, dashboards)</td></tr>
            <tr><td><code>Ctrl+Shift+F</code></td><td>Full-text search across all workspace content</td></tr>
          </tbody>
        </table>

        <h2>Customizing Shortcuts</h2>
        <p>
          To reassign a shortcut, go to <strong>Settings &gt; Keyboard Shortcuts</strong>. Click the shortcut you want to change, then press the new key combination.
          Shortcut changes are saved to your profile and are not workspace-wide — each user can have personal shortcut assignments.
        </p>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Assigning a key combination that is already in use by another action will create a conflict. OpenAnalyst will warn you and require you to resolve the conflict by reassigning one of the competing shortcuts.</p>
        </div>

        <h2>Reset to Defaults</h2>
        <p>
          To restore all shortcuts to their factory defaults, click <strong>Reset to Defaults</strong> at the bottom of the Keyboard Shortcuts settings page.
          This action cannot be undone — any customizations you have made will be lost. A confirmation dialog is shown before the reset is applied.
        </p>
      </>
    ),
  },

  'commands': {
    title: 'Commands',
    description: 'Use the command palette and available commands to navigate, manage data, run agents, export results, and access settings without leaving the keyboard.',
    content: (
      <>
        <h2>Command Palette</h2>
        <p>
          The command palette is the fastest way to take action anywhere in OpenAnalyst. Open it with <code>Ctrl+K</code> (Windows/Linux) or <code>Cmd+K</code> (macOS).
          A modal appears with a search input — type any keyword and matching commands appear instantly with fuzzy search matching.
        </p>
        <p>
          The palette is context-aware: when you are viewing a dashboard, dashboard-specific commands appear first. When you are in the SQL editor,
          query-related commands are prioritized. Recently used commands appear at the top of the list regardless of context.
        </p>

        <h2>Available Commands</h2>
        <p>
          The full command registry is organized into the following categories:
        </p>
        <h3>Navigation Commands</h3>
        <ul>
          <li><code>Go to Dashboards</code> — Opens the dashboard browser.</li>
          <li><code>Go to Reports</code> — Opens the reports list.</li>
          <li><code>Go to AI Agents</code> — Opens the agents panel.</li>
          <li><code>Go to Settings</code> — Opens workspace settings.</li>
          <li><code>Open dashboard: [name]</code> — Fuzzy-search and jump to any dashboard by name.</li>
        </ul>
        <h3>Data Commands</h3>
        <ul>
          <li><code>Refresh data</code> — Forces a fresh query on all panels in the current view.</li>
          <li><code>Open SQL editor</code> — Opens the SQL editor in a new panel.</li>
          <li><code>Run query</code> — Executes the current query in the SQL editor.</li>
          <li><code>New chart</code> — Opens the chart creation wizard.</li>
        </ul>
        <h3>Agent Commands</h3>
        <ul>
          <li><code>Ask AI</code> — Opens an agent conversation for the current context.</li>
          <li><code>Run agent: [name]</code> — Directly invokes a named agent with the current data context.</li>
          <li><code>Generate report</code> — Activates the Report Writer agent for the current dashboard.</li>
        </ul>
        <h3>Export Commands</h3>
        <ul>
          <li><code>Export to CSV</code> — Downloads the current chart or table as a CSV file.</li>
          <li><code>Export to PDF</code> — Renders the current dashboard or report as a PDF.</li>
          <li><code>Export to PNG</code> — Saves the current chart as a PNG image.</li>
          <li><code>Copy share link</code> — Copies the public or authenticated share URL to the clipboard.</li>
        </ul>
        <h3>Settings Commands</h3>
        <ul>
          <li><code>Switch to dark mode / light mode</code> — Toggles the theme.</li>
          <li><code>Open keyboard shortcuts</code> — Opens the shortcuts settings page.</li>
          <li><code>Manage integrations</code> — Opens the integrations configuration page.</li>
        </ul>

        <h2>Command Search</h2>
        <p>
          The command palette uses fuzzy matching, so you do not need to type the exact command name. Typing <code>rep pdf</code> will match
          <code>Export to PDF</code> and <code>Generate report</code>. Matching characters are highlighted in the results list.
        </p>

        <h2>Custom Commands</h2>
        <p>
          Workspace admins can register custom commands that appear in the palette for all members. Custom commands can open specific dashboards,
          trigger agent pipelines, or navigate to external URLs. They are configured in <strong>Settings &gt; Commands &gt; Custom Commands</strong>.
        </p>
        <pre><code>{`// Custom command definition example
{
  "name": "Open Q1 Revenue Dashboard",
  "action": "navigate",
  "target": "/d/q1-revenue-2026",
  "shortcut": "G Q"
}`}</code></pre>

        <h2>Command History</h2>
        <p>
          The last 20 commands you executed are stored in your command history and displayed at the top of the palette when you open it without typing.
          History is per-user and persists across browser sessions. You can clear your command history from profile settings.
        </p>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Pin frequently used commands by hovering over a result in the palette and clicking the pin icon. Pinned commands always appear at the top of the palette, above recent history.</p>
        </div>
      </>
    ),
  },

  'formatters': {
    title: 'Data Formatters',
    description: 'Configure how numbers, currencies, dates, percentages, and custom values are displayed across charts, tables, and reports in OpenAnalyst.',
    content: (
      <>
        <h2>Number Formatting</h2>
        <p>
          Number formatting controls apply globally as workspace defaults and can be overridden per chart or per column in tables.
          Access global defaults at <strong>Settings &gt; Data Formatters &gt; Numbers</strong>.
        </p>
        <ul>
          <li><strong>Decimal places</strong> — Set from 0 to 10. Auto mode shows the minimum significant digits without trailing zeros.</li>
          <li><strong>Thousands separator</strong> — Comma (<code>,</code>), period (<code>.</code>), space, or none. Default follows the workspace locale.</li>
          <li><strong>Abbreviation</strong> — Automatically abbreviate large numbers: 1,000 → 1K, 1,000,000 → 1M, 1,000,000,000 → 1B.</li>
          <li><strong>Prefix and suffix</strong> — Add arbitrary text before or after the formatted number (e.g., a unit label such as "units" or "sessions").</li>
        </ul>
        <pre><code>{`// Example format string syntax
"#,##0.00"          → 1,234.56
"#,##0"             → 1,235
"0.0%"              → 23.4%
"$#,##0.00"         → $1,234.56
"#,##0 units"       → 1,235 units
"0.00e+0"           → 1.23e+3`}</code></pre>

        <h2>Currency Formats</h2>
        <p>
          Currency formatting applies the correct symbol, position (prefix or suffix), and decimal convention for your chosen currency.
          OpenAnalyst supports all ISO 4217 currencies. To set the workspace default currency, go to <strong>Settings &gt; Data Formatters &gt; Currency</strong>.
        </p>
        <table>
          <thead>
            <tr>
              <th>Currency</th>
              <th>Code</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>US Dollar</td><td>USD</td><td>$1,234.56</td></tr>
            <tr><td>Euro</td><td>EUR</td><td>1.234,56 €</td></tr>
            <tr><td>British Pound</td><td>GBP</td><td>£1,234.56</td></tr>
            <tr><td>Japanese Yen</td><td>JPY</td><td>¥1,235</td></tr>
            <tr><td>Indian Rupee</td><td>INR</td><td>₹1,234.56</td></tr>
          </tbody>
        </table>

        <h2>Date and Time Formats</h2>
        <p>
          Date and time display format is controlled separately from the data storage format. OpenAnalyst stores all timestamps in UTC and converts
          to the user's configured timezone for display. The workspace timezone is set in <strong>Settings &gt; General</strong> and can be
          overridden per user in profile settings.
        </p>
        <p>
          Common date display formats:
        </p>
        <ul>
          <li><code>YYYY-MM-DD</code> — ISO 8601: 2026-02-27</li>
          <li><code>MM/DD/YYYY</code> — US format: 02/27/2026</li>
          <li><code>DD/MM/YYYY</code> — European format: 27/02/2026</li>
          <li><code>MMM D, YYYY</code> — Long format: Feb 27, 2026</li>
          <li><code>YYYY-MM-DD HH:mm</code> — With time: 2026-02-27 14:30</li>
        </ul>

        <h2>Percentage Formatting</h2>
        <p>
          Percentage columns can be stored as decimals (0.234 = 23.4%) or as whole numbers (23.4 = 23.4%). Specify the input type when configuring
          the formatter so OpenAnalyst applies the correct multiplier for display. Percentage formatters include decimal place control and
          an option to show the sign (<code>+</code> or <code>-</code>) explicitly.
        </p>

        <h2>Conditional Formatting in Tables</h2>
        <p>
          Conditional formatting applies visual cues — color fills, text color, or icons — to table cells based on their value. Rules are defined
          per column in the table editor.
        </p>
        <ol className="step-list">
          <li>Open the table editor and select a column.</li>
          <li>Click <strong>Conditional Formatting</strong> in the column settings panel.</li>
          <li>Add one or more rules. Each rule has a condition (greater than, less than, between, equals, contains) and a style to apply.</li>
          <li>Rules are evaluated in order — the first matching rule is applied.</li>
          <li>Click <strong>Apply</strong> to preview and save.</li>
        </ol>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Use a color scale (gradient from red to green across a value range) to instantly communicate magnitude in KPI tables without requiring readers to read individual numbers.</p>
        </div>

        <h2>Locale Settings</h2>
        <p>
          The workspace locale governs the default thousands separator, decimal mark, and date format. It is set in <strong>Settings &gt; General &gt; Locale</strong>.
          Individual users can override the locale in their profile settings — this affects only their own view of data and does not change how data is stored or
          how exports are formatted when triggered by scheduled pipelines.
        </p>
      </>
    ),
  },

  'permissions': {
    title: 'Permissions',
    description: 'Understand the role hierarchy, configure workspace and project-level access, manage API key scopes, and control how content is shared across your team.',
    content: (
      <>
        <h2>Role Types</h2>
        <p>
          OpenAnalyst uses a role-based access control model with five built-in roles. Roles are assigned per workspace and determine what actions a member can take.
        </p>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Owner</strong></td>
              <td>Full access including billing, workspace deletion, and owner transfer. Only one Owner per workspace.</td>
            </tr>
            <tr>
              <td><strong>Admin</strong></td>
              <td>Full access except billing and workspace deletion. Can manage members, integrations, connectors, and all workspace settings.</td>
            </tr>
            <tr>
              <td><strong>Editor</strong></td>
              <td>Can create, edit, and delete dashboards, reports, and charts. Cannot manage members or connectors.</td>
            </tr>
            <tr>
              <td><strong>Viewer</strong></td>
              <td>Read-only access to all dashboards and reports. Cannot create or edit content. Can export and share within their permission scope.</td>
            </tr>
            <tr>
              <td><strong>Guest</strong></td>
              <td>Restricted access to only the specific dashboards or reports they have been explicitly invited to view.</td>
            </tr>
          </tbody>
        </table>

        <h2>Permission Matrix</h2>
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>Owner</th>
              <th>Admin</th>
              <th>Editor</th>
              <th>Viewer</th>
              <th>Guest</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>View dashboards</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Assigned only</td></tr>
            <tr><td>Create / edit dashboards</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td></tr>
            <tr><td>Delete dashboards</td><td>Yes</td><td>Yes</td><td>Own only</td><td>No</td><td>No</td></tr>
            <tr><td>Manage connectors</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
            <tr><td>Manage members</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
            <tr><td>Manage integrations</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
            <tr><td>Access billing</td><td>Yes</td><td>No</td><td>No</td><td>No</td><td>No</td></tr>
            <tr><td>Generate API keys</td><td>Yes</td><td>Yes</td><td>No</td><td>No</td><td>No</td></tr>
            <tr><td>Export data</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Assigned only</td></tr>
          </tbody>
        </table>

        <h2>Workspace-Level vs Project-Level Permissions</h2>
        <p>
          Workspace-level roles apply across the entire workspace. Project-level permissions allow you to grant a member elevated or restricted access
          to a specific project (a group of dashboards and reports) without changing their workspace-wide role.
        </p>
        <p>
          For example, a Viewer at the workspace level can be granted Editor access on a specific project, allowing them to edit dashboards within that project
          while still only viewing all other workspace content.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Project-level permissions are additive — they can grant more access than the workspace role but cannot restrict it below the workspace role level. To restrict a user to specific content only, assign them the Guest role at the workspace level and explicitly grant access to the required resources.</p>
        </div>

        <h2>Sharing Permissions</h2>
        <p>
          When sharing a dashboard or report, the sharing dialog shows permission options:
        </p>
        <ul>
          <li><strong>View only</strong> — Recipients can view but not edit.</li>
          <li><strong>Can edit</strong> — Recipients can make changes (requires Editor role or higher).</li>
          <li><strong>Public link</strong> — Anyone with the link can view, no sign-in required. Only available for dashboards explicitly enabled for public sharing by an Admin.</li>
        </ul>

        <h2>API Key Scopes</h2>
        <p>
          API keys are scoped to control what operations they can perform. When generating an API key, select the appropriate scopes:
        </p>
        <ul>
          <li><code>read:dashboards</code> — Read dashboard and panel data.</li>
          <li><code>write:dashboards</code> — Create and modify dashboards.</li>
          <li><code>read:data</code> — Query data from connected sources.</li>
          <li><code>write:data</code> — Write data to connected sources (only for connectors with writes enabled).</li>
          <li><code>manage:agents</code> — Create, configure, and run agents.</li>
          <li><code>admin</code> — Full workspace access (grant sparingly).</li>
        </ul>

        <h2>Invite Management</h2>
        <p>
          Invite new members from <strong>Settings &gt; Members &gt; Invite</strong>. Invites are sent by email and expire after 72 hours.
          Pending invites are listed and can be revoked before they are accepted. You can also configure a domain allowlist so that anyone
          with a verified email at your company domain can join the workspace as a Viewer without requiring an explicit invite.
        </p>
      </>
    ),
  },

  'connectors': {
    title: 'Data Connectors',
    description: 'Connect OpenAnalyst to your databases and data warehouses using built-in connectors, with support for pooling, SSH tunnels, SSL, and query timeouts.',
    content: (
      <>
        <h2>Supported Database Connectors</h2>
        <p>
          OpenAnalyst provides native connectors for the most widely used databases and data warehouses. Each connector uses an optimized driver
          and query adapter tuned for that specific platform.
        </p>
        <table>
          <thead>
            <tr>
              <th>Connector</th>
              <th>Type</th>
              <th>Default Port</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>PostgreSQL</td><td>Relational</td><td>5432</td></tr>
            <tr><td>MySQL / MariaDB</td><td>Relational</td><td>3306</td></tr>
            <tr><td>MongoDB</td><td>Document</td><td>27017</td></tr>
            <tr><td>Snowflake</td><td>Cloud data warehouse</td><td>443 (HTTPS)</td></tr>
            <tr><td>Google BigQuery</td><td>Cloud data warehouse</td><td>443 (HTTPS)</td></tr>
            <tr><td>Amazon Redshift</td><td>Cloud data warehouse</td><td>5439</td></tr>
          </tbody>
        </table>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Additional connectors including Microsoft SQL Server, ClickHouse, DuckDB, and Databricks are available on Pro, Max, and Enterprise plans.</p>
        </div>

        <h2>Connection Setup</h2>
        <p>
          To add a new connector, navigate to <strong>Settings &gt; Data Connectors &gt; Add Connector</strong> and select the connector type.
          You will be prompted for connection credentials specific to that database.
        </p>
        <ol className="step-list">
          <li>Select the connector type.</li>
          <li>Enter the host, port, database name, username, and password.</li>
          <li>Configure optional settings — SSL, SSH tunnel, connection pool size, and query timeout.</li>
          <li>Click <strong>Test Connection</strong> to verify connectivity before saving.</li>
          <li>Name the connector and set its access scope (all members or specific roles).</li>
          <li>Click <strong>Save Connector</strong>.</li>
        </ol>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> Credentials are encrypted at rest using AES-256. Never share connector configurations or export workspace settings to untrusted parties, as exported files may include metadata about connector configurations.</p>
        </div>

        <h2>Connection Pooling</h2>
        <p>
          Connection pooling reduces the overhead of establishing a new database connection for every query by maintaining a pool of reusable connections.
          Pool settings are configured per connector:
        </p>
        <ul>
          <li><strong>Minimum pool size</strong> — The number of connections kept open when idle. Default is 2.</li>
          <li><strong>Maximum pool size</strong> — The upper limit on concurrent connections. Default is 10. Set lower for databases with strict connection limits.</li>
          <li><strong>Idle timeout</strong> — How long an idle connection is kept alive before being released. Default is 10 minutes.</li>
          <li><strong>Acquire timeout</strong> — How long a query waits for a free connection before failing. Default is 30 seconds.</li>
        </ul>

        <h2>SSH Tunnels</h2>
        <p>
          For databases that are not publicly accessible, OpenAnalyst supports SSH tunneling. The query is routed through an SSH jump host that has
          network access to the database.
        </p>
        <p>
          To configure an SSH tunnel, enable the SSH Tunnel option in the connector settings and provide:
        </p>
        <ul>
          <li>SSH host and port (typically port 22).</li>
          <li>SSH username.</li>
          <li>Authentication method: password or private key. Paste the private key directly or upload a <code>.pem</code> file.</li>
        </ul>
        <pre><code>{`# Verify your SSH key fingerprint before adding it
ssh-keygen -lf /path/to/your/private_key.pem`}</code></pre>

        <h2>SSL Certificates</h2>
        <p>
          Enable SSL in the connector settings to encrypt data in transit. If your database uses a self-signed or private CA certificate,
          upload the CA certificate bundle in PEM format. Client certificate authentication is also supported for PostgreSQL and MySQL connectors
          by providing a client certificate and private key.
        </p>

        <h2>Query Timeout Settings</h2>
        <p>
          To prevent long-running queries from consuming excessive resources, configure a query timeout per connector. When a query exceeds the
          timeout duration, it is cancelled and an error is returned to the user. The default timeout is 60 seconds. For large data warehouse
          queries on Snowflake, BigQuery, or Redshift, you may need to increase this to 300 seconds or more.
        </p>
      </>
    ),
  },

  'integrations': {
    title: 'Integrations',
    description: 'Connect OpenAnalyst to your existing tools across communication, productivity, automation, and cloud platforms using 24+ built-in integrations.',
    content: (
      <>
        <h2>Integration Categories</h2>
        <p>
          OpenAnalyst integrations are organized into four categories. All integrations are configured from <strong>Settings &gt; Integrations</strong>.
          Each integration page shows connection status, the last successful sync, and quick-access controls.
        </p>

        <h2>Communication Integrations</h2>
        <p>
          Deliver alerts, reports, and AI agent outputs directly to your team's communication tools.
        </p>
        <table>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Slack</td><td>Alert notifications, scheduled report delivery, agent output posting, interactive chart sharing.</td></tr>
            <tr><td>Discord</td><td>Alert notifications and report summaries to Discord channels or direct messages.</td></tr>
            <tr><td>Microsoft Teams</td><td>Adaptive card-based alerts and dashboard snapshots delivered to Teams channels.</td></tr>
          </tbody>
        </table>
        <p>
          To configure the Slack integration:
        </p>
        <ol className="step-list">
          <li>Click <strong>Connect</strong> on the Slack integration page.</li>
          <li>You will be redirected to Slack to authorize the OpenAnalyst app for your workspace.</li>
          <li>Select the default channel for notifications (can be overridden per alert rule).</li>
          <li>Click <strong>Allow</strong> to complete authorization.</li>
        </ol>

        <h2>Productivity Integrations</h2>
        <p>
          Synchronize data with your productivity and knowledge management tools.
        </p>
        <table>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Notion</td><td>Push report summaries and data tables to Notion pages. Embed live charts in Notion via iframes.</td></tr>
            <tr><td>Airtable</td><td>Use Airtable bases as data sources or push processed data back to Airtable tables.</td></tr>
            <tr><td>Google Sheets</td><td>Import Google Sheets data for analysis or export results directly to a specified sheet and range.</td></tr>
          </tbody>
        </table>

        <h2>Automation Integrations</h2>
        <p>
          Connect OpenAnalyst to automation platforms to build no-code workflows triggered by data events.
        </p>
        <table>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Zapier</td><td>Trigger Zaps when alerts fire. Receive data from Zaps as connector input. 5,000+ app connections.</td></tr>
            <tr><td>Make (formerly Integromat)</td><td>Advanced scenario builder — route alert payloads, transform data, and trigger multi-step workflows.</td></tr>
            <tr><td>n8n</td><td>Self-hosted automation with full API access. Use the OpenAnalyst n8n node for deep workflow integration.</td></tr>
          </tbody>
        </table>
        <pre><code>{`// Example: n8n webhook trigger payload from OpenAnalyst
{
  "event": "alert_triggered",
  "workspace_id": "ws_abc123",
  "rule_name": "Revenue Drop Alert",
  "metric": "daily_revenue",
  "value": 42150,
  "threshold": 50000,
  "timestamp": "2026-02-27T09:00:00Z"
}`}</code></pre>

        <h2>Cloud Integrations</h2>
        <p>
          Connect to cloud provider services for storage, event streaming, and identity management.
        </p>
        <table>
          <thead>
            <tr>
              <th>Integration</th>
              <th>Use Cases</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>AWS</td><td>Read from S3 buckets (Parquet, CSV), stream from Kinesis, connect to RDS and Redshift, use IAM role auth.</td></tr>
            <tr><td>Google Cloud Platform</td><td>BigQuery connector, Cloud Storage (GCS) data imports, Pub/Sub event triggers.</td></tr>
            <tr><td>Microsoft Azure</td><td>Azure Blob Storage imports, Azure Synapse Analytics connector, Azure AD for SSO.</td></tr>
          </tbody>
        </table>

        <h2>Webhook Configuration</h2>
        <p>
          In addition to named integrations, OpenAnalyst provides a generic outbound webhook system that can send event payloads to any URL.
          Configure outbound webhooks at <strong>Settings &gt; Integrations &gt; Webhooks</strong>. Each webhook can be scoped to specific event types:
          alert triggered, report generated, agent task completed, data refresh completed.
        </p>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Use webhook secrets to verify that incoming payloads originate from OpenAnalyst. Set a secret in the webhook configuration and verify the <code>X-OpenAnalyst-Signature</code> HMAC-SHA256 header in your receiving endpoint.</p>
        </div>
      </>
    ),
  },

  'api-config': {
    title: 'API Configuration',
    description: 'Generate and manage API keys, configure rate limits, set CORS and IP allowlist rules, register OAuth2 applications, and manage webhook endpoints.',
    content: (
      <>
        <h2>Generating API Keys</h2>
        <p>
          API keys authenticate programmatic requests to the OpenAnalyst REST API. Each key is associated with a workspace, a set of scopes,
          and optionally an expiry date.
        </p>
        <ol className="step-list">
          <li>Navigate to <strong>Settings &gt; API Configuration &gt; API Keys</strong>.</li>
          <li>Click <strong>Generate New Key</strong>.</li>
          <li>Enter a descriptive name for the key (e.g., "Production Dashboard Service").</li>
          <li>Select the required scopes from the scope checklist.</li>
          <li>Optionally set an expiry date. Keys without expiry dates remain valid until manually revoked.</li>
          <li>Click <strong>Generate</strong>. Copy the key immediately — it is shown only once.</li>
        </ol>
        <div className="callout callout-warning">
          <p><strong>Warning:</strong> API keys are displayed in full only at creation time. Store them in a secrets manager or environment variable immediately. If a key is lost, revoke it and generate a new one.</p>
        </div>
        <pre><code>{`# Example API request using an API key
curl -X GET "https://app.openanalyst.com/api/v1/dashboards" \\
  -H "Authorization: Bearer oa_live_xxxxxxxxxxxxxxxxxxxxxxxx" \\
  -H "Content-Type: application/json"`}</code></pre>

        <h2>Key Rotation</h2>
        <p>
          Rotate API keys periodically as a security best practice, or immediately if a key is suspected to be compromised. The key rotation workflow
          generates a new key with the same scopes while keeping the old key active for a configurable overlap period (default 24 hours), giving
          dependent services time to update their credentials without downtime.
        </p>

        <h2>Rate Limits by Plan</h2>
        <table>
          <thead>
            <tr>
              <th>Plan</th>
              <th>Requests per Minute</th>
              <th>Requests per Day</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Free</td><td>30</td><td>1,000</td></tr>
            <tr><td>Basic</td><td>120</td><td>10,000</td></tr>
            <tr><td>Pro</td><td>600</td><td>100,000</td></tr>
            <tr><td>Max</td><td>1,200</td><td>500,000</td></tr>
            <tr><td>Enterprise</td><td>Custom</td><td>Custom</td></tr>
          </tbody>
        </table>
        <p>
          Rate limit headers are included in every API response:
        </p>
        <pre><code>{`X-RateLimit-Limit: 600
X-RateLimit-Remaining: 587
X-RateLimit-Reset: 1740661200`}</code></pre>

        <h2>CORS Settings</h2>
        <p>
          If you are calling the OpenAnalyst API directly from a browser application, configure CORS to allow your origin. Navigate to
          <strong>Settings &gt; API Configuration &gt; CORS</strong> and add your allowed origins:
        </p>
        <pre><code>{`# Allowed origins example
https://yourapp.com
https://staging.yourapp.com
http://localhost:3000`}</code></pre>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Wildcard origins (<code>*</code>) are not supported for security reasons. Each origin must be explicitly listed.</p>
        </div>

        <h2>Webhook Endpoints</h2>
        <p>
          OpenAnalyst can send event notifications to configured webhook endpoints. Each endpoint is registered with a URL, an optional secret for
          signature verification, and a list of event types to subscribe to. See the Integrations page for details on the webhook payload format.
        </p>

        <h2>IP Allowlisting</h2>
        <p>
          Restrict API access to a set of trusted IP addresses or CIDR ranges. When an allowlist is configured, API requests from IP addresses not
          on the list are rejected with a 403 response. This is particularly important for production API keys used in server-to-server integrations.
        </p>
        <p>
          Configure the allowlist at <strong>Settings &gt; API Configuration &gt; IP Allowlist</strong>. You can add individual IPs or CIDR ranges:
        </p>
        <pre><code>{`203.0.113.42       # single IP
10.0.0.0/24        # CIDR range
2001:db8::/32      # IPv6 CIDR range`}</code></pre>

        <h2>OAuth2 App Registration</h2>
        <p>
          To build applications that authenticate on behalf of OpenAnalyst users using OAuth2, register your application in
          <strong>Settings &gt; API Configuration &gt; OAuth2 Apps</strong>. You will receive a client ID and client secret.
          The authorization code flow is used, with PKCE support for public clients (SPAs and mobile apps).
        </p>
        <pre><code>{`// OAuth2 authorization URL
GET https://app.openanalyst.com/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=read:dashboards+read:data
  &state=RANDOM_STATE_VALUE
  &code_challenge=YOUR_PKCE_CHALLENGE
  &code_challenge_method=S256`}</code></pre>
      </>
    ),
  },

  'agent-skills': {
    title: 'Agent Skills',
    description: 'Understand built-in agent skills, configure skill parameters, and create custom skill prompts to extend agent capabilities for your specific analytical needs.',
    content: (
      <>
        <h2>What Are Agent Skills?</h2>
        <p>
          Agent skills are modular capabilities that give agents access to specific tools and behaviors. Each skill encapsulates a set of functions —
          such as querying data, fitting a statistical model, or generating a visualization — along with the logic for when and how to use them.
          Skills are the building blocks from which agent capabilities are composed.
        </p>
        <p>
          An agent's skill set determines what it can do. The Data Analyst agent, for example, has skills for data querying, statistical analysis,
          and chart generation but not for writing formatted narrative reports — that skill belongs to the Report Writer agent.
        </p>

        <h2>Built-In Skills</h2>
        <table>
          <thead>
            <tr>
              <th>Skill</th>
              <th>Description</th>
              <th>Default Agents</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Cleaning</td>
              <td>Detects and resolves nulls, duplicates, type mismatches, and encoding errors in datasets.</td>
              <td>Data Cleaner</td>
            </tr>
            <tr>
              <td>Statistical Analysis</td>
              <td>Runs descriptive statistics, hypothesis tests, correlation analysis, and regression modeling.</td>
              <td>Data Analyst, Anomaly Detector</td>
            </tr>
            <tr>
              <td>Visualization</td>
              <td>Selects appropriate chart types and generates chart configurations from data and a stated goal.</td>
              <td>Data Analyst, Report Writer</td>
            </tr>
            <tr>
              <td>Forecasting</td>
              <td>Builds time-series forecasts using ARIMA, Prophet, exponential smoothing, and ML-based models.</td>
              <td>Forecaster</td>
            </tr>
            <tr>
              <td>Reporting</td>
              <td>Generates structured narrative reports with executive summaries, data commentary, and embedded charts.</td>
              <td>Report Writer</td>
            </tr>
            <tr>
              <td>SQL Generation</td>
              <td>Translates natural language questions into SQL queries optimized for the connected data source.</td>
              <td>SQL Expert, Data Analyst</td>
            </tr>
            <tr>
              <td>Anomaly Detection</td>
              <td>Identifies statistical outliers and anomalous time-series patterns using IQR, Z-score, and ML isolation forests.</td>
              <td>Anomaly Detector</td>
            </tr>
          </tbody>
        </table>

        <h2>Skill Parameters</h2>
        <p>
          Each skill exposes a set of configurable parameters that control its behavior. Parameters are set per agent in the agent configuration panel.
          Common parameters include:
        </p>
        <ul>
          <li><strong>Confidence threshold</strong> — For anomaly detection and forecasting skills, the minimum confidence level required before flagging an anomaly or returning a forecast.</li>
          <li><strong>Forecast horizon</strong> — For the forecasting skill, the number of periods to project forward.</li>
          <li><strong>Max rows</strong> — The maximum number of rows a skill will process in a single call, to prevent accidental large scans.</li>
          <li><strong>Output format</strong> — Whether to return results as a chart, a table, a narrative summary, or raw JSON.</li>
        </ul>
        <pre><code>{`// Example skill parameter configuration (JSON)
{
  "skill": "forecasting",
  "parameters": {
    "horizon": 90,
    "seasonality": "weekly",
    "confidence_threshold": 0.8,
    "output_format": "chart_and_summary"
  }
}`}</code></pre>

        <h2>Creating Custom Skill Prompts</h2>
        <p>
          Custom skill prompts extend the behavior of a built-in skill with domain-specific instructions. For example, you can add a custom prompt
          to the Reporting skill that instructs it to always frame insights in the context of a specific business objective, use company-specific
          terminology, or apply a particular narrative structure.
        </p>
        <ol className="step-list">
          <li>Open an agent in the agent editor.</li>
          <li>Click on a skill in the skills panel to expand its settings.</li>
          <li>In the <strong>Custom Prompt</strong> field, enter additional instructions that will be appended to the skill's base system prompt.</li>
          <li>Use <code>{"{{metric_name}}"}</code> and <code>{"{{data_source}}"}</code> placeholder variables if you want the prompt to reference the current query context dynamically.</li>
          <li>Save the agent to apply the custom prompt.</li>
        </ol>

        <h2>Skill Marketplace</h2>
        <p>
          The skill marketplace (accessible from <strong>Settings &gt; Agent Skills &gt; Marketplace</strong>) provides community-contributed skill bundles
          that can be imported into your workspace. Each marketplace entry includes a description, the skill parameters it exposes, and a usage example.
          Marketplace skills are reviewed by the OpenAnalyst team before listing.
        </p>
        <div className="callout callout-info">
          <p><strong>Note:</strong> Custom marketplace skills run within the same security sandbox as built-in skills. They can query your data sources only within the permissions already granted to the agent they are attached to.</p>
        </div>
      </>
    ),
  },

  'custom-tools': {
    title: 'Custom Tools',
    description: 'Build, register, version, and share custom analysis tools that extend agent capabilities with proprietary logic, external APIs, or specialized computations.',
    content: (
      <>
        <h2>What Are Custom Tools?</h2>
        <p>
          Custom tools are user-defined functions that agents can call during a task. Unlike skill prompts, which guide the AI model's reasoning,
          custom tools execute actual code or call external APIs and return structured results. They bridge OpenAnalyst's agents with your own
          internal systems, proprietary algorithms, and external data sources.
        </p>
        <p>
          A custom tool is defined by its name, a description the agent uses to decide when to call it, an input schema, an execution endpoint
          (a URL that OpenAnalyst calls with the tool inputs), and an output schema.
        </p>

        <h2>Tool Definition Format</h2>
        <p>
          Tools are defined using a JSON schema-based format. The definition is submitted via the API or through the custom tools editor in
          <strong>Settings &gt; Custom Tools</strong>.
        </p>
        <pre><code>{`{
  "name": "calculate_ltv",
  "description": "Calculate the predicted lifetime value for a customer segment based on cohort data. Call this when the user asks about LTV, customer value, or retention economics.",
  "input_schema": {
    "type": "object",
    "properties": {
      "segment_id": {
        "type": "string",
        "description": "The identifier of the customer segment."
      },
      "time_horizon_months": {
        "type": "integer",
        "description": "Number of months to project LTV over.",
        "default": 24
      }
    },
    "required": ["segment_id"]
  },
  "output_schema": {
    "type": "object",
    "properties": {
      "ltv": { "type": "number" },
      "confidence_interval": {
        "type": "object",
        "properties": {
          "lower": { "type": "number" },
          "upper": { "type": "number" }
        }
      }
    }
  },
  "endpoint": "https://your-service.internal/api/ltv",
  "auth": {
    "type": "bearer",
    "token_secret": "YOUR_SECRET_NAME"
  }
}`}</code></pre>
        <div className="callout callout-info">
          <p><strong>Note:</strong> The tool description is critical — it is what the agent reads to decide whether to invoke the tool. Write it in natural language that matches how users are likely to phrase requests related to the tool's function.</p>
        </div>

        <h2>Input and Output Schemas</h2>
        <p>
          Schemas use JSON Schema (Draft 7). Input schemas define the parameters the agent will populate when calling the tool.
          Output schemas tell OpenAnalyst how to interpret the response and how to present it to the agent for further reasoning.
        </p>
        <p>
          Keep output schemas as flat and typed as possible. Agents handle structured outputs (numbers, strings, arrays of objects) more reliably
          than deeply nested or loosely typed responses.
        </p>

        <h2>Registering Tools with Agents</h2>
        <p>
          Once a tool is saved, it must be explicitly enabled on the agents that should have access to it. This prevents tools from being invoked
          in contexts where they are not appropriate and limits the blast radius of misconfigured tools.
        </p>
        <ol className="step-list">
          <li>Open the agent editor for the agent that should use the tool.</li>
          <li>Navigate to the <strong>Custom Tools</strong> tab.</li>
          <li>Find the tool in the list and toggle it on.</li>
          <li>Optionally set a maximum number of calls per conversation to limit tool usage in single sessions.</li>
          <li>Save the agent configuration.</li>
        </ol>

        <h2>Sharing Tools Across the Workspace</h2>
        <p>
          Custom tools are workspace-scoped by default — any Admin or Owner can see and manage them. You can mark a tool as private to restrict
          visibility to yourself, or as shared to make it available for other workspace members to attach to their own agents.
        </p>
        <p>
          Shared tools include a usage log showing which agents called the tool, when, and what inputs were passed (subject to data retention settings).
          This log is useful for debugging and for auditing tool usage patterns.
        </p>

        <h2>Tool Versioning</h2>
        <p>
          OpenAnalyst tracks versions of tool definitions. When you update a tool's input schema, endpoint, or description, a new version is created
          and the previous version is archived. Agents pin to the tool version that was active when they were last saved, so updates to a tool do not
          automatically propagate to all agents — you must update each agent's tool reference to use the new version.
        </p>
        <pre><code>{`// Referencing a specific tool version via API
GET /api/v1/tools/calculate_ltv?version=3

// Updating an agent to use the latest version
PATCH /api/v1/agents/agent_abc123
{
  "tools": [
    { "tool_id": "calculate_ltv", "version": "latest" }
  ]
}`}</code></pre>
        <div className="callout callout-tip">
          <p><strong>Tip:</strong> Pin agents to specific tool versions in production to avoid unexpected behavior changes when tools are updated. Use the <code>latest</code> version specifier only in development and staging environments.</p>
        </div>
      </>
    ),
  },
};
