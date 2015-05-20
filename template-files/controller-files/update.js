module.exports = function(req, res, render) {

  req.models.{{x-singular}}.find({
    where: {
      id: req.params.{{x-singular}}_id 
    }
  })
  .then(function({{x-singular}}) {
    
    /*
     * Set new values like this:
     * {{x-singular}}.some_field_name = req.body.{{x-singular}}.someFieldName;
     */
     
    return {{x-singular}}.save();
  })
  .then(function({{x-singular}}) {
    render({{x-singular}});
  })
  .catch(function(err) {
    render(err);
  });

};