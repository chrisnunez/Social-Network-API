const { Schema, Types} = require('mongoose');

const thoughtsSchema = new Schema (
    {
        thoughtText: {
            type: String,
            require: true,
            minlength: 1,
            maxlength: 280,
        },

        createdAt: {
            type: Date,
            default: Date.now, // use getter method

        },

        username: {
            type: String,
            required: true
        },

        reactions: [ReactionSchema],

        },

        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        },
    
);

thoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;