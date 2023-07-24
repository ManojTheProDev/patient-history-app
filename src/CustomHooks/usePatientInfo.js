import { useState, useEffect } from "react";

const usePatientInfo = (ageFilter) => {
  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch patient data from the backend API based on age filter
        const response = await fetch(
          `https://hapi.fhir.org/baseR4/Patient?_pretty=true`
        );
        const data = await response.json();

        // Filter patients based on age
        const filteredData = data.entry.filter((entry) => {
          const birthDate = new Date(entry.resource.birthDate);
          const ageDiffMs = Date.now() - birthDate.getTime();
          const ageDate = new Date(ageDiffMs); // miliseconds from epoch
          return Math.abs(ageDate.getUTCFullYear() - 1970) === ageFilter;
        });

        setPatientData(filteredData);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, [ageFilter]);

  return patientData;
};

export default usePatientInfo;
