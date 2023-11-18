const express = require('express')
const { getUser, register } = require('../controller/user')
const { login, logout } = require('../controller/auth')
const { protectedEndpoint } = require('../middleware/index')
const { coba } = require('../controller/coba')
const { refreshToken } = require('../controller/refreshToken')
const router = express.Router()

router.route('/')
  .get(coba)

router.route('/user')
  .get(protectedEndpoint, getUser)
  .post(register)

router.route('/login')
  .post(login)

router.route('/token')
  .get(refreshToken)

router.route('/logout')
  .delete(logout)

module.exports = router