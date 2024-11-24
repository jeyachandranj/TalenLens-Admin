import { useState } from "react"; // Add useState import
import "../App.css";
import DetailsCard from "../Components/DetailsCard/DetailsCard";
import StudentsCard from "../Components/StudentsCard/StudentsCard";
import StudentsTable from "../Components/StudentsTable/StudentsTable";

const Home = () => {
  const [hoveredData, setHoveredData] = useState(null); // State to store hovered student data

  return (
    <>
     <h1> <bold>Home Page</bold></h1>
      <section style={{ display: "flex" }}>
        <div>
          <div className="Details-container">
            <DetailsCard value={350} title={"Total Students"} />
            <DetailsCard value={20} title={"Total Test"} />
            <DetailsCard value={4} title={"Total Courses"} />
          </div>

          <div>
            {/* Pass setHoveredData to StudentsTable */}
            <StudentsTable setHoveredData={setHoveredData} />
          </div>
        </div>
        <div className="Performance-container">
          {/* Display StudentsCard with hovered data */}
          <StudentsCard hoveredData={hoveredData} />
        </div>
      </section>
    </>
  );
};

export default Home;
