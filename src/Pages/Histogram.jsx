import { createChart, BaselineSeries, ColorType, HistogramSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

function Histogram() {
  const chartContainerRef = useRef(null);

  useEffect(() => {

    const data = [
      { time: 1642425322, value: 1 },
      { time: 1642511722, value: 8 },
      { time: 1642598122, value: 10 },
      { time: 1642684522, value: 20 },
      { time: 1642770922, value: 3, color: 'red' },
      { time: 1642857322, value: 43 },
      { time: 1642943722, value: 41, color: 'red' },
      { time: 1643030122, value: 43 },
      { time: 1643116522, value: 56 },
      { time: 1643202922, value: 46, color: 'red' }
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

    const histogramSeries = chart.addSeries( HistogramSeries, { color: '#26a69a' });

    histogramSeries.setData(data);

    return () => chart.remove(); // cleanup
  }, []);

  return <div ref={chartContainerRef} />;
}

export default Histogram;