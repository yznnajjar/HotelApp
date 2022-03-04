import React from 'react';
import {render} from '@testing-library/react'
import Layout from './Layout';

describe("Test Cases For Layout",()=>{
  test("Test Case To Check Labels",()=>{
    const {container}= render(<Layout/>)
   
    //Test For Three Icons In Header
    expect(container.querySelectorAll(".header--control").length).toEqual(3);
    expect(container.querySelector(".header--title")).not.toBeNull();
  })
})