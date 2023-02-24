const { Subscription } = require('../models/allModels');

// GET - Get All - Read
const getAllSubscriptions = async () => {
  let subscriptions = await Subscription.find({})
  return subscriptions
};

// GET - Get By Id - read
const getSubscriptionById = (id) => {
  return Subscription.findById({ _id: id });
};

// POST - Create
const addSubscription = async (obj) => {
  const subs = new Subscription(obj);
  await subs.save();
  return 'Created!';
};

// PUT - Update
const updateSubscription = async (id, obj) => {
  await Subscription.findByIdAndUpdate(id, obj);
  return 'Updated!';
};

// DELETE - Delete
const deleteSubscription = async (id) => {
  await Subscription.findByIdAndDelete(id);
  return 'Deleted!';
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
