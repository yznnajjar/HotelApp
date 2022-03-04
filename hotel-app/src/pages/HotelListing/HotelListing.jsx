import React, {useCallback, useEffect, useMemo, useState} from 'react';
import axios from "axios";
import Layout from '../../components/Layout';
//Import Helpers
import CardDate from "../../components/CardDate";
import useDebounce from "../../lib/hooks/useDebounce";
//Import Style
import './HotelListing.scss';

export const HOTEL_LISTING      = "Hotel Listing";
export const PRICE_FILTER       = "Price Filter";
export const SORT_BY_NAME       = "Sort By Name";
export const SORT_BY_PRICE      = "Sort By Price";
export const TOTAL_NIGHTS       = "Total Nights";
export const SEARCH_PLACEHOLDER = "Hotel Name"



const HotelListing = (props) => {
  const [hotelList, setHotelList]             = useState([]);
  const [searchHotelName, setSearchHotelName] = useState("");
  const [priceValue, setPriceValue]           = useState(0)
  const [priceHotelList, setPriceHotelList]   = useState([]);
  
  const dSearchText  = useDebounce(searchHotelName, 500);
  const dbPriceValue = useDebounce(priceValue, 1000);

  console.log({dbPriceValue},{dSearchText});

  useEffect(()=>{
    if(props.data.length === 0) return;
    setHotelList(props.data);
  },[]);

  // onSearch called only when debounced search text changes
  useEffect(() => {
    if (!dSearchText) {
      setSearchHotelName("");
      setHotelList(props.data)
    }


    if (dSearchText && props.data.length) {
      const filteredData = hotelList.filter(item => item.name.includes(dSearchText))
      setHotelList(filteredData);
    }
  }, [dSearchText]);

  // //Effect When Price Filter Change 
  useEffect(()=>{
    if (!dbPriceValue) {
      setPriceValue(0);
      setHotelList(props.data)
    }


    if (dbPriceValue && props.data.length) {
      const isTherePrice = props.data.filter(item => +item.price < +dbPriceValue) || [];
      setHotelList([...isTherePrice])
    }
  },[dbPriceValue])

  useEffect(() => {
    if(props.data.length === 0) return;
    setHotelList(props.data);
  }, [props.data.length]);

  const handleSortByName = useCallback(() => {
    const sortHotelListByName = hotelList.sort((a, b) => a.name.localeCompare(b.name));
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

    return (
      <div className="card-container__cards">
        {hotelList.map((card, index) => (
          <CardDate
            key={ index }
            name={ card.name }
            price={ card.price }
            city={ card.city }
          />
        ))}
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
  }, [hotelList, priceHotelList, searchHotelName]);


  const showSideFilter = useCallback(() => {
    console.log("props.heighestPric", props.heighestPric)
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
            step="25"
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


  const showWhenContentIsEmpty = useMemo(()=>{
    if(!props.endDate && !props.startDate){
      return (
        <h2 className='empty__content'>You Should Choose Start Date And End Date</h2>
      )
    }

    if(!props.endDate || !props.startDate || props.data.length === 0){
      return (
        <h2 className='empty__content'>There No Hotel Available Between {props.startDate || "Start Date"} - {props.endDate || "End Date"}</h2>
      )
    }

    if(!props.isSearchButtonClicked && (props.endDate && props.startDate)){
      return (
        <h2 className='empty__content'>Press In Search Button So You Can Get The Result</h2>
      )
    }
  },[props.startDate, props.endDate]);


  return (
    <div className="hotel-listing__container">
      <Layout title={ HOTEL_LISTING }>
      {hotelList.length === 0 ? showWhenContentIsEmpty:(
        <div className="hotel-listing__content">
          {/*Show Side Filter*/ }
          { showSideFilter() }
          { showHotelAppointmentCards }
        </div>
      )}
        
      </Layout>
    </div>
  )
}

export default HotelListing;
