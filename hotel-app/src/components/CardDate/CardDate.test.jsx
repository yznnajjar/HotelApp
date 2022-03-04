import React from 'react';
import {render, screen} from '@testing-library/react'
import CardDate from './CardDate';
import {CardObj, cardVal} from './CardDate'

describe("Test Cases For Card Date",()=>{
  test("Test Case To Check Labels",()=>{
    render(<CardDate/>)
    
    expect(screen.getByTestId("name").textContent).toBe(`${CardObj.HOTEL_NAME}: `)
    expect(screen.getByTestId("city").textContent).toBe(`${CardObj.HOTEL_City} : `)
    expect(screen.getByTestId("price").textContent).toBe(`${CardObj.HOTEL_PRICE} :  ${cardVal.UAE_CURRENCY}`)
  })
})