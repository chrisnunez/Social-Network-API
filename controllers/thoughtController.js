const { json } = require('body-parser');
const {User, Thought} = require('../models');

module.exports = {
    // Get all Thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((thoughts) => res.status(500).json(thoughts))
    },
    // Get a Single Thought
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thoughts) => {
            !thoughts
            ? res.status(400).json({message: 'No thoughts found with that id'})
            : res.json(thoughts)
        })
        .catch((err) => res.status(500).json(err))
    },
    // Create a Thought
    createThought({ params, body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id}},
                {new: true}
            );
        })
        .then((dbUserData) => {
            !dbUserData
            ? res.status(400).json({message: 'Thought created but not user with this Id'})
            : res.json({message: 'Thought successfully created!'});
        })
        .catch((err) => res.json(err));

    },
    // Update a Thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, body, {
            new: true,
            runValidators: true,
        }) 
        .then((thought) => 
            !thought
            ? res.status(404).json({message: 'No thought found with that id'})
            : res.json(thought)
        
        )
        .catch((err) => res.status(500).json(err));
        
    },
    //Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
        ? res.status(400).json({message:'No thought found with that id'})
        : res.json({Thought: 'Thought successfully deleted!'})
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create reaction
    addReaction({params, body}, res ) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$addToSet: {reactions: body}},
            {new: true, runValidators: true}
        )
        .then ((thought) => {
            !thought
            ? res.status(400).json({ message: 'No thought with this id'})
            : res.json(thought);
        })
        .catch((err) => res.status(500).json(err))
    },
    // Delete Reaction
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {ractionsId: params.reactionId}}},
            {new: true}
        )
        .then((thought) => res.json(thought))
        .catch((err) => res.json(err))
    }
    


}