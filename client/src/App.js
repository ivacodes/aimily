import React, { Component } from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      email: " ",
      goal: " ",
      deadline: " ",
      description: " ",
      oneUserInfo: [],
    };
  }
  // it didn't work so I went to back to my redundant update each state functions
  updateValue = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateName = (e) => {
    e.preventDefault();
    this.setState({
      name: e.target.value,
    });
  };

  updateEmail = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  };

  updateGoal = (e) => {
    e.preventDefault();
    this.setState({
      goal: e.target.value,
    });
  };

  updateDeadline = (e) => {
    e.preventDefault();
    this.setState({
      deadline: e.target.value,
    });
  };

  updateDescription = (e) => {
    e.preventDefault();
    this.setState({
      description: e.target.value,
    });
  };
  addNameAndEmail() {
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
      }),
    })
      .then((res) => res.json())

      .then((name) => {
        console.log(name);
      });
  }

  addGoalWithDeadlineAndDescription() {
    fetch("users/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        goal: this.state.goal,
        deadline: this.state.deadline,
        description: this.state.description,
      }),
    }).then((res) => res.json());
    //.then((goal) => {
    //console.log(this.displayUserAndGoal());
    //});
    //.then((goal) => {
    //  console.log(goal);
    //});
  }

  displayUserAndGoal() {
    fetch("users/users_and_goals", {
      method: "GET",
    }).then((res) => res.json());
  }
  componentDidMount = async () => {
    try {
      const res = await fetch("/");
      const name = await res.json();
      const email = await res.json();
      //this.setName({ name });
      //this.setEmail(email);
    } catch (error) {
      // upon failure, show error message
      console.log({ msg: error });
    }
  };

  render() {
    const { name, email, goal, deadline, description } = this.state;
    return (
      <div className="container p-5 text-center bg-dark">
        <div className="container rounded bg-light p-5">
          <h1>Welcome to Aimily!</h1>
          <h3> The app that will make your dreams come true!</h3>
        </div>
        <div className="container rounded bg-light mt-5 p-5">
          <h2>What's your name?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={name}
              onChange={this.updateName}
            />
          </div>
          <h2>What's your email address?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={email}
              onChange={this.updateEmail}
            />
          </div>

          <button
            className="btn btn-info btn-lg mb-4"
            onClick={(e) => this.addNameAndEmail()}
          >
            Next!
          </button>
        </div>
        <div className="container rounded bg-light mt-5 p-5">
          <h2>What's your goal?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={goal}
              onChange={this.updateGoal}
            />
          </div>
          <h2>By when do you want to achieve it?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={deadline}
              onChange={this.updateDeadline}
            />
          </div>
          <h2>Add more details</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={description}
              onChange={this.updateDescription}
            />
          </div>
          <button
            className="btn btn-info btn-lg mb-4"
            onClick={(e) => this.addGoalWithDeadlineAndDescription()}
          >
            Let's get started!
          </button>
        </div>
        <div className="container rounded bg-light mt-5 p-5">
          <h2>result</h2>
        </div>
      </div>
    );
  }
}
