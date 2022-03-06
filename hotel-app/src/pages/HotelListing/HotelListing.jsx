import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
//Import Helpers
import Layout from '../../components/Layout';
import CardDate from "../../components/CardDate";
import useDebounce from "../../lib/hooks/useDebounce";
import {
  HOTEL_LISTING,
  PRICE_FILTER,
  SORT_BY_NAME,
  SORT_BY_PRICE,
  TOTAL_NIGHTS,
  SEARCH_PLACEHOLDER,
} from '../../lib/helpers/constant'
//Import Style
import './HotelListing.scss';

const HotelListing = (props) => {
  const [hotelList, setHotelList]             = useState([]);
  const [searchHotelName, setSearchHotelName] = useState("");
  const [priceValue, setPriceValue]           = useState(0)
  
  const dSearchText  = useDebounce(searchHotelName, 500);
  const dbPriceValue = useDebounce(priceValue, 1000);

  //Mount Data For Hotel Listing
  useEffect(()=>{
    setHotelList(props.data);
  },[]);

  // onSearch called only when debounced search text changes
  useEffect(() => {
    if (!dSearchText) {
      setSearchHotelName("");
      setHotelList(props.data)
    }


    if (dSearchText && props.data.length) {
      const filteredData = props.data.filter(item => item.name.includes(dSearchText))
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
      const isTherePrice = props.data.filter(item => +item.price <= +dbPriceValue) || [];
      setHotelList([...isTherePrice])
    }
  },[dbPriceValue])

  useEffect(() => {
    if(props.data.length === 0) return;
    setHotelList(props.data);
  }, [props.data.length]);

  const handleSortByName = useCallback(() => {
    if(hotelList.length === 1) return;
    
    const sortHotelListByName = hotelList.sort((a, b) => a.name.localeCompare(b.name));
    setHotelList([...sortHotelListByName])
  }, [hotelList, dbPriceValue]);

  const handleSortByPrice = useCallback(() => {
    //No Need To Call Sort If Array Has One Element
    if(hotelList.length === 1) return;

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
  }, [hotelList, dbPriceValue]);

  const showHotelAppointmentCards = useMemo(() => {
    return (
      <div className="card-container">
        {/* Show Sort Filter With Total Nights */ }
        { showSortFilterAndTotalNights }

        { renderCards }
      </div>
    )
  }, [hotelList, searchHotelName]);


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

HotelListing.propTypes = {
  data: PropTypes.array.isRequired
};

HotelListing.defaultProps = {
  data : []
}
export default HotelListing;
