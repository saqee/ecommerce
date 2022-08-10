import JWT from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"

const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]
    let decoded = JWT.verify(token, process.env.SECRET)
    req.user = await User.findById(decoded.id).select("-password")
    next()
  }
  if (!token) {
    res.status(401)
    throw new Error("not authorized ,no token")
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error("not authorized ,admin token need ")
  }
}
export { protect, admin }
