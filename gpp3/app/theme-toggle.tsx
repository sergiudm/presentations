'use client';

import {useEffect, useState} from 'react';
import {Moon, Sun} from 'lucide-react';
import {Toggle} from '@/components/ui/toggle';

const storageKey = 'agent-harness-theme';
type Theme = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    const sync = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const next = event.newValue === 'dark' ? 'dark' : 'light';
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const change = (light: boolean) => {
    const next: Theme = light ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try { localStorage.setItem(storageKey, next); } catch { /* Theme works when storage is unavailable. */ }
  };

  return <Toggle className="theme-toggle" pressed={theme === 'light'} onPressedChange={change}
    aria-label="Light mode" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
    {theme === 'light' ? <Sun size={18}/> : <Moon size={18}/>}
  </Toggle>;
}
