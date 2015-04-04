inflections = require('../inflect').inflections

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
camelize = (lower_case_and_underscored_word, first_letter_in_uppercase = true) ->
    rest = lower_case_and_underscored_word.replace /_./g, (val) -> val[1..-1].toUpperCase()
    if first_letter_in_uppercase
        lower_case_and_underscored_word[0].toUpperCase() + rest[1..-1]
    else
        lower_case_and_underscored_word[0].toLowerCase() + rest[1..-1]

# Makes an underscored, lowercase form from the expression in the string.
#
# ### Examples
#     "ActiveRecord".underscore()         # => "active_record"
#
# As a rule of thumb you can think of <tt>underscore</tt> as the inverse of <tt>camelize</tt>,
# though there are cases where that does not hold:
#
#     "SSLError".underscore().camelize() # => "SslError"
underscore = (camel_cased_word) ->
    word = camel_cased_word.toString()
    word = word.replace(/([A-Z]+)([A-Z][a-z])/g,'$1_$2')
    word = word.replace(/([a-z\d])([A-Z])/g,'$1_$2')
    word = word.replace(/-/g, '_')
    word = word.toLowerCase()
    word

# Replaces underscores with dashes in the string.
#
# ### Examples
#     "puni_puni" # => "puni-puni"
dasherize = (underscored_word) ->
    underscored_word.replace(/_/g, '-')

# Capitalizes all the words and replaces some characters in the string to create
# a nicer looking title. <tt>titleize</tt> is meant for creating pretty output.
#
# ### Examples
#     "man from the boondocks".titleize() # => "Man From The Boondocks"
#     "x-men: the last stand".titleize()  # => "X Men: The Last Stand"
titleize = (word) ->
    humanize(underscore(word)).replace /\b('?[a-z])/g, (val) -> capitalize(val)

# Converts the first character to uppercase and the remainder to lowercase.
#
# ### Examples
#     'über'.capitalize() # => "Über"
capitalize = (word) ->
    (word[0] || '').toUpperCase() + (word[1..-1] || '').toLowerCase()

# Converts the first character to lowercase and leaves the remainder intact.
#
# ### Examples
#     'über'.capitalize() # => "Über"
decapitalize = (word) ->
    (word[0] || '').toLowerCase() + (word[1..-1] || '')

# Returns the plural form of the word in the string.
#
# ### Examples
#     "post".pluralize()             # => "posts"
#     "octopus".pluralize()          # => "octopi"
#     "sheep".pluralize()            # => "sheep"
#     "words".pluralize()            # => "words"
#     "CamelOctopus".pluralize()     # => "CamelOctopi"
pluralize = (word) ->
    result = word.toString()

    if word.length == 0 || inflections().uncountables.indexOf(result.toLowerCase()) != -1
        result
    else
        for plural in inflections().plurals
            rule = plural[0]
            replacement = plural[1]
            if result.search(rule) != -1
                result = result.replace(rule, replacement)
                break
        result

# The reverse of <tt>pluralize</tt>, returns the singular form of a word in a string.
#
# ### Examples
#     "posts".singularize()            # => "post"
#     "octopi".singularize()           # => "octopus"
#     "sheep".singularize()            # => "sheep"
#     "word".singularize()             # => "word"
#     "CamelOctopi".singularize()      # => "CamelOctopus"
singularize = (word) ->
    result = word.toString()

    uncountable = false
    for inflection in inflections().uncountables
        if result.search(new RegExp("\\b#{inflection}$", 'i')) != -1
            uncountable = true
            break

    if word.length == 0 || uncountable
        result
    else
        for singular in inflections().singulars
            rule = singular[0]
            replacement = singular[1]
            if result.search(rule) != -1
                result = result.replace(rule, replacement)
                break
        result

# Capitalizes the first word and turns underscores into spaces and strips a
# trailing "_id", if any. Like <tt>titleize</tt>, this is meant for creating pretty output.
#
# ### Examples
#     "employee_salary" # => "Employee salary"
#     "author_id"       # => "Author"
humanize = (lower_case_and_underscored_word) ->
    result = lower_case_and_underscored_word.toString()

    for human in inflections().humans
        rule = human[0]
        replacement = human[1]
        if result.search(rule) != -1
            result = result.replace(rule, replacement)
            break

    capitalize(result.replace(/_id$/, '').replace(/_/g, ' '))

# Turns a number into an ordinal string used to denote the position in an
# ordered sequence such as 1st, 2nd, 3rd, 4th.
#
# ### Examples
#     ordinalize(1)     # => "1st"
#     ordinalize(2)     # => "2nd"
#     ordinalize(1002)  # => "1002nd"
#     ordinalize(1003)  # => "1003rd"
ordinalize = (number) ->
    number_int = parseInt(number, 10)
    if [11..13].indexOf(number_int % 100) != -1
        "#{number}th"
    else
        switch number_int % 10
            when 1 then "#{number}st"
            when 2 then "#{number}nd"
            when 3 then "#{number}rd"
            else "#{number}th"

# Replaces special characters in a string so that it may be used as part of a 'pretty' URL.
#
# ### Examples
#     parameterize("Donald E. Knuth")         # => "donald-e-knuth"
#     parameterize("Donald E. Knuth", '_')     # => "donald_e_knuth"
parameterize = (string, sep = '-') ->
    parameterized_string = string.toString()
    # Turn unwanted chars into the separator
    parameterized_string = parameterized_string.replace(/[^a-z0-9\-_]+/gi, sep)
    if sep?
        # No more than one of the separator in a row.
        parameterized_string = parameterized_string.replace(new RegExp("#{sep}{2,}", 'g'), sep)
        # Remove leading/trailing separator.
        parameterized_string = parameterized_string.replace(new RegExp("^#{sep}|#{sep}$", 'gi'), '')
    parameterized_string.toLowerCase()

exports.camelize = camelize
exports.underscore = underscore
exports.dasherize = dasherize
exports.titleize = titleize
exports.capitalize = capitalize
exports.decapitalize = decapitalize
exports.pluralize = pluralize
exports.singularize = singularize
exports.humanize = humanize
exports.ordinalize = ordinalize
exports.parameterize = parameterize
