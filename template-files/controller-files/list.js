module.exports = function(req, res, render) {

  req.models.{{x-singular}}
  .findAll()
  .then(function({{x-plural}}) {
    render({{x-plural}});
  })
  .catch(function(err) {
    render(err);
  });

};