import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Navbar from './component/Navbar';
import Area from './Pages/Area';
import BaseLine from './Pages/BaseLine';
import Bar from './Pages/Bar';
import Candlestick from './Pages/Candlestick';
import Histogram from './Pages/Histogram';
import Line from './Pages/Line';

export default function App() {
  
  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={ <Home />}  />
            <Route path="/area" element={ <Area />} />
            <Route path="/baseline"  element={ <BaseLine />}/>
            <Route path="/bar" element={ <Bar />} />
            <Route path="/candlestick" element={ <Candlestick />} />
            <Route path="/histogram" element={ <Histogram />} />
            <Route path="/line" element={ <Line />} />
            <Route path="*"  element={ <Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
