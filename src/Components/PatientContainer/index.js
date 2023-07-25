import React from "react";
import PatientHistoryGraph from "../PatientHistoryGraph/PatientHistoryGraph";

const PatientContainer = () => {
    return (
        <section className="patient-container">
            <div className="patient-wrapper">
                <div className="patient-search-wrapper">
                    <div className="patient-search">
                        <span className="icon-search"></span>
                        <input type="text" placeholder="This is placeholder search" />
                    </div>
                    <div className="doctor-info">
                        <span className="icon-doctor">
                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span>
                        </span>
                        <span className="doctor-action icon-down"></span>
                    </div>
                </div>
                <div className="patient-search-wrapper">
                    <h4>Patient List</h4>
                    <div className="record-wrapper">
                        <span className="icon-user"></span>
                        <div>5:13:34</div>
                        <span className="icon-stop"></span>
                        <span className="icon-three-dots"></span>
                    </div>
                </div>
            </div>
            <PatientHistoryGraph />
        </section>
    )
}

export default PatientContainer