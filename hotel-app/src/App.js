import {useEffect, useState} from "react";
import moment from 'moment';
//Import Helpers
import HotelDatePicker from './pages/HotelDatePicker'
import HotelListing from './pages/HotelListing'
//Import Style
import './App.scss';

const dataTest = [
  {
    "name": "Kempinski Hotel Mall of the Emirates",
    "price": "200",
    "city": "dubai",
    "available_on": "2022-10-21"
  },
  {
    "name": "Address Dubai Mall",
    "price": "250",
    "city": "dubai",
    "available_on": "2022-08-15"
  },
  {
    "name": "JW Marriott Marquis Hotel Dubai",
    "price": "225",
    "city": "dubai",
    "available_on": "2023-09-21"
  },
  {
    "name": "Hilton Dubai Al Habtoor City",
    "price": "275",
    "city": "dubai",
    "available_on": "2022-10-25"
  },
  {
    "name": "Sofitel Dubai Downtown",
    "price": "300",
    "city": "dubai",
    "available_on": "2022-09-20"
  },
  {
    "name": "Renaissance Downtown Hotel",
    "price": "200",
    "city": "dubai",
    "available_on": "2022-10-23"
  },
  {
    "name": "Sofitel Dubai Jumeirah Beach",
    "price": "250",
    "city": "dubai",
    "available_on": "2022-09-20"
  },
  {
    "name": "Ramada Downtown Dubai",
    "price": "225",
    "city": "dubai",
    "available_on": "2022-09-25"
  },
  {
    "name": "Sheraton Mall of the Emirates Hotel",
    "price": "325",
    "city": "dubai",
    "available_on": "2022-10-24"
  },
  {
    "name": "Emirates Grand Hotel Apartments",
    "price": "300",
    "city": "dubai",
    "available_on": "2022-10-27"
  },
]
const App = () => {
  const [startDate, setStartDate]                         = useState("");
  const [endDate, setEndDate]                             = useState("");
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);
  const [hotelList, setHotelList]                         = useState([]);
  const [heighestPrice, setHighestPrice]                  = useState(0);

  useEffect(()=>{
    if((!startDate && !endDate) || !isSearchButtonClicked) return;

    const availableDate = [];
    dataTest.forEach(item =>{
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
  console.log({heighestPrice});


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
