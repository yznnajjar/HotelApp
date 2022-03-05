import React, {useCallback, useMemo, useState} from 'react';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
//Import Helpers Component
import Layout from '../../components/Layout'
import DateRangeIcon from '@mui/icons-material/DateRange';
//Import Style
import './HotelDatePicker.scss';

export const FROM         = "From:";
export const TO           = "To:";
export const SEARCH_HOTEL = "Search Hotel";
export const SEARCH       = "Search";


const HotelDatePicker = (props) => {
  
  //Component Methods
  const showDatePicker = useCallback((label, isStartDate = false) =>{
    const pickerValue = isStartDate ? new Date(props.startDate.toString()) : new Date(props.endDate.toString());
    
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <label className="label">{ label }</label>
        <DatePicker
            className='date-picker-test'
            toolbarTitle="Select A Date"
            inputFormat="dd MMM yyyy"
            minDate={isStartDate && Date.now()}
            value={pickerValue}
            onChange={ date => {
              if(isStartDate){
                props.setStartDate(date.toString());
              }else{
                props.setEndDate(date.toString());
              }
            } }
            renderInput={(params) => (
              <TextField
                
                {...params}
                inputProps={{ ...params.inputProps, placeholder: "Select A Date"}}
              />
            )}
            components={{
              OpenPickerIcon : DateRangeIcon
            }}
          />
      </LocalizationProvider>
    )
  },[props.startDate, props.endDate]);

  const showSearchButton = useMemo(() => {
    return (
      <div className="search-button__container">
        <button 
          className="search-button" 
          onClick={()=>{
            if(props.startDate && props.endDate){
              props.setIsSearchButtonClicked(true)
            }
          }}
        >
          { SEARCH }
        </button>
      </div>
    )
  }, [props.startDate, props.endDate])

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
