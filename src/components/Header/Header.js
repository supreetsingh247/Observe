import React from 'react';
import styles from './Header.css';

const Header = ({ test }) => {
  return (
    <div clasName="row">
      <div className="border col-sm-12">
        <span style={{ fontSize: '18px', color: 'grey' }}>CALLS</span>
        <div className="search">
          <input className="input" type="text" placeholder="Search through all calls" />
          <i className="fa fa-search" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default Header;