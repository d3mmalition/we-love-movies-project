const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const showing = req.query.is_showing;
  const data = showing ? await service.listInTheaters() : await service.list();
  res.json({ data: data });
}

async function validMovieId(req, res, next) {
  const { movieId } = req.params;
  const movies = await service.list();
  const foundMovie = movies.find((movie) => movieId == movie.movie_id);
  if (foundMovie) {
    res.locals.movie = foundMovie;
    return next();
  }
  next({
    status: 404,
    message: "Movie cannot be found.",
  });
}

async function read(req, res) {
  const { movie_id } = res.locals.movie;
  const url = req.originalUrl;

  if (url.includes("theaters")) {
    res.json({ data: await service.theaterList(Number(movie_id)) });
  } else if (url.includes("reviews")) {
    res.json({ data: await service.reviewList(Number(movie_id)) });
  } else {
    res.json({ data: await service.read(Number(movie_id)) });
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(validMovieId), asyncErrorBoundary(read)],
};
