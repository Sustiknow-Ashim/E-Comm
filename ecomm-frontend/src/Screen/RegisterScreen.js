import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userAction'
import { useNavigate } from 'react-router-dom';
import Message from '../components/Alert'



const RegisterScreen = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();

    const userRegistation = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegistation;

    console.log(loading, error, userInfo)

    useEffect(() => {
        const userLoggedIn = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : ''

        if (userLoggedIn.name) {
            navigate('/')
        }
    }, [userInfo])

    const subimitHandler = (e) => {
        e.preventDefault();
        if(password === confirmPassword){
            console.log(name,email,password)
            dispatch(register(name, email, password))

        }else{
            setMessage('Password not match')
        }

    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <LoadingSpinner />}
            <Form onSubmit={subimitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control type='text'
                        placeholder='Enter Your Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                    ></Form.Control>
                </Form.Group>

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
                
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password'
                        placeholder='Enter password again'
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' className='my-2'>Sign In</Button>

            </Form>
            <Row>
                <Col>
                    already have account ? <span onClick={()=>{navigate('/login')}} className='text-info text-decoration-underline' style={{ cursor: 'pointer' }} > Login</span>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
