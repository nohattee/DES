import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Form from "./components/Form";

//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Form />
      </React.Fragment>
    );
  }
}

export default App;
