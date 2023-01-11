import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardImg } from 'react-bootstrap'
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card className='mx-1' >
        <div onClick={()=>{navigate(`/product/${product._id}`)}}>
          <CardImg variant='top' src={product.image} />
        </div>

        <Card.Body>
          <div onClick={()=>{navigate(`/product/${product._id}`)}} style={{cursor:'pointer'}}>
            <Card.Title as='h5'>
              <strong> {product.name} </strong>
            </Card.Title>
          </div>

          <Card.Text as='div'>
            <Rating value={product.rating} text={` ${product.numReviews} users`} />
          </Card.Text>

          <Card.Text as='h3'>$ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductCard
