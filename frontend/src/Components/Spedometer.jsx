import React from "react";

const Speedometer = ({ value }) => {
  // Maximum value for the speedometer
  const maxValue = 10;

  // Calculate the radius and circumference of the half circle (semi-circle)
  const radius = 80; // Radius of the circle
  const circumference = Math.PI * radius; // Half circumference for a semi-circle

  // Calculate the length of the active stroke based on the value (fills half the circle)
  const activeLength = (value / maxValue) * circumference;

  // Speedometer size properties
  const strokeWidth = 12; // Width of the circle stroke
  const svgWidth = 250; // Width of the SVG
  const svgHeight = 150; // Height of the SVG

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <svg width={svgWidth} height={svgHeight}>
        {/* Gradient for the active arc */}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#00BFFF", stopOpacity: 1 }} /> {/* Deep Sky Blue */}
            <stop offset="100%" style={{ stopColor: "#1E90FF", stopOpacity: 1 }} /> {/* Dodger Blue */}
          </linearGradient>
        </defs>

        {/* Background circle (half circle) */}
        <circle
          cx={svgWidth / 2}
          cy={svgHeight - 20}
          r={radius}
          fill="none"
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
        />
        
        {/* Active arc (single arc for the value) */}
        <circle
          cx={svgWidth / 2}
          cy={svgHeight - 20}
          r={radius}
          fill="none"
          stroke="url(#grad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference} // Full circumference for the semi-circle
          strokeDashoffset={circumference - activeLength} // Adjusted for active arc
          transform={`rotate(180 ${svgWidth / 2} ${svgHeight - 20})`} // Rotate to start from top
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />

        {/* Display value in the center */}
        <text
          x="50%"
          y={svgHeight - 20}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="25"
          fill="#000"
        >
          {value}/10
        </text>
      </svg>
    </div>
  );
};

export default Speedometer;
