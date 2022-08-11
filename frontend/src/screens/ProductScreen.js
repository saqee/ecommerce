import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Image,
  Card,
  Button,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { createBrowserHistory } from "history"
import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { detailsProducts } from "../actions/productActions.js"
import { addToCart } from "../actions/cartAction.js"
import Loader from "../components/Loader"
import Message from "../components/Message"
const ProductScreen = ({}) => {
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  )
  const { id } = useParams()
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const history = createBrowserHistory()
  useEffect(() => {
    dispatch(detailsProducts(id))
  }, [dispatch, id])
  console.log(qty)
  const cartHandler = () => {
    dispatch(addToCart(id, qty))
    history.push(`/cart/${id}?qty=${qty}`)
    setTimeout(() => {
      window.location.href = `/cart `
    }, 1000)
  }
  return (
    <>
      <Link
        className="nav-link"
        to="/"
        onClick={() => {
          window.location.href = `/`
        }}
      >
        Go Back
      </Link>
      {loading && loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6} sm={12}>
            <a href={product.image} download={product.image}>
              <Image src={product.image} fluid />
            </a>
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Price:{product.price}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0
                          ? "In Stock"
                          : " Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    disabled={product.countInStock === 0}
                    onClick={cartHandler}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
