import React from "react";
import "./App.css";
import UserLogin from "./components/UserLogin";
import UserGoals from "./components/UserGoals";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLoggedIn: 0,
      userId: "",
      loginError: "",
    };
  }

  //logout button pressed
  userLoggedOut = async () => {
    console.log("token deleted, next clearing state");
    this.setState({
      userLoggedIn: 0,
      userId: "",
    });
  };

  isUserLoggedIn = async () => {
    //check if browser already has token
    let token = localStorage.getItem("token");
    if (token !== undefined) {
      try {
        const result = await fetch("users/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });
        let json = await result.json();
        //user is already logged in - populating state
        this.setState({
          userLoggedIn: 1,
          userId: json[0].id,
          name: json[0].name,
          loginError: "",
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      this.setState({
        userLoggedIn: 0,
        userId: "",
        name: "",
      });
    }
  };

  componentDidMount = async () => {
    try {
      //check if user already logged in
      this.isUserLoggedIn();
    } catch (err) {
      console.log({ msg: err });
    }
  };

  render() {
    const { name, userId, userLoggedIn, loginError } = this.state;

    return (
      <div className="container p-5 text-center">
        <div className="rounded p-5" id="welcome">
          <h1>Welcome to Aimily!</h1>
          <h3> The app that will make your dreams come true!</h3>
        </div>
        {userLoggedIn ? (
          <UserGoals
            userId={userId}
            name={name}
            userLoggedOut={this.userLoggedOut}
          />
        ) : (
          <UserLogin isUserLoggedIn={this.isUserLoggedIn} error={loginError} />
        )}
      </div>
    );
  }
}
