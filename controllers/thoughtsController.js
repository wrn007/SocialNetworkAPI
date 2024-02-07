const { Thought } = require('../models');

module.exports = {
  async getThoughts(_, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      return res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      return res.json({ message: 'Thought deleted!' });
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      return res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {
          $addToSet: {
            reactions: {
              username: req.body.username,
              reactionBody: req.body.reactionBody,
            },
          },
        },
        { runValidators: true, new: true }
      ).select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      return res.json([ { message: 'The reaction was added successfully!' }, thought ]);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { $in: [req.params.reactionId] } } },
        { new: true}
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      const updatedThought = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v');
      return res.json([{ message: 'Reaction was removed.' }, updatedThought]);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};