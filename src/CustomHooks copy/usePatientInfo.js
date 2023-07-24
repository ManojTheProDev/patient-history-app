import { useState, useEffect } from "react";

const usePatientInfo = (age) => {
  const [patientInfo, setPatientInfo] = useState([]);

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(
          `https://hapi.fhir.org/baseR4/Patient?_pretty=true&birthdate=ge${calculateBirthDate(
            age
          )}`
        );
        const data = await response.json();
        setPatientInfo(data.entry);
      } catch (error) {
        console.error("Error fetching patient information:", error);
      }
    };

    fetchPatientInfo();
  }, [age]);

  return patientInfo;
};

const calculateBirthDate = (age) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear() - age;
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  return `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;
};

export default usePatientInfo;
