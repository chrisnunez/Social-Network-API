const { User, Thought} = require('../models');

module.exports = {
  // Get All Users
  getAllUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Single User
  getSingleUser({params}, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
    })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a User
  createUser({body}, res) {
    User.create(body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Update a User
  updateUser({params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
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
  addFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      {$addToSet: {friends: params.friendId}},
      {new: true, runValidators: true}
    )
    .then((dbUser) => {
      !dbUser
      ? res.status(404).json({message: "No user found with that id"})
      : res.json({User: "User successfully deleted!"})
    })
    .catch((err) => res.status(500).json(err))
  },
  // Delete Friend
  removeFriend({params}, res) {
    User.findOneAndUpdate(
      {_id: params.userId},
      {$pull: {friends: params.friendId}},
      {new: true}
    )
    .then((dbUser) => {
      !dbUser
      ? res.status(404).json({message: "No user found with that id"})
      : res.json({User: "User successfully deleted!"})
    })
    .catch((err) => res.status(500).json(err))
  },
};
