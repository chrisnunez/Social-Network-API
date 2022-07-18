const { User } = require('../models/User');

module.exports = {
  // Get All Users
  getAllUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Single User
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((user) => {
        !user
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json(user)
  })
      .catch((err) => res.status(500).json(err));
  },
  // Delete a User
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json({ User: "User successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add friend
  
};
