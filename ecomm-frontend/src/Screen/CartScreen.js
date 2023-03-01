import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Alert'

const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);


  const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;
  // console.log('from store', cart.cartItems)


  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart])


  const removeFormCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () =>{
    const isLoggedIn = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    isLoggedIn?.name ? navigate('/shipping') : navigate('/login');
  }

  return (
    <Row className='my-2'>
        <h1 className='my-3'>Shoping Cart</h1>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>Your Cart is Empty</Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      className='form-select'
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                        [...Array(item.countInStock).keys()].map(x => (
                          <option key={x + 1} value={x + 1} >{x + 1}</option>
                        ))
                      }
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' varient='light'
                      onClick={() => { removeFormCartHandler(item.product) }}
                    >
                      <i className='fas fa-trash'></i> </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4} className=''>
        <ListGroup>
          <ListGroup.Item>
            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
            <h5>$ {cartItems.reduce((acc, item) => acc + Number(item.price * item.qty), 0)}</h5>
          </ListGroup.Item>
          <ListGroup.Item className='text-center'>
            <Button type='button' className='btn-block' disabled={cartItems.length == 0} onClick={()=>{checkoutHandler()}}>PROCEED TO CHECKOUT</Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  )
}

export default CartScreen;
