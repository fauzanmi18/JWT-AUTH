const Response = (status_code, data, res) => {
    res.status(status_code).json([data])
}

module.exports = Response