const jwt = require('jsonwebtoken')
const Response = require('../response')

const verifyToken = async(token, secretKey) => {
    try {
      const decoded = jwt.verify(token, secretKey)
      return decoded
    } catch (error) {
      console.error('Error verifying token:', error)
      return null
    }
}

const protectedEndpoint = async(req, res, next) => {
  try {
    const accessToken = req.headers.authorization
    const token = accessToken && accessToken.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Anda tidak memiliki akses, harap login terlebih dahulu' })
    }
   
    const secretKey = process.env.ACCESS_TOKEN_SECRET
    if (!secretKey) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  
    const decoded = await verifyToken(token, secretKey)
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    
    req.username = decoded.username
    next()
  } catch (error) {
    Response(500, {status_code: 500, message: 'Internal server error'}, res)
    console.log(error)
  }
    
}

module.exports = {protectedEndpoint}