const { User, Thought} = require('../models');

module.exports = {
    // Get all Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then((thoughts) => res.json(thoughts))
        .catch((thoughts) => res.status(500).json(thoughts))
    },
    // Get a Single Thought
    getSingleThought({params}, res) {
        Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .then((thoughts) => {
            !thoughts
            ? res.status(400).json({message: 'No thoughts found with that id'})
            : res.json(thoughts)
        })
        .catch((err) => res.status(500).json(err))
    },
    // Create a Thought
    createThought({ body}, res) {
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push: {thoughts: _id } },
                {new: true}
            );
        })
        .then((dbUserData) => {
            !dbUserData
            ? res.status(400).json({message: 'Thought created but no user with this Id'})
            : res.json({message: 'Thought successfully created!'});
        })
        .catch((err) => res.json(err));

    },
    // Update a Thought
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate({_id: params.id}, body, {
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
    deleteThought({params}, res) {
        Thought.findOneAndDelete({_id: params.id})
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
            {$push: {reactions: body}},
            {new: true, runValidators: true}
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
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
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then((thought) => {
            !thought
            ? res.status(400).json({message: 'No thought with this id'})
            : res.json({thought: 'Reaction successfully deleted!'})
        })
        .catch((err) => res.json(err))
    }
    


}