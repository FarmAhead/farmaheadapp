import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Col, Row, Form, Modal } from 'react-bootstrap'
import { FaTractor } from 'react-icons/fa'
import { IoIosCart } from 'react-icons/all'

import { fetchUserData } from '../../redux/actions/user/userActions'
import { SHOPPER, VENDOR } from '../../constants/roleConstants'

const mapStateToProps = (state) => ({ ...state.user })

export default (props) => {
  const { ...otherProps } = props

  const [showLoginModal, toggleLoginModal] = useState(false)
  const [showRegisterModal, toggleRegisterModal] = useState(false)
  const [accountType, setAccountType] = useState(SHOPPER)

  const dispatch = useDispatch()
  const { loggedIn } = useSelector(mapStateToProps)

  const submitLogin = (e) => {
    e.preventDefault()

    const { username, password } = e.target.elements
    const userInfo = {
      username: username.value,
      password: password.value,
    }

    dispatch(fetchUserData(userInfo))
  }

  return (
    <div {...otherProps}>
      <Button
        style={{ margin: '5px' }}
        variant="success"
        onClick={() => {
          toggleLoginModal(!showLoginModal)
        }}
      >
        Login
      </Button>
      <Button
        style={{ margin: '5px' }}
        variant="primary"
        onClick={() => {
          toggleRegisterModal(!showRegisterModal)
        }}
      >
        Register
      </Button>

      <Modal show={showLoginModal} onHide={toggleLoginModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitLogin}>
          <Modal.Body>
            <Form.Group controlId="username">
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="rememberMe">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Sign In
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showRegisterModal} onHide={toggleRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitLogin}>
          <Modal.Body>
            <Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>
              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Row>
            <Form.Group controlId="address1">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="70 West Delavan Ave" />
            </Form.Group>
            <Form.Group controlId="address2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Apartment, studio, or floor"
              />
            </Form.Group>
            <Row>
              <Form.Group as={Col} controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Buffalo" />
              </Form.Group>
              <Form.Group as={Col} controlId="state">
                <Form.Label>State</Form.Label>
                <Form.Control as="select" value="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="zipcode">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control type="text" placeholder="14213" />
              </Form.Group>
            </Row>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Row>
              <Form.Group as={Col} className="d-flex justify-content-center">
                <Row>
                  {accountType === SHOPPER ? (
                    <Button className="shopper-pressed" variant="info">
                      <IoIosCart size={42} />
                    </Button>
                  ) : (
                    <Button
                      variant="info"
                      onClick={() => {
                        setAccountType(SHOPPER)
                      }}
                    >
                      <IoIosCart size={42} />
                    </Button>
                  )}
                </Row>
              </Form.Group>
              <Form.Group as={Col} className="d-flex justify-content-center">
                {accountType === VENDOR ? (
                  <Button className="vendor-pressed" variant="success">
                    <FaTractor size={42} />
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => {
                      setAccountType(VENDOR)
                    }}
                  >
                    <FaTractor size={42} />
                  </Button>
                )}
              </Form.Group>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <strong>Shopper</strong>
              </Col>
              <Col className="d-flex justify-content-center">
                <strong>Vendor</strong>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
