const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

class UserController {
  //[Get]
  index(req, res) {
    const users = User.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "hihi",
        });
      });
  }

  //[Get]
  createNewUser(req, res) {
    if (!req.body.firstName) {
      res.status(400).send({
        message: "Content can not be empty !",
      });
      return;
    }
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    User.create(newUser)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "hihi2222",
        });
      });
  }

  //Update
  update(req, res) {
    if (!req.body.firstName) {
      res.status(400).send({
        message: "Content can not be empty !",
      });
      return;
    }

    var user = User.findByPk(req.body.id);
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    User.update(newUser)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "hihi2222",
        });
      });
  }

  //Get Info User

  getUserInfo(req, res) {
    User.findByPk(req.body.id)
      .then((data) => {
        res.send(data);
        console.log(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "hihi2222",
        });
      });
  }

  //delete

  getUserInfo(req, res) {
    User.findByPk(req.body.id)
      .then((data) => {
        User.destroy(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "hihi2222",
        });
      });
  }
}

module.exports = new UserController();
