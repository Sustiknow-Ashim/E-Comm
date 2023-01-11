import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useParams, Link, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { detailProduct } from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';
import { addToCart } from '../actions/cartActions';

const ProductScreen = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, product, error } = productDetails;

    useEffect(() => {
        dispatch(detailProduct(id))
    }, [dispatch, id]);



    return (
        <>
            <Link className='btn btn-dark my-3' to='/'>Go Back</Link>
            {loading ? <LoadingSpinner /> : error ? <Alert>{error}</Alert> : <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.description} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush' >
                        <ListGroup.Item>{product.name}</ListGroup.Item>
                        <ListGroup.Item><Rating value={product.rating} text={`${product.numReviews} reviews`} /></ListGroup.Item>
                        <ListGroup.Item>Price : $ {product.price}</ListGroup.Item>
                        <ListGroup.Item>Description : {product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <ListGroup >
                        <ListGroup.Item>
                            <Row>
                                <Col>Price</Col>
                                <Col>{product.price}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Status</Col>
                                <Col>{product.countInStock > 0 ? 'In stock' : 'out of stock'}</Col>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock ? <ListGroup.Item>
                            <Row>
                                <Col>Qty</Col>
                                <Col>
                                    <Form.Select
                                        as='select'
                                        value={qty}
                                        onChange={(e) => setQty(e.target.value)}
                                    >
                                        {
                                            [...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                            </Row>
                        </ListGroup.Item> : ''}
                        <ListGroup.Item>
                            <Button
                                onClick={() => {
                                    dispatch(addToCart(id, qty));
                                    navigate('/cart')
                                }}
                                className='btn-block w-100'
                                disabled={product.countInStock === 0}> Add to cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>

                </Col>
            </Row>}

        </>
    )
}

export default ProductScreen
