module.exports = function(req, res, render) {

  req.models.{{x-singular-underscore}}
  .findAll()
  .then(function({{x-plural-camelcase}}) {
    render({{x-plural-camelcase}});
  })
  .catch(function(err) {
    render(err);
  });

};