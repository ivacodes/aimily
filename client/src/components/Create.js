import React, { Component } from "react";
const bcrypt = require("bcryptjs");
const saltRounds = 10;

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {},
      userCreated: 0,
    };
  }

  handleInputChange = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.value;

    this.setState({
      input,
    });
  };

  //check if form is filled correctly
  validate = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Please enter your name.";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email address.";
    }

    if (typeof input["email"] !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter valid email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (!input["confirmPassword"]) {
      isValid = false;
      errors["confirmPassword"] = "Please enter your confirm password.";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirmPassword"] !== "undefined"
    ) {
      if (input["password"] !== input["confirmPassword"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }
    this.setState({
      errors: errors,
    });
    return isValid;
  };

  //form is submitted, goes through validation first
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) {
      // console.log(this.state);
      let input = {};
      input["name"] = "";
      input["email"] = "";
      input["password"] = "";
      input["confirmPassword"] = "";
      this.setState({ input: input });
      console.log("form submitted");

      this.storeUser(this.state.input);
    }
  };

  storeUser = async (input) => {
    const { name, email, password } = input;
    // console.log(input.password);
    //encrypt password
    //this method doesn't check if username or email are already checked, that should be added
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      let newUser = {
        name: name,
        email: email,
        password: hash,
      };
      try {
        await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        this.setState({
          userCreated: 1,
        });
      } catch (err) {
        console.log("user exists", err.msg);
      }
      console.log("storing user", err);
    });
  };

  render() {
    const { input, errors, userCreated } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={this.handleInputChange}
              className="form-control"
              placeholder="Username"
            />

            <div className="text-danger">{errors.name}</div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address:</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={this.handleInputChange}
              className="form-control"
              placeholder="email"
            />

            <div className="text-danger">{errors.email}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={this.handleInputChange}
              className="form-control"
              placeholder="Password"
            />

            <div className="text-danger">{errors.password}</div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={this.handleInputChange}
              className="form-control"
              placeholder="Confirm password"
            />

            <div className="text-danger">{errors.confirmPassword}</div>
          </div>

          <input
            type="submit"
            value="Submit"
            className="btn btn-lg mb-4 ml-3"
          />
        </form>
        {userCreated ? (
          <div>User successfully created, please log in</div>
        ) : null}
      </div>
    );
  }
}
