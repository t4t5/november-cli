Inflections = require('./inflections').Inflections

# Yields a singleton instance of Inflections so you can specify additional inflector rules.
#
# ### Examples
#     inflect.inflections (inflect) ->
#       inflect.uncountable "rails"
inflections = (callback) ->
    callback.call(this, Inflections.instance()) if callback?
    Inflections.instance()

exports.Inflections = Inflections
exports.inflections = inflections

# methods
methods = require('./methods')
exports.camelize = methods.camelize
exports.underscore = methods.underscore
exports.dasherize = methods.dasherize
exports.titleize = methods.titleize
exports.capitalize = methods.capitalize
exports.decapitalize = methods.decapitalize
exports.pluralize = methods.pluralize
exports.singularize = methods.singularize
exports.humanize = methods.humanize
exports.ordinalize = methods.ordinalize
exports.parameterize = methods.parameterize

# Base object extensions
#
# These methods can be used to extend the built-in String and Number classes
# with additional convenience methods.
#
# ### Examples
#     1.ordinalize()          # => "1st"
#     "post".pluralize()      # => "posts"
#
# They extend Base objects - so use with care and only enable them if you knwo what you are doing.
string_extensions = require('./string_extensions')
number_extensions = require('./number_extensions')
exports.enableStringExtensions = string_extensions.enableStringExtensions
exports.enableNumberExtensions = number_extensions.enableNumberExtensions
exports.enableExtensions = ->
    string_extensions.enableStringExtensions()
    number_extensions.enableNumberExtensions()

# default inflections
require('./default_inflections')
