import React from "react";

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

// components
import Footer from "../../components/Footer/Footer";
import Sidebar from "../../components/Siderbar/Sidebar";
import Header from '../../components/Header/Header';
import { PageBody } from "../../components/PageBody/PageBody.styled";

// pages
import Home from "../Home/Home";
import Travel from "../Travel/Travel";
import Shop from "../Shop/Shop";

import "./App.css";
import { Main } from "./App.styled";

function App() {
  return (
    <Main>
      <Router>
        <Header></Header>
        <Sidebar></Sidebar>
        <Footer></Footer>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route path="/home">
            <PageBody><Home></Home></PageBody>
          </Route>
          <Route path="/travel">
            <PageBody><Travel></Travel></PageBody>
          </Route>
          <Route path="/shop">
            <PageBody><Shop></Shop></PageBody>
          </Route>
        </Switch>
      </Router>
    </Main>
  );
}

export default App;
