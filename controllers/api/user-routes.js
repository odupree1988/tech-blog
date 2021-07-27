const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", (res, req) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (res, req) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Post,
      attributes: ["id", "title", "content", "created_at"],
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router