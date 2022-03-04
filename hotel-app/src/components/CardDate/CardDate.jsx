import React, {useCallback} from 'react';
//Import Style
import './CardDate.scss';

export const CardObj = {
  HOTEL_NAME: "Name",
  HOTEL_PRICE: "Price",
  HOTEL_City: "City",
}


export const cardVal = {
  UAE_CURRENCY: "AED",
}
const CardDate = (props) => {

  const showTitle = useCallback((title)=>{
    return <span className="card-title">{title}</span>
  },[])
  return (
    <div className="card-date__container">
      <div className="card--info">
        <span className="card--info__label" data-testid="name">{showTitle(CardObj.HOTEL_NAME)}: { props.name }</span>
        <span className="card--info__label" data-testid="price">{ showTitle(CardObj.HOTEL_PRICE) } : { props.price } {cardVal.UAE_CURRENCY}</span>
        <span className="card--info__label" data-testid="city">{ showTitle(CardObj.HOTEL_City) } : <span className="city-name">{ props.city }</span></span>
      </div>
    </div>
  )
}

export default CardDate;
