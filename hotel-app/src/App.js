import {useEffect, useState} from "react";
import axios from "axios";
import moment from 'moment';
//Import Helpers
import HotelDatePicker from './pages/HotelDatePicker'
import HotelListing from './pages/HotelListing'
//Import Style
import './App.scss';

const getNamesWithSpaces =(data) =>{
  const names = [];
  for(let i=1 ; i<data.length; i+= 4){
    names.push(JSON.parse(data[i].split(",")[0]))
  }
  return names;
}

const App = () => {
  const [apiDataResponse, setApiDataResponse]             = useState([]);
  const [startDate, setStartDate]                         = useState("");
  const [endDate, setEndDate]                             = useState("");
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [hotelList, setHotelList]                         = useState([]);
  const [heighestPrice, setHighestPrice]                  = useState(0);

  useEffect(()=>{
    axios.get('https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c').then(result=>{
      const removeSlashes = result.data.replace(/\\/ig, "")
      const nameWithSpace =getNamesWithSpaces(removeSlashes.split(":"));
      const removeSpaceFromName = result.data.replace(/\s/ig, "").match(/\{(.*?)\}/g);
      
      const convToObj = removeSpaceFromName.map((item, index) => ({...JSON.parse(item), name:nameWithSpace[index]}));
      setApiDataResponse(convToObj);
    }).catch(err=>{
      console.log({err});
    })
  },[])

  useEffect(()=>{
    if((!startDate && !endDate) || !isSearchButtonClicked) {
      return;
    }

    const availableDate = [];
    apiDataResponse.forEach(item =>{
      const isAvailableDateBetween = moment(item.available_on).isBetween(startDate, endDate, null, '[)')
      if(isAvailableDateBetween){
        availableDate.push(item);
      }
    })
   
    if(availableDate.length > 0){
      const cloneAvailableDate = [...availableDate].sort((a,b)=>b.price - a.price)[0]?.price;
      setHotelList(availableDate);
      setHighestPrice(cloneAvailableDate)
    }
    setIsSearchButtonClicked(false)
  },[isSearchButtonClicked]);

  return (
    <div className="App">
      <HotelDatePicker
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
        setIsSearchButtonClicked={setIsSearchButtonClicked}
      />
      <HotelListing
        startDate={startDate}
        endDate={endDate}
        data={hotelList}
        heighestPrice={heighestPrice}
        isSearchButtonClicked={isSearchButtonClicked}
      />
    </div>
  );
}

export default App;
