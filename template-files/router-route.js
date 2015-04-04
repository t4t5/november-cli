  // {{x-plural-capitalize}}
  router.route('/{{x-plural}}')
    .get(controller.{{x-plural}}.list)
    .post(controller.{{x-plural}}.add);
    
  router.route('/{{x-plural}}/:{{x-singular}}_id')
    .get(controller.{{x-plural}}.load)
    .put(controller.{{x-plural}}.update)
    .delete(controller.{{x-plural}}.remove);