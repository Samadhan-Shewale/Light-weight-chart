import React from 'react';
import { Link } from 'react-router-dom';
import {  TrendingUp, LayoutDashboard, FileText, Info, HelpCircle } from 'lucide-react';

function Navbar( ){
    const navLinks = [
    { name: 'Home', path: '/', icon: LayoutDashboard },
    { name: 'Area', path: '/area', icon: LayoutDashboard },
    { name: 'BaseLine', path: '/baseline', icon: TrendingUp },
    { name: 'Bar', path: '/bar', icon: FileText },
    { name: 'CandleStick', path: '/candlestick', icon: HelpCircle },
    { name: 'Histogram', path: '/histogram', icon: Info },
    { name: 'Line', path: '/line', icon: Info },
  ];

    return (
    <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all `}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
    )
}

export default Navbar ;