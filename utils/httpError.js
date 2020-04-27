module.exports = function (res, err) {
  res.status(500);
  res.send('Something broke');
  throw new Error(err);
};
