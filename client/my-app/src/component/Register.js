
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import { fetchUserData } from '../redux/action'; // Import the action creator

const Register = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userData); // Assuming you have a reducer for user data

  useEffect(() => {
    // Dispatch action to fetch user data when component mounts
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    // Update component state when user data changes
    setData(userData);
  }, [userData]);

  return (
    <>
      <div className='container mt-2'>
        <div className='text-end'>
          <Button variant="primary"><NavLink to="/" className="text-decoration-none text-light">Add User</NavLink></Button>
        </div>

        <div className='row d-flex justify-content-between align-iteams-center mt-5'>
          {data.length > 0 ? (
            data.map((el, i) => (
              <Card key={el._id} style={{ width: '22rem', height: '18rem' }} className="mb-3">
                <Card.Img variant="top" style={{ width: '100px', textAlign: 'center', margin: 'auto' }} src={`/uploads/${el.imgpath}`} className='mt-2' />
                <Card.Body className='text-center'>
                  <Card.Title>User Name : {el.name}</Card.Title>
                  <Card.Title>User Email ID : {el.email}</Card.Title>
                  <Card.Text>Date Added: {moment(el.date).format('L')}</Card.Text> 
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No users found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;

