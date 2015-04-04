exports.getRouter = function getRouter(router, controller) {

  // Users
  router.route('/users')
    .get(controller.users.list)
    .post(controller.users.add);
    
  router.route('/users/:user_id')
    .get(controller.users.load)
    .put(controller.users.update)
    .delete(controller.users.remove);

  return router;
}