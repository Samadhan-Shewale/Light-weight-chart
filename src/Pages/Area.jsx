import { ColorType, createChart, AreaSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';

function Area() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const initialData = [
      { time: '2018-12-22', value: 32.51 },
      { time: '2018-12-23', value: 31.11 },
      { time: '2018-12-24', value: 27.02 },
      { time: '2018-12-25', value: 27.32 },
      { time: '2018-12-26', value: 25.17 },
      { time: '2018-12-27', value: 28.89 },
      { time: '2018-12-28', value: 25.46 },
      { time: '2018-12-29', value: 23.92 },
      { time: '2018-12-30', value: 22.68 },
      { time: '2018-12-31', value: 22.67 },
    ];

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'white' },
      },
      width: chartContainerRef.current.clinetWidth,
      height: 500,
    });

    const newSeries = chart.addSeries( AreaSeries,{
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41,98,225,0.28)',
    });

    newSeries.setData(initialData);
    chart.timeScale().fitContent();
    return () => chart.remove(); // cleanup
  }, []);

  return <div ref={chartContainerRef} >
    
    </div >;
}

export default Area;