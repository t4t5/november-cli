inflect = require('../inflect')

enableStringExtensions = ->
    # Returns the plural form of the word in the string.
    #
    # ### Examples
    #     "post".pluralize()             # => "posts"
    #     "octopus".pluralize()          # => "octopi"
    #     "sheep".pluralize()            # => "sheep"
    #     "words".pluralize()            # => "words"
    #     "CamelOctopus".pluralize()     # => "CamelOctopi"
    String::pluralize = ->
        inflect.pluralize(this)

    # The reverse of <tt>pluralize</tt>, returns the singular form of a word in a string.
    #
    # ### Examples
    #     "posts".singularize()            # => "post"
    #     "octopi".singularize()           # => "octopus"
    #     "sheep".singularize()            # => "sheep"
    #     "word".singularize()             # => "word"
    #     "CamelOctopi".singularize()      # => "CamelOctopus"
    String::singularize = ->
        inflect.singularize(this)

    # By default, <tt>camelize</tt> converts strings to UpperCamelCase. If the argument to <tt>camelize</tt>
    # is set to <tt>false</tt> then <tt>camelize</tt> produces lowerCamelCase.
    #
    # ### Examples
    #     "active_record".camelize()              # => "ActiveRecord"
    #     "active_record".camelize(false)         # => "activeRecord"
    #
    # As a rule of thumb you can think of <tt>camelize</tt> as the inverse of <tt>underscore</tt>,
    # though there are cases where that does not hold:
    #
    #     "SSLError".underscore().camelize() # => "SslError"
    String::camelize = (first_letter_in_uppercase = true) ->
        inflect.camelize(this, first_letter_in_uppercase)

    # Converts the first character to uppercase and the remainder to lowercase.
    #
    # ### Examples
    #     'über'.capitalize() # => "Über"
    String::capitalize = ->
        inflect.capitalize(this)

    # Converts the first character to lowercase and leaves the remainder intact.
    #
    # ### Examples
    #     'über'.capitalize() # => "Über"
    String::decapitalize = ->
        inflect.decapitalize(this)

    # Capitalizes all the words and replaces some characters in the string to create
    # a nicer looking title. <tt>titleize</tt> is meant for creating pretty output.
    #
    # ### Examples
    #     "man from the boondocks".titleize() # => "Man From The Boondocks"
    #     "x-men: the last stand".titleize()  # => "X Men: The Last Stand"
    String::titleize = ->
        inflect.titleize(this)

    # Makes an underscored, lowercase form from the expression in the string.
    #
    # ### Examples
    #     "ActiveRecord".underscore()         # => "active_record"
    #
    # As a rule of thumb you can think of <tt>underscore</tt> as the inverse of <tt>camelize</tt>,
    # though there are cases where that does not hold:
    #
    #     "SSLError".underscore().camelize() # => "SslError"
    String::underscore = ->
        inflect.underscore(this)

    # Replaces underscores with dashes in the string.
    #
    # ### Examples
    #     "puni_puni" # => "puni-puni"
    String::dasherize = ->
        inflect.dasherize(this)

    # Replaces special characters in a string so that it may be used as part of a 'pretty' URL.
    #
    # ### Examples
    #     "Donald E. Knuth".parameterize()         # => "donald-e-knuth"
    #     "Donald E. Knuth".parameterize('_')      # => "donald_e_knuth"
    String::parameterize = (sep = '-') ->
        inflect.parameterize(this, sep)

    # Capitalizes the first word and turns underscores into spaces and strips a
    # trailing "_id", if any. Like <tt>titleize</tt>, this is meant for creating pretty output.
    #
    # ### Examples
    #     "employee_salary" # => "Employee salary"
    #     "author_id"       # => "Author"
    String::humanize = ->
        inflect.humanize(this)

exports.enableStringExtensions = enableStringExtensions
