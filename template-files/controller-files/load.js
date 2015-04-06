module.exports = function(req, res, next) {

  req.models.{{x-singular}}.get(req.params.{{x-singular}}_id, function(err, {{x-singular}}) {
    if (err) return giveError(err, req, res);

    res.json({ {{x-singular}}: {{x-singular}} });
  });

};