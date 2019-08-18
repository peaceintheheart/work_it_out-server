// file for knex db queries

// 1) npm i knex and require
// 2) create tables for db .sql file
// 3) create db for tables
// 4) create seed file for testing

const WorkoutService = {
    getAllBodies(knex) {
        return knex.select("*").from("body");
    },
    getAllWorkouts(knex) {
        return knex.select("*").from("workout");
    },
    insertBody(knex, newBody) {
        return knex
            .insert(newBody)
            .into()
            .returning()
            .then(newBody => {
                console.log(newBody[0])
            })
    },
    insertWorkout(knex, newWorkout) {
        return knex
            .insert(newWorkout)
            .into()
            .returning()
            .then(workout => {
                console.log(workout[0])
            })
    }
}

module.exports = WorkoutService