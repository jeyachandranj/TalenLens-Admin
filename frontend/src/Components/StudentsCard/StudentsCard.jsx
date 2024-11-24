import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LinearProgress, Box, Typography, Button } from "@mui/material";
import profile from "../../assets/profile.png";
import "./StudentsCard.css";

const StudentsCard = ({ hoveredData }) => {
  const { name = "Select a Student", mail = "--", exp = "--", company = "--" } = hoveredData || {};
  const [studentData, setStudentData] = useState({ score: 0, duration: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/average/scores");
        if (!response.ok) {
          throw new Error("Error fetching student data");
        }
        const data = await response.json();
        const currentStudent = data.find((item) => item.name === name);
        if (currentStudent) {
          setStudentData({
            score: currentStudent.averageScore || 0,
            duration: currentStudent.totalDuration || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (hoveredData?.name) {
      fetchStudentData();
    }
  }, [hoveredData?.name]);

  const handleOverviewClick = () => {
    navigate("/overview", { state: { hoveredData } });
  };

  return (
    <section className="StudentsCard-Container">
      <div className="StudentCard-content">
        <img src={profile} className="profile" alt="Profile" />
        <h1>{name}</h1>

        {/* Display Email, Experience, and Company */}
        <p className="email">Email: {mail}</p>
        <p className="experience">Experience: {exp}</p>
        <p className="company">Company: {company}</p>

        {/* Display Score */}
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            Score: {studentData.score}/10
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(studentData.score / 10) * 100} 
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#4caf50",
                borderRadius: 5,
              },
              "&.MuiLinearProgress-colorPrimary": {
                backgroundColor: "#e0e0e0",
              },
            }}
          />
        </Box>

        {/* Display Duration */}
        <Box sx={{ width: "100%", marginTop: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            Duration: {studentData.duration} minutes
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(studentData.duration / 500) * 100} 
            sx={{
              height: 8,
              borderRadius: 5,
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#2196f3",
                borderRadius: 5,
              },
              "&.MuiLinearProgress-colorPrimary": {
                backgroundColor: "#e0e0e0",
              },
            }}
          />
        </Box>

        {/* Overview Button */}
        <Box sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOverviewClick}
            sx={{
              width: "100px",
              borderRadius: 20,
              padding: "8px 15px",
              fontSize: "0.9rem",
            }}
          >
            Overview
          </Button>
        </Box>
      </div>
    </section>
  );
};

export default StudentsCard;
