module.exports = function(req, res, next) {

  req.models.{{x-singular}}.find(function(err, {{x-plural}}) {
    if (err) return giveError(err, req, res);

    res.json({ {{x-plural}}: {{x-plural}} });
  });

};