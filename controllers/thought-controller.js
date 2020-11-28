
const { Thought, User } = require('../models');

const ThoughtController = {
    // add Thought to User
    addThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $addToSet: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No Thoughts found' })
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    },

    // get thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({
            _id: params.thoughtId
        })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No Thoughts found' })
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    },

    // Update Thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { thoughtText: body.thoughtText },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // add reaction to Thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )

            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove Thought
    removeThought({ params, body }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId },)
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No Thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // remove reaction
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => {
                res.json(dbThoughtData)
            })
            .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;