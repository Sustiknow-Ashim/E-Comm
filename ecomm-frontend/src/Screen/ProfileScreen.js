import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userAction'
import { useNavigate } from 'react-router-dom';
import Message from '../components/Alert'



const ProfileScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const updateUserData = useSelector((state) => state.updateUserData)
    const { success } = updateUserData;

    // console.log(loading, error, user, userInfo)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, dispatch, user])

    const subimitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password doesn't match")
        } else {
            // Dispatch update user
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }

    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='warning'>{message}</Message>}
                {success && <Message variant='success'>Update successfully</Message>}

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={subimitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-2'>
                            Update
                        </Button>

                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                { }
            </Col>
        </Row>
    )
}

export default ProfileScreen
