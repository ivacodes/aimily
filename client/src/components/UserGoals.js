import React, { Component } from "react";

export default class UserGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      name: this.props.name,
      goals: [],
      newGoal: {
        goal: "",
        deadline: "",
        description: "",
        userId: this.props.userId,
      },
      newGoalCreated: 0,
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

  handleInputChange(event) {
    let newGoal = this.state.newGoal;
    newGoal[event.target.name] = event.target.value;
    this.setState({
      newGoal,
    });
  }

  stringParse = (text) => {
    // swap single quote for 2 single quotes because SQL
    // prettier-ignore
    return text.replace(/'/g, "''");
  };

  async addNewGoal(e) {
    const { newGoal } = this.state;
    const parsedGoal = newGoal;
    parsedGoal["goal"] = this.stringParse(newGoal.goal);
    parsedGoal["deadline"] = this.stringParse(newGoal.deadline);
    parsedGoal["description"] = this.stringParse(newGoal.description);

    e.preventDefault();
    console.log(parsedGoal);
    try {
      await fetch("/users/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(parsedGoal),
      });
    } catch (err) {
      console.log(err);
    }
    //refresh goals
    this.fetchGoals();
    this.clearInputFields();
  }

  clearInputFields() {
    this.setState({
      newGoal: {
        goal: "",
        deadline: "",
        description: "",
        userId: this.props.userId,
      },
      newGoalCreated: 1,
    });
  }
  logout(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    this.props.userLoggedOut();
  }

  componentDidMount() {
    this.fetchGoals();
  }

  render() {
    const { name, goals, newGoal, newGoalCreated } = this.state;
    const { goal, deadline, description } = newGoal;
    return (
      <div>
        <h2 id="hellouser" className="text-right rounded mt-n1">
          Hi, {name}!{" "}
          <button className="btn btn-lg" onClick={(e) => this.logout(e)}>
            Logout
          </button>{" "}
        </h2>
        <div className="rounded p-5 mt-3" id="goalview">
          <h2>What's your goal?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={goal}
              name="goal"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
          <h2>By when do you want to achieve it?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={deadline}
              name="deadline"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>
          <h2>Add more details</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={description}
              name="description"
              onChange={(e) => this.handleInputChange(e)}
            />
          </div>

          <button
            className="btn btn-lg mb-4"
            onClick={(e) => this.addNewGoal(e)}
          >
            Let's get started!
          </button>
          {newGoalCreated ? <h2> Your new goal is created! </h2> : null}
        </div>
        {/* visualize goals - this can be separated in a new component */}
        <div className="rounded mt-3 p-5" id="resultcontainer">
          {goals.map((goal) => {
            return (
              <div key={goal.id}>
                <div>Goal:{goal.goal}</div>
                <div>Deadline:{goal.deadline}</div>
                <div>Description:{goal.description}</div>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
