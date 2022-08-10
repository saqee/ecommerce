import Product from "../models/productModel.js"
import asyncHandler from "express-async-handler"
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  if (products) {
    res.json({ products })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found by id")
  }
})

export const getProductDelete = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "product deleted" })
  } else {
    res.status(404)
    throw new Error("Product not deleted")
  }
})

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, brand, category, countInStock, image } =
    req.body
  console.log(image)
  const product = new Product({
    name,
    price,
    description,
    brand,
    category,
    countInStock,
    image,
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

export const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
})
