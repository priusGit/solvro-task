import React, { Component } from "react";
import "./Layout.css";
import Auxi from "../../hoc/Auxi";
class Layout extends Component {
  render() {
    return (
      <Auxi>
        <main>
          <div className="topbar">
            <ul>
              <li className="fake">fake</li>
              <li className="cinema">cinema</li>
            </ul>
          </div>
          {this.props.children}
        </main>
      </Auxi>
    );
  }
}

export default Layout;
