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
      userCreationError: 0,
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
      var pattern = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
      if (!pattern.test(input["email"])) {
        isValid = false;
        errors["email"] = "Please enter a valid email address.";
      }
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }

    if (!input["confirmPassword"]) {
      isValid = false;
      errors["confirmPassword"] = "Please reenter your password.";
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
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      let newUser = {
        name: name,
        email: email,
        password: hash,
      };
      try {
        const response = await fetch("/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        const json = await response.json();
        console.log(json);
        if (json.msg === "ok") {
          this.setState({
            userCreated: 1,
            userCreationError: 0,
          });
        } else {
          this.setState({ userCreationError: 1, userCreated: 0 });
        }
      } catch (err) {
        console.log("user exists", err);
      }
      console.log("storing user", err);
    });
  };

  render() {
    const { input, errors, userCreated, userCreationError } = this.state;
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

            <div className="text-warning">{errors.name}</div>
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

            <div className="text-warning">{errors.email}</div>
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

            <div className="text-warning">{errors.password}</div>
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

            <div className="text-warning">{errors.confirmPassword}</div>
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
        {userCreationError ? (
          <div>User with the same name or email address already exists</div>
        ) : null}
      </div>
    );
  }
}
