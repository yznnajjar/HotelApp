import React, {useCallback, useMemo} from 'react';
import moment from 'moment';
//Import Helpers Component
import Layout from '../../components/Layout'
//Import Style
import './HotelDatePicker.scss';

const FROM = "From:";
const TO = "To:";
const SEARCH_HOTEL = "Search Hotel";
const SEARCH = "Search";

const todayDate = moment().format("YYYY-MM-DD");
const tomorrowDate = moment().add(1, "day").format("YYYY-MM-DD");
const HotelDatePicker = (props) => {
  //Methods
  const showDatePicker = useCallback((label, isStartDate = false) => {
    return (
      <div className="date-picker__field">
        <label className="label">{ label }</label>
        <input
          type="date"
          className="date-picker"
          placeholder="Date"
          data-date=""
          data-date-format="DD MMM YYYY"
          min={ isStartDate ? todayDate : tomorrowDate }
          onChange={ e => {
            if (isStartDate) {
              props.setStartDate(e.target.value);
            } else {
              props.setEndDate(e.target.value);
            }
          } }
        />
      </div>
    )
  }, []);

  const showSearchButton = useMemo(() => {
    return (
      <div className="search-button__container">
        <button className="search-button">
          { SEARCH }
        </button>
      </div>
    )
  }, [])

  return (
    <div className="hotel-date-picker__wrapper">
      <Layout title={ SEARCH_HOTEL }>
        <div className="date-picker__container">
          {/*Show From Date Picker*/ }
          { showDatePicker(FROM, true) }
          {/*Show From Date Picker*/ }
          { showDatePicker(TO) }
          {/* Show Search Button */ }
          { showSearchButton }
        </div>
      </Layout>
    </div>
  )

}

export default HotelDatePicker;
