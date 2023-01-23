import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction'
import { useNavigate } from 'react-router-dom';
import Message from '../components/Alert'



const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;
    console.log(userInfo)

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''

        if (userLoggedIn.name) {
            navigate('/')
        }
    }, [userInfo])

    const subimitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))

    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <LoadingSpinner />}
            <Form onSubmit={subimitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className='my-2'>Sign In</Button>

            </Form>
            <Row>
                <Col>
                Don't have an account ? <b className='text-info' onClick={()=>{navigate('/register')}} style={{cursor:'pointer'}} >Sign up</b>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
