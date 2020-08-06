import React, { Component } from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: " ",
      users: [],
      goals: [],
      /*name: " ",
      email:" ",
      goal: " ",
      deadline: " ",
      description: " ",
      */
    };
  }

  render() {
    return (
      <div className="container m-5 text-center bg-light">
        <h1>Welcome to Aimily!</h1>
        <h3> The app that will make your dreams come true!</h3>
        <h2>What's your name?</h2>
        <div className="form-inline mb-4">
          <input
            className="form-control flex-grow-1 mr-2"
            //value={input}
            //onChange={this.updateInput}
            //placeholder="Add task..."
          />
        </div>
        <h2>What's your email address?</h2>
        <div className="form-inline mb-4">
          <input className="form-control flex-grow-1 mr-2" />
        </div>
        <h2>What's your goal?</h2>
        <div className="form-inline mb-4">
          <input className="form-control flex-grow-1 mr-2" />
        </div>
        <h2>By when do you want to achieve it?</h2>
        <div className="form-inline mb-4">
          <input className="form-control flex-grow-1 mr-2" />
        </div>
        <button
          className="btn btn-info mb-4"
          //onClick={(e) => this.addTask()}
        >
          Let's get started!
        </button>
      </div>
    );
  }
}
