import React, {useMemo} from 'react';
//Import Style
import './HotelListing.scss';

const HOTEL_LISTING = "Hotel Listing";

const HotelListing = () => {

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

      </div>
    )
  }, [])
  const showHotelAppointmentCards = useMemo(() => {
    return (
      <div className="card-container">
        {/* Show Sort Filter With Total Nights */ }
        {showSortFilterAndTotalNights}
      </div>
    )
  }, []);

  return (
    <div className="hotel-listing__container">
      {/*Show Header*/ }
      { showHeader }
      <div className="hotel-listing__content">
        <div className="content--side__filter">
          HEY
        </div>
        { showHotelAppointmentCards }
      </div>
    </div>
  )
}

export default HotelListing;
