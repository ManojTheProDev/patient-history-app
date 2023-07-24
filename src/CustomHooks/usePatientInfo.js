import { useState, useEffect } from "react";

const usePatientInfo = (ageFilter) => {
  const [patientData, setPatientData] = useState([]);

  const fetchData = async () => {
    try {
      // Fetch patient data from the backend API based on age filter
      const response = await fetch(
        `https://hapi.fhir.org/baseR4/Patient?_pretty=true`
      );
      const data = await response.json();

      // Filter patients based on age
      console.log("data:::", data, ageFilter)
      const filteredData = data.entry.filter((item) => {
        console.log("item.resource:::::::::::", item.resource);
        console.log("item.resource:::::::::::", item.resource.birthDate);
        const birthDate = new Date(item.resource.birthDate);
        const ageDiffMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDiffMs); // miliseconds from epoch
        console.log(ageDate.getUTCFullYear() - 1970)
        // if(ageFilter.min === 0 && ageFilter.max === 100) return true;
        return (Math.abs(ageDate.getUTCFullYear() - 1970) >= ageFilter.min && Math.abs(ageDate.getUTCFullYear() - 1970) <= ageFilter.max);
      });
      setPatientData(filteredData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {

    fetchData();
  }, 500)
  return () => {
    clearTimeout(timer);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ageFilter]);

  return patientData;
};

export default usePatientInfo;
