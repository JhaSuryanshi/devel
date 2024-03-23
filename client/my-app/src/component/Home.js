import React from 'react'
// Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
//import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom"

const Home = () => {
    return (
        <>
            {/* <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light mx-2">Contact Us</NavLink>
                    <Nav className="me-auto">
                        <NavLink to="/Register" className="text-decoration-none text-light mx-2">Register</NavLink>
                    </Nav>
                </Container>
            </Navbar> */}
            <nav class="navbar bg-primary" data-bs-theme="dark" style={{height:"60px"}}>
            <NavLink to="/" className="text-decoration-none text-light mx-2">Contact Us</NavLink>
            <Nav className="me-auto">
                        <NavLink to="/Register" className="text-decoration-none text-light mx-2">Register</NavLink>
                    </Nav>
</nav>

        </>
    )
}

export default Home