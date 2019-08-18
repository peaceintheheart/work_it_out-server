const express = require("express");
const xss = require("xss");

const BodyPartsService = require("./bodyParts-service");
const bodyPartsRouter = express.Router();
const bodyParser = express.json();

const serializeBody = body => ({
    id: body.id,
    body_part: xss(body.body_part),
    date: xss(body.date)
});

bodyPartsRouter
    .route("/")
    .get((req, res, next) => {
        BodyPartsService.getAllBodyParts(req.app.get("db"))
            .then(entry => {
                res.json(entry.map(serializeBody));
            })
            .catch(next);
    })
    .post(bodyParser, (req, res, next) => {
        console.log(req.body);
        const newBody = req.body;
        console.log(newBody);
        console.log(newBody.body_part);
        console.log(newBody.date);
        for (const field of ["body_part", "date"]) {
            if (!newBody[field]) {
                return res
                    .status(400)
                    .send({ error: { message: `'${field}' is required` } });
            }
        }

        BodyPartsService.insertBodyParts(req.app.get("db"), newBody)
            .then(bodyPart => {
                console.log(`Body Part with id ${bodyPart.id} was added to list`);
                res
                    .status(201)
                    .json(serializeBody(bodyPart));
            })
            .catch(next);
    });

module.exports = bodyPartsRouter;
