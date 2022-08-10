import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../utils/token.js"
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExits = await User.findOne({ email })
  if (userExits) {
    res.status(401)
    throw new Error("try diffferent user email.alreay exits")
  } else {
    const user = await User.create({
      name,
      email,
      password,
    })
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      })
    } else {
      res.status(401)
      throw new Error("Invalid User Data")
    }
  }
})
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("emai, or password inCorrect")
  }
})

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})

export const getUserUpdateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: "User removed" })
  } else {
    res.status(401)
    throw new Error("user not removed")
  }
})

export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.json(user)
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})

export const updateUserByAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    })
  } else {
    res.status(401)
    throw new Error("user not found")
  }
})
