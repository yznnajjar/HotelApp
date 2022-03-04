import React from 'react'
import {render, fireEvent, act, screen} from '@testing-library/react'
import HotelDatePicker from './HotelDatePicker';
import {FROM, TO, SEARCH_HOTEL, SEARCH} from './HotelDatePicker'

console.log({FROM})

describe("Test Hotel Date Picker",()=>{
  test("Test Case To Check If Label Shows In Screen Or Not",()=>{
    render(<HotelDatePicker/>);

    screen.getByText(SEARCH_HOTEL);
    screen.getByText(TO);
    screen.getByText(FROM);
    screen.getByText(SEARCH);
  });
})
