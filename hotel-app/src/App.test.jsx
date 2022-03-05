import React from 'react';
import {render, screen} from '@testing-library/react'
import App from './App';
import {
  HOTEL_LISTING, 
  SEARCH_HOTEL
} from './lib/helpers/constant';

describe("Test Cases For App",()=>{
  test("Test Case To Check If Hotel Search And Hotel Listing Is Rendered In Screen",()=>{
    render(<App/>)

    screen.getByText(SEARCH_HOTEL);
    screen.getByText(HOTEL_LISTING);
    expect(screen.getAllByRole("textbox").length).toEqual(2);
  });
})