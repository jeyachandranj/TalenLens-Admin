import React, { useState, useEffect } from "react";
import TableCard from "./TableCard"; // Ensure TableCard is properly imported
import "./StudentsTable.css";

const StudentsTable = ({ setHoveredData }) => {
  const [selectedData, setSelectedData] = useState(null); // Track selected row data
  const [hoveredData, setHoveredDataState] = useState(null); // Track currently hovered row
  const [datas, setDatas] = useState([]); // State to hold fetched data

  // Fetch unique names from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/unique/names");
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        
        const formattedData = data.map((name) => ({
          name,
          mail: `${name.replace(/\s+/g, '').toLowerCase()}@gmail.com`, // Default mail ID
          exp: "0 Years",       // Default experience
          company: "Zeone",     // Default company name
        }));
        setDatas(formattedData);
      } catch (error) {
        console.error("Error fetching unique names:", error); // Log errors
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (item) => {
    setSelectedData(item); // Set the clicked row as selected
    setHoveredData && setHoveredData(item); // Update the parent component if needed
  };

  const handleMouseEnter = (item) => {
    setHoveredDataState(item); // Temporarily track the hovered row
  };

  const handleMouseLeave = () => {
    setHoveredDataState(null); // Clear the hovered row when the mouse leaves
  };

  return (
    <div className="tableWithCard">
      <section className="Table-Container">
        {/* Table Header */}
        <div className="tableHead">
          <li>Name</li>
          <li style={{ marginLeft: "15vh" }}>Mail Id</li>
          <li style={{ marginLeft: "13vh" }}>Experience</li>
          <li>Company Name</li>
        </div>

        {/* Table Rows */}
        <div className="tableContent">
          {datas.length === 0 ? (
            <p>Loading...</p> // Display a loading message if data is empty
          ) : (
            datas.map((item, index) => (
              <div
                key={index}
                className={`TableCard-Container ${
                  selectedData === item
                    ? "hovered" // Apply "hovered" if row is clicked
                    : hoveredData === item
                    ? "hovering" // Temporary style for hovered row
                    : ""
                }`}
                onClick={() => handleRowClick(item)}
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}
              >
                <TableCard value={item} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentsTable;
