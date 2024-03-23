import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"
import './Home.css'

const Home = () => {
    return (
        <nav className="navbar">
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink to="/" className="text-decoration-none text-light mx-2">Contact Us</NavLink>
                    {/* </li>
                    <li className="nav-item"> */}
                    <NavLink to="/Register" className="text-decoration-none text-light mx-2">Register</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        // <>
        //     <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        //         <Container>
        //             <Nav className="me-auto">
        //             <NavLink to="/" className="text-decoration-none text-light mx-2">Contact Us</NavLink>
        //                 <NavLink to="/Register" className="text-decoration-none text-light mx-2">Register</NavLink>
        //             </Nav>
        //         </Container>
        //     </Navbar>
        // </>
    )
}

export default Home