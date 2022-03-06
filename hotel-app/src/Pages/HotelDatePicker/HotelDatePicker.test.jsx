import React from 'react';
import moment from 'moment';
import {render, screen, fireEvent} from '@testing-library/react';
import HotelDatePicker from './HotelDatePicker';
import {FROM, TO, SEARCH_HOTEL, SEARCH} from '../../lib/helpers/constant';

const todayDate = moment().add(1, "day").format("DD MMM YYYY");
const afterTenMonth = moment().add(10, "months").format("DD MMM YYYY");

describe("Test Hotel Date Picker",()=>{
  test("Test Case To Check If Label Shows In Screen Or Not",()=>{
    render(
      <HotelDatePicker
        startDate={new Date(todayDate)}
        endDate={new Date(afterTenMonth)}
      />
    );

    screen.getByText(SEARCH_HOTEL);
    screen.getByText(TO);
    screen.getByText(FROM);
    screen.getByText(SEARCH);

    let datePickers =screen.getAllByRole("textbox");

    //Test From DatePicker
    expect(datePickers[0].getAttribute("placeholder")).toBe("Select A Date");
    expect(datePickers[0].getAttribute("value")).toBe(todayDate);
    //Test To DatePicker
    expect(datePickers[1].getAttribute("placeholder")).toBe("Select A Date");
    expect(datePickers[1].getAttribute("value")).toBe(afterTenMonth);
  });

  test("Test Case When Clicked On Search If SetIsSearchButton Called With True Value", ()=>{
    const setIsSearchButtonClicked = jest.fn();
    render(
      <HotelDatePicker
        startDate={new Date(todayDate)}
        endDate={new Date(afterTenMonth)}
        setIsSearchButtonClicked={setIsSearchButtonClicked}
      />
    );
    const searchButton = screen.getByRole("button");
    fireEvent.click(searchButton);
    expect(setIsSearchButtonClicked).toHaveBeenCalledWith(true);
  });
})
