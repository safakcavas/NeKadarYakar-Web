import Link from 'next/link';
import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-600/30 group-hover:bg-blue-700 transition-colors">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold tracking-tight text-slate-800 text-lg sm:text-xl transition-colors">
            Ne Kadar <span className="text-blue-600">Yakar?</span>
          </span>
        </Link>
        <nav className="flex gap-4 sm:gap-6 font-medium text-sm text-slate-600">
          <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">Hesapla</Link>
          <a href="#" className="flex items-center gap-1.5 opacity-60 cursor-not-allowed hidden sm:flex">
             Tüm Araçlar 
             <span className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-bold uppercase tracking-wider">Yakında</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
