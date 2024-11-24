import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Sidenav from "./Components/Sidebar/Sidenav";
import Student from "./Pages/Student";
import Home from "./Pages/Home";
import Overview from "./Pages/Overview";

const App = () => {

  return(
    <Router>
      <section style={{display:'flex'}}>
        <Sidenav/>
          <div className="dashboard">
            <Routes>
              <Route path="/home" element={<Home/>}/>
              <Route path="/details" element={<Student/>}/>
              <Route path="/overview" element={<Overview/>}/>
            </Routes>
          </div>
      </section>
    </Router>
  )
}

export default App