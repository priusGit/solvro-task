import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainPage.module.css";
class MainPage extends Component {
  render() {
    return (
      <section className={styles.mainPage}>
        <section className={styles.mainPageOverlay}>
          <div className={styles.movieInfo}>
            <p>Już od 15 marca!</p>
            <h1>Wojownicy Solvro, Więzień KNSI</h1>
            <NavLink className={styles.navlinkMain} exact to="/reservations">
              Kup bilet
            </NavLink>
            <div className={styles.buttonbg} />
          </div>
        </section>
      </section>
    );
  }
}
export default MainPage;
