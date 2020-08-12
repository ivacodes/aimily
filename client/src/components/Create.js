import React, { Component } from "react";

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validate()) {
      console.log(this.state);
      let input = {};
      input["name"] = "";
      input["email"] = "";
      input["password"] = "";
      input["confirm_password"] = "";
      this.setState({ input: input });

      alert("Form submitted");
    }
  };

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

    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] != input["confirm_password"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  render() {
    const { input, errors } = this.state;
    return (
      <div>
        Create user input
        <form onSubmit={this.handleSubmit}>
          <div class="form-group">
            <label for="name">Name:</label>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={this.handleInputChange}
              class="form-control"
              placeholder="Enter name"
              id="name"
            />

            <div className="text-danger">{errors.name}</div>
          </div>

          <div class="form-group">
            <label for="email">Email Address:</label>
            <input
              type="text"
              name="email"
              value={input.email}
              onChange={this.handleInputChange}
              class="form-control"
              placeholder="Enter email"
              id="email"
            />

            <div className="text-danger">{errors.email}</div>
          </div>

          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={this.handleInputChange}
              class="form-control"
              placeholder="Enter password"
              id="password"
            />

            <div className="text-danger">{errors.password}</div>
          </div>

          <div class="form-group">
            <label for="password">Confirm Password:</label>
            <input
              type="password"
              name="confirm_password"
              value={input.confirm_password}
              onChange={this.handleInputChange}
              class="form-control"
              placeholder="Enter confirm password"
              id="confirm_password"
            />

            <div className="text-danger">{errors.confirm_password}</div>
          </div>

          <input type="submit" value="Submit" class="btn btn-success" />
        </form>
      </div>
    );
  }
}
