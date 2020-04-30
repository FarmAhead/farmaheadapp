import React, { useState } from 'react'
import FlexBox from '../custom/FlexBox'
import { Button, Col, Row } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/all'

const ShoppingCart = (props) => {
  const [showCartView, toggleCartView] = useState(false)
  const { ...otherProps } = props

  return (
    <div className="p-2 position-relative" {...otherProps}>
      <Button
        className="m-2"
        variant="secondary"
        onClick={() => {
          toggleCartView(!showCartView)
        }}
      >
        <FaShoppingCart />
      </Button>
      {showCartView ? (
        <Row
          className="bg-white position-absolute"
          style={{ right: '20px', width: '200px', height: '200px' }}
        >
          <Col xs={6}>Apple</Col>
          <Col xs={6}>Quantity: 1</Col>

          <Col xs={6}>Kale</Col>
          <Col xs={6}>Quantity: 9000</Col>
          <Col className="m-auto">
            <Button>Checkout</Button>
          </Col>
        </Row>
      ) : null}
    </div>
  )
}

export default ShoppingCart
