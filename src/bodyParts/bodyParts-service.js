// file for knex db queries

// 1) npm i knex and require
// 2) create tables for db .sql file
// 3) create db for tables
// 4) create seed file for testing

const BodyPartsService = {
    getAllBodyParts(knex) {
        return knex.select("*").from("body");
    },
    insertBodyParts(knex, newBodyParts) {
        return knex
            .insert(newBodyParts)
            .into("body")
            .returning("*")
            .then(rows => {
                console.log(rows[0]);
                return rows[0];
            })
    }
}

module.exports = BodyPartsService