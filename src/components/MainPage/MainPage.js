import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css";
class MainPage extends Component {
  render() {
    return (
      <section className="mainPage">
        <section className="mainPageOverlay">
          <div className="movieInfo">
            <p>Już od 15 marca!</p>
            <h1>Wojownicy Solvro, Więzień KNSI</h1>
            <NavLink className="navlinkMain" exact to="/reservations">
              Kup bilet
            </NavLink>
            <div className="buttonbg" />
          </div>
        </section>
      </section>
    );
  }
}
export default MainPage;
