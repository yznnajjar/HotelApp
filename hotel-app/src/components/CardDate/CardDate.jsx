import React, {useCallback} from 'react';
//Import Helpers
import {CARD_LABEL, CURRENCY} from '../../lib/helpers/constant'
//Import Style
import './CardDate.scss';


const CardDate = (props) => {

  const showTitle = useCallback((title)=>{
    return <span className="card-title">{title}</span>
  },[])
  return (
    <div className="card-date__container">
      <div className="card--info">
        <span className="card--info__label" data-testid="name">{showTitle(CARD_LABEL.HOTEL_NAME)}: { props.name }</span>
        <span className="card--info__label" data-testid="price">{ showTitle(CARD_LABEL.HOTEL_PRICE) } : { props.price } {CURRENCY.UAE_CURRENCY}</span>
        <span className="card--info__label" data-testid="city">{ showTitle(CARD_LABEL.HOTEL_City) } : <span className="city-name">{ props.city }</span></span>
      </div>
    </div>
  )
}

export default CardDate;
