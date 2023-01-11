import React, { useEffect } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { listProduct } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';


const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProduct())
    }, [dispatch]);


    return (
        <div className=''>
            <h1 className='text-center'>Latest Products</h1>
            {loading ? <LoadingSpinner /> : error ? <Alert variant='danger'> {error} </Alert> : <Row>
                {
                    products.map((product, i) => (
                        <Col key={i} sm={12} md={6} lg={4} xl={3} className='mt-4'>
                            <ProductCard product={product} />
                        </Col>
                    ))
                }
            </Row>}

        </div>
    )
}

export default HomeScreen
