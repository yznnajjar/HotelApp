import React from 'react'
import {render, fireEvent, act, screen} from '@testing-library/react'
import HotelListing, {SEARCH_PLACEHOLDER} from './HotelListing';
import {HOTEL_LISTING, PRICE_FILTER, SORT_BY_NAME, SORT_BY_PRICE, TOTAL_NIGHTS} from './HotelListing';
import {CardObj,cardVal} from "../../components/CardDate/CardDate";

const dataTest = [
  {
    "name": "Kempinski Hotel Mall of the Emirates",
    "price": "200",
    "city": "dubai",
    "available_on": "2022-10-21"
  },
  {
    "name": "Address Dubai Mall",
    "price": "250",
    "city": "dubai",
    "available_on": "2022-08-15"
  },
  {
    "name": "JW Marriott Marquis Hotel Dubai",
    "price": "225",
    "city": "dubai",
    "available_on": "2023-09-21"
  },
  {
    "name": "Hilton Dubai Al Habtoor City",
    "price": "275",
    "city": "dubai",
    "available_on": "2022-10-25"
  },
  {
    "name": "Sofitel Dubai Downtown",
    "price": "300",
    "city": "dubai",
    "available_on": "2022-09-20"
  },
  {
    "name": "Renaissance Downtown Hotel",
    "price": "200",
    "city": "dubai",
    "available_on": "2022-10-23"
  },
  {
    "name": "Sofitel Dubai Jumeirah Beach",
    "price": "250",
    "city": "dubai",
    "available_on": "2022-09-20"
  },
  {
    "name": "Ramada Downtown Dubai",
    "price": "225",
    "city": "dubai",
    "available_on": "2022-09-25"
  },
  {
    "name": "Sheraton Mall of the Emirates Hotel",
    "price": "325",
    "city": "dubai",
    "available_on": "2022-10-24"
  },
  {
    "name": "Emirates Grand Hotel Apartments",
    "price": "300",
    "city": "dubai",
    "available_on": "2022-10-27"
  },
]

describe("Test Hotel Listing",()=>{
  test("Test Case For Labels And Titles",()=>{
    render(
      <HotelListing/>
    );


    screen.getByText(HOTEL_LISTING)
    screen.getByText(PRICE_FILTER)
    screen.getByText(SORT_BY_NAME)
    screen.getByText(SORT_BY_PRICE)
    screen.getByText(`${TOTAL_NIGHTS}: ${dataTest.length}`);
  })

  test("Test Case For Cards",()=>{
    render(<HotelListing/>);

    //Iterating Over Card And Check Name And City And Price
    dataTest.forEach((info,index)=>{
      expect(screen.getAllByTestId("name")[index].textContent).toBe(`${CardObj.HOTEL_NAME}: ${info.name}`)
      expect(screen.getAllByTestId("price")[index].textContent).toBe(`${CardObj.HOTEL_PRICE} : ${info.price} ${cardVal.UAE_CURRENCY}`)
      expect(screen.getAllByTestId("city")[index].textContent).toBe(`${CardObj.HOTEL_City} : ${info.city}`)
    })
  });

  test("Test Case For Sort Filter (Sort By Name)≈", async ()=>{
    render(<HotelListing/>);

    const sortByNameButton = screen.getByText("Sort By Name");

    const afterArrSorted = dataTest.sort((a, b) => a.name.localeCompare(b.name));
    await act(async()=>fireEvent.click(sortByNameButton));

    //Iterating Over Card Sorted By Name And Check Name And City And Price
    afterArrSorted.forEach((info,index)=>{
      expect(screen.getAllByTestId("name")[index].textContent).toBe(`${CardObj.HOTEL_NAME}: ${info.name}`)
      expect(screen.getAllByTestId("price")[index].textContent).toBe(`${CardObj.HOTEL_PRICE} : ${info.price} ${cardVal.UAE_CURRENCY}`)
      expect(screen.getAllByTestId("city")[index].textContent).toBe(`${CardObj.HOTEL_City} : ${info.city}`)
    })
  });

  test("Test Case For Sort Filter (Sort By Price)≈", async ()=>{
    render(<HotelListing/>);

    const sortByNameButton = screen.getByText("Sort By Price");

    const afterArrSorted = dataTest.sort((a, b) => a.price - b.price);
    await act(async()=>fireEvent.click(sortByNameButton));

    //Iterating Over Card Sorted By Name And Check Name And City And Price
    afterArrSorted.forEach((info,index)=>{
      expect(screen.getAllByTestId("name")[index].textContent).toBe(`${CardObj.HOTEL_NAME}: ${info.name}`)
      expect(screen.getAllByTestId("price")[index].textContent).toBe(`${CardObj.HOTEL_PRICE} : ${info.price} ${cardVal.UAE_CURRENCY}`)
      expect(screen.getAllByTestId("city")[index].textContent).toBe(`${CardObj.HOTEL_City} : ${info.city}`)
    })
  });

  test("Test Case When Search For Hotel Name",async ()=>{
    render(<HotelListing/>);

    const searchField = screen.getByRole("searchbox");

    expect(searchField.getAttribute("placeholder")).toBe(SEARCH_PLACEHOLDER)

    // change input
    await act(async ()=>{
      fireEvent.change(searchField, {target: {value: "Dubai"}});
    });

    expect(searchField.getAttribute("value")).toBe("Dubai");
  });


})
