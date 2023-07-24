import React, { useEffect, useState } from "react";
import usePatientInfo from "../CustomHooks/usePatientInfo";

// https://codesandbox.io/s/purple-pine-2u65l?expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.js&theme=dark

const DebounceFn = (cb, delay) => {
  let timer;
  return (...args) => {
    // let args = [...arguments];
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, delay);
  };
};

const PatientHistoryGraph = () => {
  const [ageFilter, setAgeFilter] = useState(0);
  const [patientData, setPatientData] = useState(usePatientInfo(ageFilter));
  console.log(ageFilter);

  //   const UpdatePatientData = async () => {
  //     const data = await usePatientInfo(ageFilter);
  //     setPatientData(data);
  //   };

  //   useEffect(() => {
  //     UpdatePatientData();
  //   }, [ageFilter]);

  //   const handleClick = (evt) => {
  //     let val = evt.target.value;
  //     // let timer;
  //     let debouncedAgeFilter = new DebounceFn(setAgeFilter(parseInt(val)), 500);
  //     debouncedAgeFilter();
  //   };

  return (
    <div>
      <div>
        <label>Filter by Age:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={ageFilter}
          //   onChange={(e) => setAgeFilter(parseInt(e.target.value))}
          onChange={(evt) =>
            DebounceFn(setAgeFilter(parseInt(evt.target.value)), 1500)
          }
        />
        <span>{ageFilter} years</span>
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
          {patientData && patientData?.length ? (
            patientData.map((entry) => (
              <tr key={entry.resource.id}>
                <td>{entry.resource.id}</td>
                <td>{entry.resource.name[0].given[0]}</td>
                <td>{entry.resource.gender}</td>
                <td>{entry.resource.birthDate}</td>
                <td>{entry.resource.address[0].text}</td>
                <td>{entry.resource.telecom[0].value}</td>
              </tr>
            ))
          ) : (
            <div>Loading Data...</div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistoryGraph;
