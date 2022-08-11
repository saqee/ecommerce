import React from "react"
import {
  Row,
  Col,
  Image,
  LsitGroup,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addToCart, removeItem } from "../actions/cartAction.js"
import Loader from "../components/Loader"
import Message from "../components/Message"
const CartScreen = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.userLogin)
  const removeFromCartHandler = (id) => {
    dispatch(removeItem(id))
  }
  const checkoutHandler = () => {
    if (!userInfo) {
      window.location.href = "/login"
    } else {
      window.location.href = "/shipping"
    }
  }
  const locationUrl = () => {
    window.location.href = "/"
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            your cart is empty <Link onClick={locationUrl}>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems &&
              cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} width="150px" />
                    </Col>
                    <Col md={3} style={{ marginLeft: "20px" }}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>{item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Sub Total (
                {cartItems.reduce((acc, item) => Number(acc + item.qty), 0)})
                items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => Number(acc + item.qty * item.price), 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" variant="dark" onClick={checkoutHandler}>
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
