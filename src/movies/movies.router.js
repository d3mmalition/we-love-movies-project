const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/:movieId/theaters")
  .get(controller.listTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.listReviews)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;

// const router = require("express").Router();
// const controller = require("./movies.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");

// router
//   .route("/")
//   .get(controller.list)
//   .all(methodNotAllowed);

// router
//   .route("/:movieId")
//   .get(controller.read)
//   .all(methodNotAllowed);

// router
//   .route("/:movieId/theaters")
//   .get(controller.movieByTheaters)
//   .all(methodNotAllowed);

// router
//   .route("/:movieId/reviews")
//   .get(controller.movieByReviewAndCritic)
//   .all(methodNotAllowed);



// module.exports = router;


