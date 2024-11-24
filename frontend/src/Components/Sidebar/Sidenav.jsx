import { Link } from 'react-router-dom'
import './Sidebar.css'
const Sidenav = () => {

    return (
      <section className="Sidenav-container">
        <h1 className="logo">AI Dashboard</h1>

        <ul className="menu-items">
            <Link to={"/home"} className='Link'>Home</Link>
            <Link to={"/details"} className='Link'>Students</Link>
            <Link to={"/details"} className='Link'>Messages</Link>
            <Link to={"/details"} className='Link'>Performance</Link>
        </ul>
      </section>
    );
}

export default Sidenav