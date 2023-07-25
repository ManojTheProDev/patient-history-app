import React from "react";
import "./App.css";
import Header from "./Components/Header";
import PatientContainer from "./Components/PatientContainer";
import './assets/style.css'

function App() {
  return (
    <div className="App">
      <Header />
      <PatientContainer />
    </div>
  );
}

export default App;
