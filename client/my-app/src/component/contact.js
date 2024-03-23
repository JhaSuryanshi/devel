import React, { useState } from 'react';
//import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { NavLink} from "react-router-dom"
//import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import './contact.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../redux/action';



const Contact = () =>  {
    //const [show, setShow] = useState(false);
    //const history = useHistory();

    //const [selectedImage, setSelectedImage] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobilenumber: '',
        message: ''
    });
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const setFile = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const selectedFile = e.target.files[0]; 
    //         setSelectedImage(selectedFile); 
            
    //         setFormData({ ...formData, image: selectedFile }); 
    //     }
    // };
    

    const sendEmail = async (e) => {
        e.preventDefault();
        // const formDataToSend = new FormData();
        // formDataToSend.append('image', selectedImage);
        // formDataToSend.append('name', formData.name);
        // formDataToSend.append('email', formData.email);
        // formDataToSend.append('mobilenumber', formData.mobilenumber);
        // formDataToSend.append('message', formData.message);

        dispatch(createUser(formData));

        setFormData({
            name: '',
            email: '',
            mobilenumber: '',
            message: ''
        });
        window.location.pathname = "/Register";
        //history.push('/Register');
        //setSelectedImage(null);
        //setShow(true);
        //history.push('/registration');
    }

    return (
        <div className='container'>
            {/* {show && 
                <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Successfully Sent
                </Alert>
            } */}
            <h2>Contact Me!</h2>
            {/* <div className="image-wrapper">
                <Form.Group className="mb-3" >
                    <Form.Control type="file" name="image" onChange={setFile} />
                </Form.Group>
            </div> */}
            <form id="contactForm">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <Form.Control 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        autoComplete="name" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <Form.Control 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        autoComplete="email" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="number">Mobile Number:</label>
                    <Form.Control 
                        type="number" 
                        id="mobilenumber" 
                        name="mobilenumber" 
                        value={formData.mobilenumber} 
                        onChange={handleChange} 
                        autoComplete="mobilenumber" 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <Form.Control 
                        id="message" 
                        name="message" 
                        as="textarea"
                        cols="20" 
                        rows="6" 
                        value={formData.message} 
                        onChange={handleChange} 
                        autoComplete="message" 
                        required 
                    />
                </div>
                {/* <div className='text-end'>
                    <Button variant="primary" type="submit" ><NavLink to="/Register" onClick={sendEmail}>Send</NavLink></Button>
                </div> */}
                {/* <Button variant="primary"onClick={sendEmail}><NavLink to="/Register">Send</NavLink></Button> */}
                {/* <Button variant="primary" type="submit" onClick={sendEmail}>
                    Send
                </Button> */}
                 <div className='text-end'>
          <Button variant="primary" onClick={sendEmail}><NavLink to="/Register" className="text-decoration-none text-light">Next</NavLink></Button>
        </div>
                <p>If you want to see the profile page, click here: <NavLink to="/Profile">Profile</NavLink></p>
            </form>
        </div>
    );
};

export default Contact;
