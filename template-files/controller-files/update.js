module.exports = function(req, res, next) {

  req.models.{{x-singular}}.get(req.params.{{x-singular}}_id, function(err, {{x-singular}}) {
    {{x-singular}}.save(req.body.{{x-singular}}, function(err) {
      if (err) return giveError(err, req, res);
      
      console.log("saved!");
      res.json({{x-singular}});
    });
  });

};