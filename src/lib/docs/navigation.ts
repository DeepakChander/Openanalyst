import type { NavSection } from './types';

export const docsNavigation: NavSection[] = [
  {
    title: '',
    items: [
      { title: 'Introduction', slug: '' },
      { title: 'Quick Start', slug: 'quick-start' },
      { title: 'Configuration', slug: 'config' },
      { title: 'Data Providers', slug: 'providers' },
      { title: 'Network & Security', slug: 'network' },
      { title: 'Enterprise', slug: 'enterprise' },
      { title: 'Troubleshooting', slug: 'troubleshooting' },
      { title: 'Browser Support', slug: 'browser-support' },
    ],
  },
  {
    title: 'Usage',
    items: [
      { title: 'Web App', slug: 'web-app' },
      { title: 'API', slug: 'api' },
      { title: 'IDE', slug: 'ide' },
      { title: 'Mobile', slug: 'mobile' },
      { title: 'Focus Mode', slug: 'focus-mode' },
      { title: 'Share & Export', slug: 'share' },
      { title: 'GitHub', slug: 'github' },
      { title: 'GitLab', slug: 'gitlab' },
    ],
  },
  {
    title: 'Configure',
    items: [
      { title: 'Analytics Tools', slug: 'tools' },
      { title: 'Rules & Alerts', slug: 'rules' },
      { title: 'AI Agents', slug: 'agents' },
      { title: 'AI Models', slug: 'models' },
      { title: 'Themes', slug: 'themes' },
      { title: 'Keyboard Shortcuts', slug: 'keybinds' },
      { title: 'Commands', slug: 'commands' },
      { title: 'Data Formatters', slug: 'formatters' },
      { title: 'Permissions', slug: 'permissions' },
      { title: 'Data Connectors', slug: 'connectors' },
      { title: 'Integrations', slug: 'integrations' },
      { title: 'API Configuration', slug: 'api-config' },
      { title: 'Agent Skills', slug: 'agent-skills' },
      { title: 'Custom Tools', slug: 'custom-tools' },
    ],
  },
  {
    title: 'Develop',
    items: [
      { title: 'SDK', slug: 'sdk' },
      { title: 'Server API', slug: 'server' },
      { title: 'Plugins', slug: 'plugins' },
      { title: 'Ecosystem', slug: 'ecosystem' },
    ],
  },
];
