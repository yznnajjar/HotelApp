import React, {useCallback} from 'react';
//Import Style
import './CardDate.scss';

const CardObj = {
  HOTEL_NAME: "Name",
  HOTEL_PRICE: "Price",
  HOTEL_City: "City",
}


const cardVal = {
  UAE_CURRENCY: "AED",
}
const CardDate = (props) => {
  return (
    <div className="card-date__container">
      <div className="card--info">
        <span className="card--info__label">{ CardObj.HOTEL_NAME } : { props.name }</span>
        <span className="card--info__label">{ CardObj.HOTEL_PRICE } : { props.price } {cardVal.UAE_CURRENCY}</span>
        <span className="card--info__label">{ CardObj.HOTEL_City } : <span className="city-name">{ props.city }</span></span>
      </div>
    </div>
  )
}

export default CardDate;
