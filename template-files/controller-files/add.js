module.exports = function(req, res, next) {

  req.models.{{x-singular}}.create(req.body.{{x-singular}}, function (err, {{x-singular}}) {
    if (err) return giveError(err, req, res);
    
    console.log({{x-singular}});
    res.json({{x-singular}});
  });

};