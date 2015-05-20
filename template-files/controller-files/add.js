module.exports = function(req, res, render) {

  req.models.{{x-singular-underscore}}
  .create(req.body.{{x-singular-camelcase}})
  .then(function({{x-singular-camelcase}}) {
    render({{x-singular-camelcase}});
  })
  .catch(function(err) {
    render(err);
  });

};