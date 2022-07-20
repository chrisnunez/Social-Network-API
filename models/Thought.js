const { Schema, model, Types } = require("mongoose");
// const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },

  username: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // get: (timestamp) => dateFormat(timestamp),
  },
});

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now, 
    },

    username: {
      type: String,
      required: true,
    },

    reactions: [ReactionSchema]
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtsSchema);

module.exports = Thought;
