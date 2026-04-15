import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { apiServices } from '../../services/api';
// import data from '../data/data';

function Candlestick() {
  const chartContainerRef = useRef(null);
  const [candlePrice, setCandlePrice ] = useState(null);
  const [ohlcData, setOhlcData ] = useState([]);
  
  const getData = async ()=>{
    try{
      const data = await apiServices.liveData("temp");
      console.log("Data set at component");
      console.log(data);
      setOhlcData(data);
    }catch(error ){
      console.log("Error happened while fetching ohlc data from server....");
    }

  }
  useEffect( ()=>{
    getData();
  },[]);

  useEffect(() => {
    
    if( !ohlcData || ohlcData.length === 0 ) return ;

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

    candlestickSeries.applyOptions( seriesOptions )

    console.log("Data before setting...");
    console.log(ohlcData);
    candlestickSeries.setData(ohlcData);

    chart.subscribeCrosshairMove( param => {
      if (param.time ){
        const data = param.seriesData.get(candlestickSeries);
        setCandlePrice( data );
        console.log(data.close)
      }
    });


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

  }, [ohlcData]); 

  const change = candlePrice?.close - candlePrice?.open || 0;
  const percentage = ((change / candlePrice?.open) * 100).toFixed(2) || 0;
  const isPositive = change >= 0;

  return (
    <div ref={chartContainerRef} style={{position : "relative"}} >
      <div 
        style={{
          position:"absolute",
          top:5,
          left: 10,
          zIndex:20,
          color:"white",
          display : "flex"
        }}
      >
        <div>Ethereum : 2024 &nbsp;</div>
        <div className={`flex items-center gap-3 text-sm font-medium ${
              isPositive ? "text-green-400" : "text-red-400"
            }`}>
            <div><span style={{color:'white'}}>O</span> {candlePrice?.open}</div>
            <div><span style={{color:'white'}}>H</span> {candlePrice?.high}</div>
            <div><span style={{color:'white'}}>L</span> {candlePrice?.low}</div>
            <div><span style={{color:'white'}}>C</span> {candlePrice?.close}</div>
            <div>
              {isPositive ? "+" : ""}
              {change.toFixed(2)} (
              {isPositive ? "+" : ""}
              {percentage}%)
            </div>
          </div>
      </div>
    </div>
  );
}

export default Candlestick;