import React, { Component } from "react";
import styles from "./Layout.module.css";
import Auxi from "../../hoc/Auxi";
class Layout extends Component {
  render() {
    return (
      <Auxi>
        <main>
          <div className={styles.topbar}>
            <ul>
              <li className={styles.fake}>fake</li>
              <li className={styles.cinema}>cinema</li>
            </ul>
          </div>
          {this.props.children}
        </main>
      </Auxi>
    );
  }
}

export default Layout;
