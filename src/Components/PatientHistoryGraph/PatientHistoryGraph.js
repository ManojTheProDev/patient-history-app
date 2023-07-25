import React, { useState } from "react";
import usePatientInfo from "../../CustomHooks/usePatientInfo";
import MultiRangeSlider from "../MultiRangeSlider";
import './patientHistoryGraph.css'

const PatientHistoryGraph = () => {
  const [ageFilter, setAgeFilter] = useState({min: 10, max: 20});
  const patientData = usePatientInfo(ageFilter);

  return (
    <div className="patient-history-wrapper">
      <div className="age-filter-wrapper">
        <div>Filter by age</div>
        <MultiRangeSlider min={0}
          max={100}
          onChange={setAgeFilter}
        />
      </div>
      <table className="patient-history-table">
        <thead className="patient-history-thead">
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
          {patientData && patientData?.length ? (
            patientData.map((entry) => {
              const {resource} = entry;
              const {id, name, gender, birthDate, address, telecom} = resource;
              let completeAddress = [];
              if(!!address && address?.length) {
                let add = address[0];
                completeAddress.push(add["line"]?.join(', '));
                completeAddress.push(`${add["city"]} - ${add["postalCode"]}`);
              }
              return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name?.[0]?.given[0]}</td>
                <td>{gender}</td>
                <td>{birthDate? new Date(birthDate).toDateString() : 'NA'}</td>
                <td>{completeAddress?.length ? completeAddress.map((i, index) => (<div key={index}>{i}</div>)) : ""}</td>
                <td>{telecom?.[0]?.value}</td>
              </tr>
            )})
          ) : (
            <tr><td>Loading Data...</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistoryGraph;
