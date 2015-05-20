module.exports = function(req, res, render) {

  req.models.{{x-singular-underscore}}.find({
    where: {
      id: req.params.{{x-singular-underscore}}_id 
    } 
  })
  .then(function({{x-singular-camelcase}}) {
    return {{x-singular-camelcase}}.destroy();
  })
  .then(function() {
    res.json({});
  })
  .catch(function(err) {
    render(err);
  });

};