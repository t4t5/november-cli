  // {{x-table}}
  app.route('/{{x-plural}}')
    .get(controller.{{x-plural}}.list)
    .post(controller.{{x-plural}}.add);
    
 app.route('/{{x-plural}}/:{{x-singular}}_id')
    .get(controller.{{x-plural}}.load)
    .put(controller.{{x-plural}}.update)
    .delete(controller.{{x-plural}}.remove);