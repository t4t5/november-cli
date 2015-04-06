module.exports = function(req, res, next) {

  req.models.{{x-singular}}.get(req.params.{{x-singular}}_id, function (err, {{x-singular}}) {
    {{x-singular}}.remove(function (err) {
      if (err) return giveError(err, req, res);
      
      console.log("removed!");
      res.json({});
    });
  });

};