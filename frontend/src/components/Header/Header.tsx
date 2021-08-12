import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import AppleIcon from '@material-ui/icons/Apple';
import { Link } from 'react-router-dom';

import { Header, Nav, ListItem } from './Header.styled';

const HeaderComponent = () => {
  return (
    <Header>
      <Nav>
        <Link to="/">
          <ListItem>
            <HomeIcon fontSize="small" />
            Home
          </ListItem>
        </Link>

        <Link to="/travel">
          <ListItem>
            <AirplanemodeActiveIcon fontSize="small" />
            Travel
          </ListItem>
        </Link>
        <Link to="/shop">
          <ListItem>
            <AppleIcon fontSize="small" />
            Shop
          </ListItem>
        </Link>
      </Nav>
    </Header>
  );
};

export default HeaderComponent;
