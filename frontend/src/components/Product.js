import React from "react"
import { Link } from "react-router-dom"

const Product = ({ product }) => {
  return (
    <>
      <div class="card mb-3">
        <h3 class="card-header">{product.category}</h3>
        <div class="card-body">
          <h5 class="card-title">{product.name}</h5>
          <h6 class="card-subtitle text-muted">{product.brand}</h6>
        </div>
        <img src={product.image} />

        <div class="card-body">
          <h5 class="card-title">${product.price}</h5>
        </div>
        <div>
          {/*   <StarRatings
            rating={product.rating}
            starRatedColor="blue"
            numberOfStars={6}
            name="rating"
          /> */}
        </div>
        <div class="card-body">
          <Link
            to={`/product/${product._id}`}
            onClick={() => {
              window.location.href = `/product/${product._id}`
            }}
          >
            Read More
          </Link>
        </div>
      </div>
    </>
  )
}

export default Product
