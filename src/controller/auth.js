const User = require("../model/model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Response = require("../response")

const login = async(req, res) => {
    try {
        const user = await User.findAll({
            where: {
                username: req.body.username
            }
        })

        const cekPassword = await bcrypt.compare(req.body.password, user[0].password)
        if(!cekPassword) return Response(400, {status_code: 404, message: 'Password Salah'}, res)
        
        const { id: userId, username } = user[0]

        const accessToken = jwt.sign({userId, username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10s'
        })
        const refreshToken = jwt.sign({userId, username}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        await User.update({refresh_token: refreshToken},{
            where: {
                id: userId
            }
        })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            // secure:true
        })

        Response(200, {
            status_code: 200,
            message: 'Login berhasil',
            accessToken
        }, res)
    } catch (error) {
        Response(404, {
            status_code: 404,
            message: 'Username tidak ditemukan'
        }, res)
    }
}

const logout = async(req, res) => {
    const refreshedToken = req.cookies.refreshToken
    if(!refreshedToken) return Response(204,{status_code: 204, message: 'No Content'}, res)

    const user = await User.findAll({
        where: {
            refresh_token: refreshedToken
        }
    })
    if(!user[0]) return Response(204,{status_code: 204, message: 'No Content'}, res)
    const userId = user[0].id
    await User.update({refresh_token: null},{
        where: {
            id: userId
        }
    })
    res.clearCookie('refreshToken')
    return Response(200,{status_code: 200, message: 'Logout berhasil'}, res)
}

module.exports = {login, logout}