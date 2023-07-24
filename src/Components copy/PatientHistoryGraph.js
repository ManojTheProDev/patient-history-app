import React, { useState } from "react";
import usePatientInfo from "../CustomHooks/usePatientInfo";

const PatientHistoryGraph = () => {
  const [age, setAge] = useState(30); // Default age to 30
  const patientInfo = usePatientInfo(age);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };
  console.log(patientInfo.map((patient) => console.log(patient.resource)));
  return (
    <div>
      <h1>Patient History Time Series Graph</h1>
      <div>
        <label htmlFor="ageSlider">Filter by Age:</label>
        <input
          type="range"
          id="ageSlider"
          name="ageSlider"
          min="0"
          max="100"
          value={age}
          onChange={handleAgeChange}
        />
        <span>{age} years</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>BirthDate</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {patientInfo?.length ? (
            patientInfo.map((patient) => (
              <tr key={patient.resource.id}>
                <td>{patient.resource.id}</td>
                <td>{patient.resource.name?.[0]?.given?.join(" ")}</td>
                <td>{patient.resource.gender}</td>
                <td>{patient.resource.birthDate}</td>
                <td>{patient.resource.address?.[0]?.city}</td>
                <td>{patient.resource.telecom?.[0]?.value}</td>
              </tr>
            ))
          ) : (
            <div>No data found, please try with different filter.</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistoryGraph;
