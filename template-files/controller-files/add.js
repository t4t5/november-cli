module.exports = function(req, res, render) {

  req.models.{{x-singular}}
  .create(req.body.{{x-singular}})
  .then(function({{x-singular}}) {
    render({{x-singular}});
  })
  .catch(function(err) {
    render(err);
  });

};