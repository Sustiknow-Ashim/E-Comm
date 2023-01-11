import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer className='my-1  bottom-0 '>
            <Container>
                <Row>
                    <Col className='text-center'>
                        Copyright &copy; E-Comm created by ashim
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
