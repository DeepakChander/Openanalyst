import { ReactNode } from 'react';

export interface DocPage {
  title: string;
  description: string;
  content: ReactNode;
}

export type ContentMap = Record<string, DocPage>;

export interface NavItem {
  title: string;
  slug: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}
