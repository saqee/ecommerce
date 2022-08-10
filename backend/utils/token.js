import JWT from "jsonwebtoken"

const generateToken = (id) => {
  return JWT.sign(
    {
      id,
    },
    process.env.SECRET,
    { expiresIn: "3d" }
  )
}

export default generateToken
