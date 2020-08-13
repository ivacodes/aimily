import React, { Component } from "react";
import Create from "./Create";
import Login from "./Login";

export default class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "",
    };
  }
  onButtonPress(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { selected } = this.state;
    return (
      <div>
        CREATE ACCOUNT OR LOG INTO EXISTING ACCOUNT
        <br />
        <button
          name="selected"
          value="login"
          onClick={(e) => this.onButtonPress(e)}
        >
          LOGIN
        </button>
        <button
          name="selected"
          value="create"
          onClick={(e) => this.onButtonPress(e)}
        >
          CREATE ACCOUNT
        </button>
        <div>
          {(() => {
            switch (selected) {
              case "login":
                return <Login isUserLoggedIn={this.props.isUserLoggedIn} />;
              case "create":
                return <Create />;
              default:
                return null;
            }
          })()}
        </div>
      </div>
    );
  }
}
