import axios from "axios";
import React, {useCallback, useEffect, useMemo, useState} from 'react';
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

const HotelListing = () => {
  const [hotelList, setHotelList] = useState("");
  const [error, setError] = useState("");
  const [searchHotelName, setSearchHotelName] = useState("");

  const dSearchText = useDebounce(searchHotelName, 1000);

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

  useEffect(() => {
    setHotelList(dataTest);
  }, [])

  const handleSortByName = useCallback(() => {
    const sortHotelListByName = hotelList.sort((a, b) => a.name.localeCompare(b.name));
    setHotelList([...sortHotelListByName])
  }, [hotelList]);

  const handleSortByPrice = useCallback(() => {
    const sortHotelListByPrice = hotelList.sort((a, b) => a.price - b.price);
    setHotelList([...sortHotelListByPrice])
  }, [hotelList]);


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
  }, [hotelList]);


  const renderCards = useMemo(() => {
    if (hotelList.length === 0) return;

    return (
      <div className="card-container__cards">
        { hotelList.map((card, index) => (
          <CardDate
            key={ index }
            name={ card.name }
            price={ card.price }
            city={ card.city }
          />
        )) }
      </div>
    )
  }, [hotelList]);

  const showHotelAppointmentCards = useMemo(() => {
    return (
      <div className="card-container">
        {/* Show Sort Filter With Total Nights */ }
        { showSortFilterAndTotalNights }

        { renderCards }
      </div>
    )
  }, [hotelList]);

  const showSideFilter = useMemo(() => {
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


  return (
    <div className="hotel-listing__container">
      <Layout title={ HOTEL_LISTING }>
        <div className="hotel-listing__content">
          {/*Show Side Filter*/ }
          { showSideFilter }
          { showHotelAppointmentCards }
        </div>
      </Layout>
    </div>
  )
}

export default HotelListing;
