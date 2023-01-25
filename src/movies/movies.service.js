const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties");


const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"
})

async function list() {
    return knex("movies").select("*");
}

async function listInTheaters(){
    return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .join("theaters as t", "t.theater_id", "mt.theater_id")
            .select("m.*")
            .where({"mt.is_showing":true})
            .distinct()
}

async function read(movieId){
    return knex ("movies")
        .select("*")
        .where({"movie_id": movieId})
        .first();
}

async function theaterList(movieId){
    return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .join("theaters as t", "t.theater_id", "mt.theater_id")
            .select("t.*")
            .where({"m.movie_id": movieId})   
}

async function reviewList(movieId){
    return knex("reviews as r")
            .join("critics as c", "r.critic_id", "c.critic_id")
            .select("*")
            .where({"movie_id": movieId})
            .then((data)=> data.map(addCritic));
}

module.exports = {
    list,
    listInTheaters,
    read,
    theaterList,
    reviewList,
}