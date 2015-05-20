module.exports = function(req, res, render) {

  req.models.{{x-singular-underscore}}.find({
    where: {
      id: req.params.{{x-singular-underscore}}_id 
    }
  })
  .then(function({{x-singular-camelcase}}) {
    
    /*
     * Set new values like this:
     * {{x-singular}}.some_field_name = req.body.{{x-singular}}.someFieldName;
     */
     
    return {{x-singular-camelcase}}.save();
  })
  .then(function({{x-singular-camelcase}}) {
    render({{x-singular-camelcase}});
  })
  .catch(function(err) {
    render(err);
  });

};