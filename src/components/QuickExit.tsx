import { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldAlert } from 'lucide-react';

interface QuickExitProps {
  onTrigger: () => void;
}

export default function QuickExit({ onTrigger }: QuickExitProps) {
  const [visible, setVisible] = useState(true);

  // Listen for Escape key global shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onTrigger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTrigger]);

  if (!visible) return null;

  return (
    <aside
      aria-label="Safety exit options"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2"
    >
      <button
        type="button"
        onClick={onTrigger}
        title="Instantly leave this page and redirect to Google (Hotkey: ESC)"
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-2xl hover:shadow-rose-600/30 transition-all duration-200 border-2 border-white/40 cursor-pointer active:scale-95"
      >
        <ShieldAlert className="w-4 h-4 text-white" />
        <span className="text-xs font-bold tracking-wide">Quick Safety Exit</span>
        <kbd className="hidden sm:inline-block bg-black/20 text-[10px] px-1.5 py-0.5 rounded font-mono text-white/90">
          ESC
        </kbd>
        <ArrowUpRight className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>
    </aside>
  );
}
