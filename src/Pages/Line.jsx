import { createChart,  ColorType, LineSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

function Line() {
  const chartContainerRef = useRef(null);

  useEffect(() => {

    const data = [
      { time: 1642425322, value: 0 },
      { time: 1642511722, value: 8 },
      { time: 1642598122, value: 10 },
      { time: 1642684522, value: 20 },
      { time: 1642770922, value: 3 },
      { time: 1642857322, value: 43 },
      { time: 1642943722, value: 41 },
      { time: 1643030122, value: 43 },
      { time: 1643116522, value: 56 },
      { time: 1643202922, value: 46 }
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

    const lineSeries = chart.addSeries( LineSeries,{ color: '#2962FF' });

    lineSeries.setData(data);
    chart.timeScale().fitContent();
    return () => chart.remove(); // cleanup
  }, []);

  return <div ref={chartContainerRef} />;
}

export default Line;