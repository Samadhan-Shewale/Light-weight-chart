import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

function Candlestick() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const data = [
        { time: 1642427876, open: 10.00, high: 10.63, low: 9.49, close: 9.55 },
        { time: 1642514276, open: 9.55, high: 10.30, low: 9.42, close: 9.94 },
        { time: 1642600676, open: 9.94, high: 10.17, low: 9.92, close: 9.78 },
        { time: 1642687076, open: 9.78, high: 10.59, low: 9.18, close: 9.51 },
        { time: 1642773476, open: 9.51, high: 10.46, low: 9.10, close: 10.17 },
        { time: 1642859876, open: 10.17, high: 10.96, low: 10.16, close: 10.47 },
        { time: 1642946276, open: 10.47, high: 11.39, low: 10.40, close: 10.81 },
        { time: 1643032676, open: 10.81, high: 11.60, low: 10.30, close: 10.75 },
        { time: 1643119076, open: 10.75, high: 11.60, low: 10.49, close: 10.93 },
        { time: 1643205476, open: 10.93, high: 11.53, low: 10.76, close: 11.40 }
      ];
    const chartOptions = { 
      layout: { 
        textColor : 'black', 
         background: { type: ColorType.Solid, color: 'white' }, 
      } };
    const chart = createChart( chartContainerRef.current, {
      ...chartOptions,
      width:chartContainerRef.current.clientWidth,
      height: 500,
    } );

    const candlestickSeries = chart.addSeries( CandlestickSeries, { 
      upColor: '#26a69a', 
      downColor: '#ef5350', 
      borderVisible: false, 
      wickUpColor: '#26a69a', 
      wickDownColor: '#ef5350' 
    });

    candlestickSeries.setData(data);
    
    return () => chart.remove(); // cleanup
  }, []);

  return <div ref={chartContainerRef} />;
}

export default Candlestick;