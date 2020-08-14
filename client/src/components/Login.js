import React, { Component } from "react";
// const bcrypt = require("bcryptjs");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      error: "",
    };
  }

  handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let user = this.state;
    // console.log(user);

    try {
      let result = await fetch(`/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      let json = await result.json();
      //response with token or without
      //if backend sent an authentication error and did not send a token back
      if (!json.token) {
        this.setState({
          error: json.errMessage,
        });
      } else {
        //response with token, set token in localstorage
        this.setState({
          error: "",
        });
        //save token in local storage
        localStorage.setItem("token", json.token);
        //after successful login, isUserLoggedIn will populate the state of the main app with user details from the DB
        this.props.isUserLoggedIn();
      }
    } catch (err) {
      console.log("error in login", err);
    }
  };

  render() {
    const { name, password, error } = this.state;
    return (
      <div>
        Login input
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={this.handleInputChange}
          ></input>
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={this.handleInputChange}
          ></input>
          <button type="submit">Login</button>
        </form>
        {error}
      </div>
    );
  }
}
