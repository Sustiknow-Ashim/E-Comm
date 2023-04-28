import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../actions/oderActions';
import { PayPalButton } from 'react-paypal-button-v2'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../components/Alert';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const OrderScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [sdkReady, setSdkReady] = useState(false)
    const { id } = useParams('id')


    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;



    if (!loading) {
        // Calculated Prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            console.log('clientId', clientId)
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(id))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                console.log('addPayPalScript useEffect')
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, id, successPay, order])




    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(id, paymentResult))
    }

    return loading ? <LoadingSpinner /> : error ? <Message varient='danger'>{error}</Message> : <>
        <h2>OrderId: {id}</h2>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.name}</a></p>
                        <div>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                            {order.shippingAddress.postalCode},{' '}
                            {order.shippingAddress.country}
                        </div>
                        {
                            order.isDelivered ? (
                                <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )
                        }
                    </ListGroup.Item>
                    {console.log("----order.isPaid----", order.isPaid)}
                    <ListGroup.Item>
                        <h2>Payment Methods: </h2>
                        <strong>Method: </strong>
                        {order.paymentmethod}
                        <div>{
                            order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )
                        }</div>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Cart is empty</Message>
                        ) : (
                            <ListGroup>
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col>
                                                Price : {item.qty} x {item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>

                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}

                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Ordered Items</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {console.log(order.totalPrice, typeof order.totalPrice)}
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <LoadingSpinner />}
                                {!sdkReady ? (
                                    <LoadingSpinner />
                                ) : (
                                    <PayPalButton
                                        amount="100"
                                        onSuccess={(details, data) => {
                                            console.log("details: ", details, "and data is :", data)
                                            successPaymentHandler(details);

                                        }}
                                    />
                                )}
                            </ListGroup.Item>
                        )

                        }

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen
