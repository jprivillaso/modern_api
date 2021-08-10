import React from 'react';

import PageBody from '../components/PageBody/PageBody';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Sidebar from '../components/Siderbar/Sidebar';

import './App.css';

import { Main } from './App.styled';

function App() {
  return (
    <Main>
      <Header></Header>
      <Sidebar></Sidebar>
      <Footer></Footer>
      <PageBody></PageBody>
    </Main>
  );
}

export default App;
