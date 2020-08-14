import React, { Component } from "react";

export default class UserGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      name: this.props.name,
      goals: [],
    };
  }

  async fetchGoals() {
    const { userId } = this.state;
    try {
      const result = await fetch(`users/goals/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      const json = await result.json();

      this.setState({
        goals: json,
      });
    } catch (err) {}
  }
  componentDidMount() {
    this.fetchGoals();
  }

  render() {
    const { name, goals } = this.state;
    return (
      <div>
        <button className="btn btn-lg">Logout</button>
        <br />
        user is logged in, show message to user, see goals, add goals
        <br />
        Hi, {name}! Add a new goal
        <div>
          {goals.map((goal) => {
            return (
              <div key={goal.id}>
                <div>Goal:{goal.goal}</div>
                <div>Deadline:{goal.deadline}</div>
                <div>Description:{goal.description}</div>
                <div></div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
