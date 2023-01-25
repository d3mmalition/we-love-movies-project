function notFound (req, res, next){
    const message = {status: 404,
                    message: `Path not found: ${req.originalUrl}`}
        next(message);
}


module.exports = notFound