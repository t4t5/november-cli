class Inflections
    this.instance = ->
        @__instance__ ||= new this

    constructor: ->
        @plurals = []
        @singulars = []
        @uncountables = []
        @humans = []

    # Specifies a new pluralization rule and its replacement. The rule can either be a string or a regular expression.
    # The replacement should always be a string that may include references to the matched data from the rule.
    plural: (rule, replacement) ->
        if typeof rule == 'string' && (index = @uncountables.indexOf(rule)) != -1
            @uncountables.splice(index, 1)
        if (index = @uncountables.indexOf(replacement)) != -1
            @uncountables.splice(index, 1)
        @plurals.unshift([rule, replacement])

    # Specifies a new singularization rule and its replacement. The rule can either be a string or a regular expression.
    # The replacement should always be a string that may include references to the matched data from the rule.
    singular: (rule, replacement) ->
        if typeof rule == 'string' && (index = @uncountables.indexOf(rule)) != -1
            @uncountables.splice(index, 1)
        if (index = @uncountables.indexOf(replacement)) != -1
            @uncountables.splice(index, 1)
        @singulars.unshift([rule, replacement])

    # Specifies a new irregular that applies to both pluralization and singularization at the same time. This can only be used
    # for strings, not regular expressions. You simply pass the irregular in singular and plural form.
    #
    # ### Examples
    #     irregular 'octopus', 'octopi'
    #     irregular 'person', 'people'
    irregular: (singular, plural) ->
        if (index = @uncountables.indexOf(singular)) != -1
            @uncountables.splice(index, 1)
        if (index = @uncountables.indexOf(plural)) != -1
            @uncountables.splice(index, 1)

        if singular[0].toUpperCase() == plural[0].toUpperCase()
            this.plural(new RegExp("(#{singular[0]})#{singular[1..-1]}$", "i"), '$1' + plural[1..-1])
            this.plural(new RegExp("(#{plural[0]})#{plural[1..-1]}$", "i"), '$1' + plural[1..-1])
            this.singular(new RegExp("(#{plural[0]})#{plural[1..-1]}$", "i"), '$1' + singular[1..-1])
          else
            this.plural(new RegExp("#{singular[0].toUpperCase()}#{singular[1..-1]}$"), plural[0].toUpperCase() + plural[1..-1])
            this.plural(new RegExp("#{singular[0].toLowerCase()}#{singular[1..-1]}$"), plural[0].toLowerCase() + plural[1..-1])
            this.plural(new RegExp("#{plural[0].toUpperCase()}#{plural[1..-1]}$"), plural[0].toUpperCase() + plural[1..-1])
            this.plural(new RegExp("#{plural[0].toLowerCase()}#{plural[1..-1]}$"), plural[0].toLowerCase() + plural[1..-1])
            this.singular(new RegExp("#{plural[0].toUpperCase()}#{plural[1..-1]}$"), singular[0].toUpperCase() + singular[1..-1])
            this.singular(new RegExp("#{plural[0].toLowerCase()}#{plural[1..-1]}$"), singular[0].toLowerCase() + singular[1..-1])

    # Add uncountable words that shouldn't be attempted inflected.
    #
    # ### Examples
    #     uncountable "money"
    #     uncountable "money", "information"
    uncountable: (words...) ->
        @uncountables = @uncountables.concat(words)

    # Specifies a humanized form of a string by a regular expression rule or by a string mapping.
    # When using a regular expression based replacement, the normal humanize formatting is called after the replacement.
    # When a string is used, the human form should be specified as desired (example: 'The name', not 'the_name')
    #
    # ### Examples
    #     human /_cnt$/i, '$1_count'
    #     human "legacy_col_person_name", "Name"
    human: (rule, replacement) ->
        @humans.unshift([rule, replacement])

    # Clears the loaded inflections within a given scope (default is <tt>:all</tt>).
    # Give the scope as a symbol of the inflection type, the options are: <tt>plurals</tt>,
    # <tt>singulars</tt>, <tt>uncountables</tt>, <tt>humans</tt>.
    #
    # ### Examples
    #     clear 'all'
    #     clear 'plurals'
    clear: (scope = 'all') ->
        if scope == 'all'
            @plurals = []
            @singulars = []
            @uncountables = []
            @humans = []
        else
            this[scope] = []

exports.Inflections = Inflections
