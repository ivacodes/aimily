import React, { Component } from "react";
const bcrypt = require("bcryptjs");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
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
    console.log(user);

    try {
      let result = await fetch(`/users/${user.name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await result.json();
      bcrypt.compare(user.password, json[0].password, function (err, res) {
        if (res) {
          console.log("password correct");
        } else {
          console.log("password incorrect");
        }
      });

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { name, password } = this.state;
    return (
      <div>
        Login input
        <form onSubmit={this.handleSubmit}>
          <input
            name="name"
            value={name}
            required
            onChange={this.handleInputChange}
          ></input>
          <input
            name="password"
            value={password}
            required
            onChange={this.handleInputChange}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
