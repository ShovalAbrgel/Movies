const mongoose = require('mongoose');

const SubscriptionsSchema = new mongoose.Schema({
    MemberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    },
    Movies: [
        {
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Movie'
            },
            movieName: String,
            date: String
        }
    ]
}, { versionKey: false, collection: 'Subscriptions' });

const Subscription = mongoose.model('Subscription', SubscriptionsSchema);

module.exports = Subscription;
