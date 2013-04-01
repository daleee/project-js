module.exports = function(app) {
  return {
    milestones: require('./milestones')(app),
    users: require('./users')(app),
    workbreakdown: require('./workbreakdown')(app),
    workitems: require('./workitems')(app),
    workpackages: require('./workpackages')(app),
  };
};