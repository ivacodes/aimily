import React from "react";
import "./App.css";
//import { NotExtended } from "http-errors"; // don't know where this came from, I think it wasn't here in the beginning
import UserLogin from "./components/UserLogin";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: 0,
      userId: "",
      //currentStep: 1, //default step is 1 // was planning to split into components, but didn't have time so just ignore this
      name: "",
      email: "",
      goal: "",
      deadline: "",
      description: "",
      oneUserInfo: "", // this is a place that will contain all details about one user - name, goal, deadline
      userView: true, // tried to do a similar thing like admin/user view to show just a part of questions at once
      goalView: false, // managed to change the state on click but the divs with info don't change
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue = (e) => {
    //function that uodates state for each section based on the input
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  addNameAndEmail() {
    // function that adds email and name to user database as well as users_and_goals table
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
        this.changeView(true);
        //className={this.state.userView? 'userview': 'goalview'}
        //usercontainer.display;
        //goalconatiner.display: block;
      });
  }

  addGoalWithDeadlineAndDescription() {
    // function that adds goals with deadlines and description to goals database as well as users_and_goals database and displays infor about one user back on the screen
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
    })
      .then((res) => res.json())
      .then((goal) => {
        console.log(this.displayUserAndGoal());
        fetch("users_and_goals", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goal: this.state.goal,
            deadline: this.state.deadline,
            description: this.state.description,
          }),
        })
          .then((res) => res.json())
          .then((goal) => {
            console.log(this.displayUserAndGoal());
          })
          .then((goal) => {
            console.log(goal);
          });
      });
  }

  displayUserAndGoal() {
    // the function that displays users and details of his goal nack to the user
    const { name, goal, deadline, description, oneUserInfo } = this.state;

    this.setState({
      oneUserInfo: `Congratulations, ${name}! Your goal is set: ${goal}( ${description}) by ${deadline}`,
    });
  }

  isUserLoggedIn = async () => {
    try {
      const result = await fetch("users/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      let json = await result.json();
      //user is already logged in - populating state
      this.setState({
        userLoggedIn: 1,
        userId: json[0].id,
        name: json[0].name,
      });
      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = async () => {
    try {
      //check if user already logged in
      this.isUserLoggedIn();
    } catch (error) {
      console.log({ msg: error });
    }
  };

  render() {
    const {
      name,
      email,
      goal,
      deadline,
      description,
      oneUserInfo,
    } = this.state;

    return (
      <div className="container p-5 text-center">
        <UserLogin />
        {/* <div className="container rounded p-5" id="welcome">
          <h1>Welcome to Aimily!</h1>
          <h3> The app that will make your dreams come true!</h3>
        </div>
        <div className="container rounded mt-5 p-5" id="userview">
          <h2>What's your name?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              name="name"
              value={name}
              onChange={this.updateValue}
            />
          </div>
          <h2>What's your email address?</h2>
          <div className="form-inline mb-4 ">
            <input
              className="form-control flex-grow-1 mr-2"
              value={email}
              name="email"
              onChange={this.updateValue}
            />
          </div>

          <button
            className="btn btn-lg mb-4"
            onClick={(e) => this.addNameAndEmail()}
            //type="button"
            //data-toggle="collapse"
            //data-target="#goalview"
            //aria-expanded="true"
            //aria-controls="goalview"
          >
            Next!
          </button>
        </div>
        <div id="goalview">
          <div className="container rounded p-5 mt-5">
            <h2>What's your goal?</h2>
            <div className="form-inline mb-4">
              <input
                className="form-control flex-grow-1 mr-2"
                value={goal}
                name="goal"
                onChange={this.updateValue}
              />
            </div>
            <h2>By when do you want to achieve it?</h2>
            <div className="form-inline mb-4">
              <input
                className="form-control flex-grow-1 mr-2"
                value={deadline}
                name="deadline"
                onChange={this.updateValue}
              />
            </div>
            <h2>Add more details</h2>
            <div className="form-inline mb-4">
              <input
                className="form-control flex-grow-1 mr-2"
                value={description}
                name="description"
                onChange={this.updateValue}
              />
            </div>

            <button
              className="btn btn-lg mb-4"
              //type="button"
              //data-toggle="collapse"
              //data-target="#resultcontainer"
              //aria-expanded="false"
              //aria-controls="resultcontainer"
              onClick={(e) => this.addGoalWithDeadlineAndDescription()}
            >
              Let's get started!
            </button>
          </div>
        </div>
        <div className="container rounded mt-5 p-5" id="resultcontainer">
          <p>{oneUserInfo}</p>
        </div> */}
      </div>
    );
  }
}
