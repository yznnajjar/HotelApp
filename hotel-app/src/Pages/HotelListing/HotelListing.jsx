import axios from "axios";
import React, {useEffect, useMemo, useState} from 'react';
//Import Style
import './HotelListing.scss';
import CardDate from "../../Components/CardDate";

const HOTEL_LISTING = "Hotel Listing";
const PRICE_FILTER = "Price Filter";

const dataTest = [
  {
    "name": "Ramada Downtown Dubai",
    "price": "225",
    "city": "dubai",
    "available_on": "2022-09-25"
  },
  {
    "name": "Sheraton Mall of Emirates Hotel",
    "price": "325",
    "city": "dubai",
    "available_on": "2022-10-24"
  },
  {
    "name": "Emirates Grand Hotel Apartments",
    "price": "300",
    "city": "dubai",
    "available_on": "2022-10-27"
  }
]

const HotelListing = () => {
  const [hotelList, setHotelList] = useState([]);
  const [error, setError] = useState("");
  const [searchHotelName, setSearchHotelName] = useState("");

  useEffect(()=>{
    function fetchHotelList(){
      axios.get("https://run.mocky.io/v3/48244d7b-52e9-4b5f-b122-bd763e53fa5c")
        .then((res)=>{
          let test =JSON.stringify(res.data)
          console.log({test});
          // console.log(JSON.parse(test));
          setHotelList(JSON.parse(JSON.stringify(res.data)));
        })
        .catch((error)=>setError(error));
    }

    fetchHotelList();
  },[])

  console.log({hotelList});
  const showHeader = useMemo(() => {
    return (
      <div className="hotel-listing__header">
        <div className="hotel-listing__header__icons">
          <span className="header--control"/>
          <span className="header--control"/>
          <span className="header--control"/>
        </div>
        <div className="header--title">{ HOTEL_LISTING }</div>
      </div>
    )
  }, []);


  const showSortFilterAndTotalNights = useMemo(() => {
    return (
      <div className="card-container__header">
        <span className="total--nights">Total Nights: 5</span>
        <div className="sort--filter">
          <span>
            Sort By Name
          </span>
          <span>
            Sort By Price
          </span>
        </div>
      </div>
    )
  }, []);


  const renderCards = useMemo(() => {
    return (
      <div className="card-container__cards">
        { dataTest.map(card => (
          <CardDate
            name={ card.name }
            price={ card.price }
            city={ card.city }
          />
        )) }
      </div>
    )
  }, [dataTest.length]);

  const showHotelAppointmentCards = useMemo(() => {
    return (
      <div className="card-container">
        {/* Show Sort Filter With Total Nights */ }
        { showSortFilterAndTotalNights }

        { renderCards }
      </div>
    )
  }, []);

  const showSideFilter = useMemo(() => {
    return (
      <div className="hotel-listing__side-filter">
        <input
          type="search"
          placeholder="Hotel Name"
          className="search__hotel-name"
          onChange={ (e) => {
            setSearchHotelName(e.target.value)
          } }
          value={ searchHotelName }
        />

        <div className="range--filter">
          <span className="range--filter__label"> { PRICE_FILTER } </span>
          <input
            type="range"
            className="range--filter__action"
            min="0"
            max="100"
          />
        </div>
      </div>
    )
  }, [searchHotelName]);


  console.log({searchHotelName})
  return (
    <div className="hotel-listing__container">
      {/*Show Header*/ }
      { showHeader }
      <div className="hotel-listing__content">
        {/*Show Side Filter*/ }
        { showSideFilter }
        { showHotelAppointmentCards }
      </div>
    </div>
  )
}

export default HotelListing;
