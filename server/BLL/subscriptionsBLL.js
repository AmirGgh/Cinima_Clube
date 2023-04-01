const { Subscription, Movie, Member } = require('../models/allModels');
// GET - Get All - Read
const getAllSubscriptions = async () => {
  let subscriptions = await Subscription.find({})
  return subscriptions
};

// GET - Get By Id - read
const getSubscriptionById = (id) => {
  return Subscription.findById({ _id: id });
};

// POST - Create - first subscription
const addSubscription = async (obj) => {
  const subs = new Subscription(obj);
  const res = await subs.save();
  return res
};

// PUT - Update - add to data
const updateSubscription = async (id, obj) => {
  const res = await Subscription.findOneAndUpdate(
    { _id: id },
    { $push: { movieWatched: obj } },
    { new: true }
  );
  return res
}

// DELETE - Delete
const deleteSubscription = async (id) => {
  await Subscription.findByIdAndDelete(id);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
