import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import data from '../data/data';

function Candlestick() {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chartOptions = {
        layout: {
            background: { type: ColorType.Solid, color: '#222' },
            textColor: '#DDD',
        },
        grid: {
            vertLines: { color: '#444' },
            horzLines: { color: '#444' },
        },
        width:chartContainerRef.current.clientWidth,
        height: 500,
        localization: {
          priceFormatter: (price)=> {
            const myPrice =  Intl.NumberFormat( "en-US", {
                style : "currency",
                currency : "USD"
            }).format(price) 

            return myPrice
          },
        },
    }; 
    
    const chart = createChart( chartContainerRef.current );
    chart.applyOptions( chartOptions );
    
    // Setting the border color for the vertical axis
    chart.priceScale("right").applyOptions({
        borderColor: '#71649C',
        visible : true
    });

    // chart.priceScale("left").applyOptions({
    //     borderColor: '#71649C',
    //     visible : true
    // });

    // Setting the border color for the horizontal axis
    chart.timeScale().applyOptions({
        borderColor: '#71649C',
        rightOffset : 30,
        barSpacing: 10,
        minBarSpacing:3,
        fixLeftEdge : true,
        timeVisible : true
    });

    const candlestickSeries = chart.addSeries( CandlestickSeries );
    const seriesOptions = { 
      upColor: 'rgb(54, 116, 217)', 
      downColor:'rgb(225, 50, 85)',
      borderVisible: false, 
      wickUpColor: 'rgb(54, 116, 217)',
      wickDownColor: 'rgb(225, 50, 85)',
    }

    chart.applyOptions( seriesOptions )

    candlestickSeries.setData(data);

    const handleResize = ()=>{
      chart.applyOptions({
        width : chartContainerRef.current.clientWidth,
      })
    }
    window.addEventListener('resize', handleResize );
    
    return () => {
      window.removeEventListener('resize', handleResize );
      chart.remove();
    }; // cleanup

  }, []); 

  return <div ref={chartContainerRef} />;
}

export default Candlestick;