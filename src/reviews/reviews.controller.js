const service = require("./reviews.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function reviewIdExists(req,res,next){
    const {reviewId} = req.params;
    const data = await service.list();
    const foundReview = data.find((review) => reviewId == review.review_id);
    if (foundReview){
        res.locals.review = foundReview;
        return next();
    }
    next({status: 404, message: "Review cannot be found"})
}

async function destroy(req,res){
    const {review_id} = res.locals.review;
    await service.destroy(review_id);
    res.sendStatus(204);
}

async function update(req,res){
    const review_id = req.params.reviewId;
    const updatedReview = {
        ...req.body.data,
        review_id: review_id
    }
    const review = await service.update(updatedReview);
    const critic = await service.getCritic(review_id)
    res.json({data:{...review, ...critic}});
    };


module.exports = {
    update:[asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(update)],
    delete:[asyncErrorBoundary(reviewIdExists), asyncErrorBoundary(destroy)]
}