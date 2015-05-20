module.exports = function(req, res, render) {

  req.models.{{x-singular}}.find({
    where: {
      id: req.params.{{x-singular}}_id 
    } 
  })
  .then(function({{x-singular}}) {
    return {{x-singular}}.destroy();
  })
  .then(function() {
    res.json({});
  })
  .catch(function(err) {
    render(err);
  });

};