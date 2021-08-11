import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AppleIcon from '@material-ui/icons/Apple';
import { Link } from "react-router-dom";

import { Header, Nav, ListItem } from './Header.styled';

const HeaderComponent = () => {
  return (
    <Header>
      <Nav>
        <ListItem>
          <Link to="/">
            <HomeIcon fontSize="small" />Home
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/travel">
            <AirplanemodeActiveIcon fontSize="small" />Travel
          </Link>
        </ListItem>
        <ListItem>
          <Link to="/shop">
            <AppleIcon fontSize="small" />Shop
          </Link>
        </ListItem>
      </Nav>
    </Header>
  )
};

export default HeaderComponent;
