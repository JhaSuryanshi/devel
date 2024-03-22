

import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { showUser } from '../redux/action';

const Profile = () => {
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData);

  useEffect(() => {
   dispatch(showUser());
  }, [dispatch]);

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  }

  const addUserData = async (e) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("photo", file);

  }

  return (
    <div className="container mt-3">
      <h1>Upload Your Img Here</h1>
      <Form className='mt-3'>
        {userData && userData.name && userData.email && (
          <>
            <Card.Title>User Name : {userData.name}</Card.Title>
            <Card.Title>User Email ID : {userData.email}</Card.Title>
          </>
        )}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control type="file" onChange={setimgfile} name='photo' placeholder="" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={addUserData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Profile;

