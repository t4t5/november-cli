  // {{x-human}}
  app.route('/{{x-plural-camelcase}}')
    .get(controllers.{{x-singular-underscore}}.list)
    .post(controllers.{{x-singular-underscore}}.add);
    
  app.route('/{{x-plural-camelcase}}/:{{x-singular-underscore}}_id')
    .get(controllers.{{x-singular-underscore}}.load)
    .put(controllers.{{x-singular-underscore}}.update)
    .delete(controllers.{{x-singular-underscore}}.remove);