const jwt = require('jsonwebtoken')
const Response = require('../response')
const User = require('../model/model')

const verifyToken = async(token, secretKey) => {
    try {
      const decoded = jwt.verify(token, secretKey)
      return decoded
    } catch (error) {
      console.error('Error verifying token:', error)
      return null
    }
}

const refreshToken = async(req, res) => {
    try {
        const refreshedToken = req.cookies.refreshToken
        if(!refreshedToken) return Response(401,{status_code: 401, message: 'Unauthorized'}, res)

        const user = await User.findAll({
            where: {
                refresh_token: refreshedToken
            }
        })
        if(!user[0]) return Response(403,{status_code: 403, message: 'Unauthorized'}, res)
        await verifyToken(refreshedToken, process.env.REFRESH_TOKEN_SECRET)
        const { id: userId, username } = user[0]
        const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '60s'
        })
        Response(201, {status_code: 201, message: 'Token sudah di refresh', accessToken}, res)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {refreshToken}