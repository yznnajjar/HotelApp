import React from 'react';
import {render, screen} from '@testing-library/react'
import CardDate from './CardDate';
import {CARD_LABEL, CURRENCY} from '../../lib/helpers/constant'


describe("Test Cases For Card Date",()=>{
  test("Test Case To Check Labels",()=>{
    render(<CardDate/>)
    
    expect(screen.getByTestId("name").textContent).toBe(`${CARD_LABEL.HOTEL_NAME}: `)
    expect(screen.getByTestId("city").textContent).toBe(`${CARD_LABEL.HOTEL_City} : `)
    expect(screen.getByTestId("price").textContent).toBe(`${CARD_LABEL.HOTEL_PRICE} :  ${CURRENCY.UAE_CURRENCY}`)
  })
})