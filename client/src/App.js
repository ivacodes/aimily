import React from "react";
import "./App.css";
//import { NotExtended } from "http-errors"; // don't know where this came from, I think it wasn't here in the beginning

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  changeView() {
    // this function works and it's updates the view but I couldn't connect it with actual divs
    const { userView, goalView } = this.state;
    this.setState({
      goalView: true,
      userView: false,
    });
    /* my tries to make 3 screens and show them one by one, please just ignore the commented out part 
    if (showHide) {
      "#userview".addClass(hidden);
    } else {
      "#goalview".removeClass(hidden);
    }
*/
    //className = { this.state.userView: "userview": "goalview" };
  }
  //<button onClick={() => this.changeUser(true)} className={this.state.adminView? 'button-clicked': 'button-normal'}>ADMIN</button>
  //{...this.changeView(true)}
  //className={this.state.userView ? "usercontainer" : "goalcontainer"}
  /*
  showHideDiv(div) {
    var srcElement = document.getElementById(div);
    if (srcElement != null) {
      if (srcElement.style.display == "block") {
        srcElement.style.display = "none";
      } else {
        srcElement.style.display = "block";
      }
      return false;
    }
  }
*/

  componentDidMount = async () => {
    try {
      const res = await fetch("/");
      const name = await res.json();
      const email = await res.json();
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
        <div className="container rounded p-5" id="welcome">
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
        </div>
      </div>
    );
  }
}
