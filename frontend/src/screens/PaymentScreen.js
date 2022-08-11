import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/FormContainer"
import { paymentMethodAction } from "../actions/cartAction"
import CheckoutSteps from "../components/CheckoutSteps"
const PaymentScreen = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress) {
    window.location.href = "/shipping"
  }
  const history = useHistory()
  const [paymentMethod, setPaymentMethod] = useState("paypal")

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(paymentMethodAction(paymentMethod))
    setTimeout(() => {
      window.location.href = "/placeorder"
    }, 1000)
  }
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Group>
            <Form.Label as="legend">Select Method</Form.Label>
            <Form.Check
              type="radio"
              label="paypal or credit card"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Form.Group>
        </Form.Group>

        <Button type="submit" variant="primary">
          continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
