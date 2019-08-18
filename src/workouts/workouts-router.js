const express = require("express");
const xss = require("xss");

const WorkoutService = require("./workouts-service");
const workoutsRouter = express.Router();
const bodyParser = express.json();

const serializeBody = body => ({
    id: body.id,
    body_part: xss(body.body_part),
    date: xss(body.date)
});

workoutsRouter
    .route("/")
    .get((req, res, next) => {
        WorkoutsService.getAllBodies(req.app.get("db"))
            .then(entry => {
                res.json(entry.map(serializeBody));
            })
            .catch(next);
    })
    .post(bodyParser, (req, res, next) => {
        const { bodyP } = req.body;
        const newBody = { bodyP };
        for (const field of ["body_part", "date"]) {
            if (!newBody[field]) {
                logger.error(`${field} is required`);
                return res
                    .status(400)
                    .send({ error: { message: `'${field}' is required` } });
            }
        }

        WorkoutsService.insertBody(req.app.get("db"), newBody)
            .then(bodyPart => {
                logger.info(`Body Part with id ${bodyPart.id} was added to list`);
                res
                    .status(201)
                    .json(serializeFolder(bodyPart));
            })
            .catch(next);
    });

// foldersRouter
//     .route("/:folder_id")
//     .all((req, res, next) => {
//         const { folder_id } = req.params;
//         FoldersService.getById(req.app.get("db"), folder_id)
//             .then(folder => {
//                 if (!folder) {
//                     logger.error(`Folder with id ${folder_id} not found`);
//                     return res.status(404).json({
//                         error: { message: `Folder not found` }
//                     });
//                 }
//                 res.folder = folder;
//                 next();
//             })
//             .catch(next);
//     })
//     .get((req, res) => {
//         res.json(serializeFolder(res.folder));
//     })
//     .delete((req, res, next) => {
//         const { folder_id } = req.params;
//         FoldersService.deleteFolder(req.app.get("db"), folder_id)
//             .then(numRowsAffected => {
//                 logger.info(`Folder with id ${folder_id} deleted.`);
//                 res.status(204).end();
//             })
//             .catch(next);
//     })
//     .patch(bodyParser, (req, res, next) => {
//         const { folder_name } = req.body;
//         const folderToUpdate = { folder_name };
//         const numberOfValues = Object.values(folderToUpdate).filter(Boolean).length;
//         if (numberOfValues === 0) {
//             logger.error(`Invalid update without required fields`);
//             return res.status(400).json({
//                 error: {
//                     message: `Request body must container folder_name`
//                 }
//             });
//         }

//         FoldersService.updateFolder(
//             req.app.get("db"),
//             req.params.folder_id,
//             folderToUpdate
//         )
//             .then(numRowsAffected => {
//                 res.status(204).end();
//             })
//             .catch(next);
//     });

module.exports = workoutsRouter;
