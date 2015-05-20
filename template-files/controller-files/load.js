module.exports = function(req, res, render) {

  req.models.{{x-singular-underscore}}.find({
    where: {
      id: req.params.{{x-singular-underscore}}_id 
    }
  })
  .then(function({{x-singular-camelcase}}) {
    render({
      model: {{x-singular-camelcase}}
    });
  })
  .catch(function(err) {
    render(err);
  });

};