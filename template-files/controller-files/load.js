module.exports = function(req, res, render) {

  req.models.{{x-singular}}.find({
    where: {
      id: req.params.{{x-singular}}_id 
    }
  })
  .then(function({{x-singular}}) {
    render({
      model: {{x-singular}}
    });
  })
  .catch(function(err) {
    render(err);
  });

};