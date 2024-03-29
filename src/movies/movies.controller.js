// const service = require("./movies.service.js");
// const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// async function movieExists (req, res, next) {
//   const {movieId} = req.params;
//   const movie = await service.read(movieId);
//   if (movie) {
//     res.locals.movie = movie;
//     return next()
//   }
//   next({
//     status: 404,
//     message: "movie does not exist"
//   })
// }

// async function read (req, res) {
//   const {movieId} = req.params;
//   const data = await service.read(movieId);
//   res.json({data})
// }

// async function list(req, res, next) {
//   const showing = req.query.is_showing
//   const data = showing ? await service.showingList(): await service.list();
//   res.json({data})
// }

// async function movieByTheaters(req, res, next) {
//   const { movieId } = req.params;
//   const allTheaters = await service.movieByTheaters(movieId);
//   const time = new Date().toISOString();
//   const data = allTheaters.map((theater) => {
//     return { ...theater, created_at: time, updated_at: time };
//   });
//   res.json({ data });
// }

// async function movieByReviewAndCritic(req, res, next) {
//   const time = new Date().toISOString();
//   const { movieId } = req.params;
//   const reviews = await service.movieByReview(movieId);
//   const critics = await service.listCritics();

//   const data = reviews.map((review) => {
//     const critic = {
//       critic: critics.find((critic) => critic.critic_id === review.critic_id),
//     };
//     return { ...review, created_at: time, updated_at: time, ...critic };
//   });

//   res.json({ data });
// }

// module.exports = {
//   list,
//   read: [asyncErrorBoundary(movieExists), read],
//   movieByTheaters,
//   movieByReviewAndCritic,
// };
const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//middleware
const _paramsCheck = async (req, res, next) => {
  const { movieId } = req.params;
  const match = await service.read(Number(movieId));
  if (match.length === 0 || !movieId)
    return next({
      status: 404,
      message: `${movieId} does not exist in the database`,
    });
  res.locals.movie = match[0];
  next();
};

//executive functions

async function list(req, res) {
  const { is_showing } = req.query;
  const data = is_showing
    ? await (await service.showingList()).splice(0, 15)
    : await service.list();

  res.status(200).json({ data: data });
}

async function read(req, res) {
  res.status(200).json({ data: res.locals.movie });
}

async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await service.listTheaters(movieId);
  res.status(200).json({ data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(_paramsCheck), asyncErrorBoundary(read)],
  listReviews: [
    asyncErrorBoundary(_paramsCheck),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(_paramsCheck),
    asyncErrorBoundary(listTheaters),
  ],
};