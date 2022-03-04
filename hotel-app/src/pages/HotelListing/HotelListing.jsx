import React, {useCallback, useEffect, useMemo, useState} from 'react';
import moment from 'moment';
import axios from "axios";
import Layout from '../../components/Layout';
//Import Helpers
import CardDate from "../../components/CardDate";
import useDebounce from "../../lib/hooks/useDebounce";
//Import Style
import './HotelListing.scss';

export const HOTEL_LISTING = "Hotel Listing";
export const PRICE_FILTER = "Price Filter";
export const SORT_BY_NAME = "Sort By Name";
export const SORT_BY_PRICE = "Sort By Price";
export const TOTAL_NIGHTS = "Total Nights";
export const SEARCH_PLACEHOLDER = "Hotel Name"

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

const HotelListing = (props) => {
  const [hotelList, setHotelList] = useState("");
  const [error, setError] = useState("");
  const [searchHotelName, setSearchHotelName] = useState("");
  const [priceValue, setPriceValue] = useState(0)
  const [priceHotelList, setPriceHotelList] = useState([]);
  
  const dSearchText = useDebounce(searchHotelName, 500);
  const dbPriceValue = useDebounce(priceValue, 1000);

  // onSearch called only when debounced search text changes
  useEffect(() => {
    if (!dSearchText) {
      setSearchHotelName("");
      setHotelList(dataTest)
    }


    if (dSearchText) {
      setHotelList(prevArr => [...prevArr.filter(item => item.name.includes(dSearchText))])
    }
  }, [dSearchText]);

  // //Effect When Price Filter Change 
  useEffect(()=>{
    if (!dbPriceValue) {
      setPriceValue(0);
      setHotelList(dataTest)
    }


    if (dbPriceValue && hotelList.length) {
      const isTherePrice = hotelList.filter(item => +item.price < +dbPriceValue) || [];
      if(isTherePrice.length){
        setPriceHotelList(isTherePrice)
      }
    }
  },[dbPriceValue, hotelList.length])

  useEffect(() => {
    console.log("PUSH HOTEL LIST");
    setHotelList(dataTest);
  }, []);


  useEffect(()=>{
    if(hotelList.length === 0) return;

    setHotelList(dataTest);
    const availableDate = [];
    hotelList.forEach(item =>{
      const isAvailableDateBetween = moment(item.available_on).isBetween(props.startDate, props.endDate, null, '[)')
      if(isAvailableDateBetween){
        availableDate.push(item);
      }
    })
   
    if(availableDate.length > 0){
      setHotelList(availableDate);
    }else{
      setHotelList(dataTest);
    }
  },[props]);

  const handleSortByName = useCallback(() => {
    const sortHotelListByName = hotelList.sort((a, b) => a.name.localeCompare(b.name));
    console.log({sortHotelListByName});
    setHotelList([...sortHotelListByName])
  }, [hotelList, dbPriceValue]);

  const handleSortByPrice = useCallback(() => {
    const sortHotelListByPrice = hotelList.sort((a, b) => a.price - b.price);
    setHotelList([...sortHotelListByPrice])
  }, [hotelList, dbPriceValue]);


  const showSortFilterAndTotalNights = useMemo(() => {
    return (
      <div className="card-container__header">
        <span className="total--nights">{TOTAL_NIGHTS}: {hotelList.length}</span>
        <div className="sort--filter">
          <span onClick={ handleSortByName }>
            { SORT_BY_NAME }
          </span>
          <span
            onClick={ handleSortByPrice }
          >
            { SORT_BY_PRICE }
          </span>
        </div>
      </div>
    )
  }, [hotelList, dbPriceValue]);


  const renderCards = useMemo(() => {
    if (hotelList.length === 0) return;

    const cardsToShow = (priceHotelList.length || dbPriceValue)  ? priceHotelList : hotelList;

    return (
      <div className="card-container__cards">
        { cardsToShow.map((card, index) => (
          <CardDate
            key={ index }
            name={ card.name }
            price={ card.price }
            city={ card.city }
          />
        )) }
      </div>
    )
  }, [hotelList, priceHotelList, dbPriceValue]);

  const showHotelAppointmentCards = useMemo(() => {
    return (
      <div className="card-container">
        {/* Show Sort Filter With Total Nights */ }
        { showSortFilterAndTotalNights }

        { renderCards }
      </div>
    )
  }, [hotelList, priceHotelList]);


  const showSideFilter = useCallback(() => {
    return (
      <div className="hotel-listing__side-filter">
        <input
          type="search"
          placeholder={SEARCH_PLACEHOLDER}
          className="search__hotel-name"
          onChange={ (e) => {
            setSearchHotelName(e.target.value)
          } }
          value={ searchHotelName }
        />

        <div className="range--filter">
          <span className="range--filter__label"> { PRICE_FILTER }</span>
          <input
            type="range"
            className="range--filter__action"
            min="0"
            step="50"
            value={priceValue}
            max={"1000"}
            onInput={event=>{
              setPriceValue(event.target.value)
            }}
          />
          <p>{priceValue}</p>
        </div>
      </div>
    )
  }, [searchHotelName, priceValue, hotelList]);


  return (
    <div className="hotel-listing__container">
      <Layout title={ HOTEL_LISTING }>
        <div className="hotel-listing__content">
          {/*Show Side Filter*/ }
          { showSideFilter() }
          { showHotelAppointmentCards }
        </div>
      </Layout>
    </div>
  )
}

export default HotelListing;
