import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import { LoginContext } from './context';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { showUser } from '../redux/action';

const Register = ({ userData }) => {
  const { logindata } = useContext(LoginContext);
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]); // Corrected dependency array

  const setimgfile = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Read the selected file and display its preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  }

  const addUserData = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);
  }

  return (
    <div className="container mt-3">
      <Form className='mt-3'>
        {userData && (
          <div>
            <p>User Name: {logindata ? logindata.ValidUserOne.name : ""}</p>
            <p>User Email: {logindata ? logindata.ValidUserOne.email : ""}</p>
          </div>
        )}
        {imagePreview && (
          <img src={imagePreview} alt="Selected" style={{ width: '100px', height: '100px' }} />
        )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
        </Form.Group>
        <div className='text-end'>
          <Button variant="primary" type="submit" onClick={addUserData}>
            <NavLink to="/Profile" className="text-decoration-none text-light">Submit</NavLink>
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Register;
