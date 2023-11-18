const User = require("../model/model")
const Response = require("../response")
const bcrypt = require('bcrypt')

const getUser = async(req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const perPage = parseInt(req.query.perPage) || 10

        const offset = (page - 1) * perPage
        const user = await User.findAndCountAll({
            attributes:['id', 'username'],
            limit: perPage,
            offset: offset
        })

        const totalPages = Math.ceil(user.count / perPage);
        if (page > totalPages) {
            return Response(404, { status_code: 404, message: 'Page not found' }, res);
        }

        const response = {
            status_code: 200,
            message: "Success get data",
            data: user.rows,
            currentPage: page,
            totalPages: totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            lastPage: totalPages
        }

        Response(200, response, res)
    } catch (error) {
        console.log('Error while getting user data')
        console.log(error)
    }
}

const register = async(req, res) => {
    const { username, password, test } = req.body
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    try {
        const insert = await User.create({
            username: username,
            password: hash
        })

        const response = {
            status_code: 201,
            message: "Success create data",
            data: insert
        }

        Response(201, response, res)
    } catch (error) {
        console.log('Error when creating a new data')
        console.log(error)
    }
}

module.exports = {getUser, register}
