class Step1 extends React.Component {
  render() {
    const { name, email, goal, deadline, description } = this.state;
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group container p-5 text-center bg-dark">
        <div className="container rounded bg-light p-5">
          <h1>Welcome to Aimily!</h1>
          <h3> The app that will make your dreams come true!</h3>
        </div>
        <div className="container rounded bg-light mt-5 p-5">
          <h2>What's your name?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={this.props.name}
              onChange={this.props.updateName}
            />
          </div>
          <label htmlFor="email"></label>
          <h2>What's your email address?</h2>
          <div className="form-inline mb-4">
            <input
              className="form-control flex-grow-1 mr-2"
              value={this.props.email}
              onChange={this.props.updateEmail}
            />
          </div>

          <button
            className="btn btn-info btn-lg mb-4"
            onClick={(e) => this.addNameAndEmail()}
          >
            Next!
          </button>
        </div>
      </div>
    );
  }
}
