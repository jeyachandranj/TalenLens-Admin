import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import profile from '../assets/profile.png';
import Speedometer from '../Components/Spedometer';
import DetailsCard from '../Components/DetailsCard/DetailsCard';

const Overview = () => {
  const location = useLocation();

  // Use location state or fallback to default
  const studentData = location.state?.hoveredData || {
    name: "Select a Student",
    mail: "--",
    exp: "--",
    company: "--",
    score: 0, // Default score value
  };

  // State to store fetched score
  const [score, setScore] = useState(studentData.score);

  // Fetch the average score from the server
  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users/average/scores');
        if (!response.ok) {
          throw new Error('Failed to fetch scores');
        }
        const data = await response.json();

        // Find the current student's score or fallback
        const currentUser = data.find((user) => user.name === studentData.name);
        setScore(currentUser?.averageScore || studentData.score);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScore();
  }, [studentData.name, studentData.score]);

  const handleGenerateReport = async () => {
    try {
      if (!studentData.name || studentData.name === "Select a Student") {
        alert("Please select a valid student.");
        return;
      }
  
      // Make sure the URL matches the backend route
      const response = await fetch(
        `http://localhost:5000/api/users/export/conversations?name=${encodeURIComponent(studentData.name)}`,
        {
          method: 'GET',
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to generate PDF: ' + response.statusText);
      }
  
      // Handle the blob and download the PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `${studentData.name.replace(/ /g, '_')}_conversations.pdf`;
      document.body.appendChild(link);
      link.click();
  
      // Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
      alert('PDF generated successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF: ' + error.message);
    }
  };
  
  

  return (
    <>
      <section>
        <h1>Overview</h1>

        <div className="Overview-container">
          <div>
            {/* Profile Section */}
            <div className="Overview-Profile">
              <img src={profile} className="overview-profile-img" alt="Profile" />
              <div>
                <h1 className="profile-title">{studentData.name}</h1>
                <p style={{ marginLeft: "20px" }}>Email: {studentData.mail}</p>
                <p style={{ marginLeft: "20px" }}>Experience: {studentData.exp}</p>
                <p style={{ marginLeft: "20px" }}>Company: {studentData.company}</p>
              </div>
            </div>

            {/* Details Section */}
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <DetailsCard value={5} title={"Active Test"} />
              <DetailsCard value={score} title={"Total Score"} /> {/* Total Score */}
            </div>
          </div>

          {/* Statistical Report Section */}
          <div className="overview-statistics">
            <h1>Statistical Report</h1>
            <Speedometer value={score} /> {/* Pass fetched score */}

            {/* Generate Report Button */}
            <button
              onClick={handleGenerateReport}
              className="generate-report-btn"
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Generate Report
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
