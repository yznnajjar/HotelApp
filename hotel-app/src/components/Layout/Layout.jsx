import React from 'react';
//Import Style
import './Layout.scss';

const Layout = (props) =>{
  return (
    <div className="hotel-layout--wrapper">
      <div className="hotel-listing__header">
        <div className="hotel-listing__header__icons">
          <span className="header--control"/>
          <span className="header--control"/>
          <span className="header--control"/>
        </div>
        <div className="header--title">{ props.title }</div>
      </div>
      <div className={props.className}>{props.children}</div>
    </div>
  )
}

export default Layout;
