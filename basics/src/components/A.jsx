import React, { Component } from "react";

export default class A extends Component {
  constructor() {
    super();
    this.state = {
      count: 10,
    };
    console.log("constructor call");
  }

  inc = () => {
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count);
  };

  dec = () => {
    this.setState({ count: this.state.count - 1 });
    console.log(this.state.count);
  };

  componentDidMount() {
    console.log("componentDidMount Call");
  }

  componentDidUpdate() {
    console.log("componentDidUpdate Call");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount Call");
  }
  render() {
    console.log("render call");

    return (
      <>
        <h1>App Component</h1>
        <div>{this.state.count}</div>

        <button onClick={this.inc}>Inc</button>
        <button onClick={this.dec}>Dev</button>
      </>
    );
  }
}
