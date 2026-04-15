import axios from 'axios' ;

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials:true 
});


export const apiServices = {
    liveData : async(temp) =>{
        const responce = await api.get("/ohlc");
        console.log("Data received at api point.")
        console.log(responce.data);
        return responce.data;
    }
}