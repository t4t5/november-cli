module.exports = function(orm, db) {
  db.alias.{{x-singular}} = db.define('{{x-table}}', {
    // name: { type: 'text', required: true }
  },
  {
    hooks: {
      // Hooks
    },
    validations: {
      // Validations
    },
    methods: {
      // Methods
    }
  });
};