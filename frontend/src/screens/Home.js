import React, { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions.js"
import Loader from "../components/Loader"
import Message from "../components/Message"
const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.productList)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <div>
      <h1>Lates Product</h1>
      {loading && loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products?.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}
export default Home
