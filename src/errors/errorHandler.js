function errorHandler(err, req, res, next){
        const {status = 500, message = "Something went wront"} = err  
        res.status(status).json({error: message})
     }

module.exports = errorHandler;