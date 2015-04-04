module('Inflect')
test 'pluralize plurals', ->
  equal inflect.pluralize('plurals'), 'plurals'
  equal inflect.pluralize('Plurals'), 'Plurals'

test 'pluralize empty string', ->
  equal inflect.pluralize(''), ''

test 'uncountability', ->
  for word in inflect.inflections().uncountable()
    equal inflect.singularize(word), word
    equal inflect.pluralize(word), word
    equal inflect.singularize(word), inflect.pluralize(word)

test 'uncountable word is not greedy', ->
    uncountable_word = 'ors'
    countable_word = 'sponsor'

    cached_uncountables = inflect.inflections().uncountables

    inflect.inflections().uncountable(uncountable_word)

    equal(inflect.singularize(uncountable_word), uncountable_word)
    equal(inflect.pluralize(uncountable_word), uncountable_word)
    equal(inflect.singularize(uncountable_word), inflect.pluralize(uncountable_word))

    equal(inflect.singularize(countable_word), 'sponsor')
    equal(inflect.pluralize(countable_word), 'sponsors')
    equal(inflect.singularize(inflect.pluralize(countable_word)), 'sponsor')

    inflect.inflections().uncountables = cached_uncountables

test 'capitalize', ->
    equal(inflect.capitalize('USER'), 'User')
    equal(inflect.capitalize('übercool'), 'Übercool')

test 'decapitalize', ->
    equal(inflect.decapitalize('SomeMethodName'), 'someMethodName')
    equal(inflect.decapitalize('Übercool'), 'übercool')
    equal(inflect.decapitalize('USER'), 'uSER')

test 'pluralize singular', ->
    for singular, plural of inflect_test_cases.singular_to_plural
        equal(inflect.pluralize(singular), plural)
        equal(inflect.pluralize(inflect.capitalize(singular)), inflect.capitalize(plural))

test 'pluralize plural', ->
    for singular, plural of inflect_test_cases.singular_to_plural
        equal(inflect.pluralize(plural), plural)
        equal(inflect.pluralize(inflect.capitalize(plural)), inflect.capitalize(plural))

test 'singularize plural', ->
    for singular, plural of inflect_test_cases.singular_to_plural
        equal(inflect.singularize(plural), singular)
        equal(inflect.singularize(inflect.capitalize(plural)), inflect.capitalize(singular))

test 'titleize', ->
    for before, titleized of inflect_test_cases.mixture_to_title_case
        equal(inflect.titleize(before), titleized)

test 'camelize', ->
    for camel, underscore of inflect_test_cases.camel_to_underscore
        equal(inflect.camelize(underscore), camel)

test 'camelize with lower downcases the first letter', ->
    equal(inflect.camelize('Capital', false), 'capital')

test 'underscore', ->
    for camel, underscore of inflect_test_cases.camel_to_underscore
        equal(inflect.underscore(camel), underscore)
    for camel, underscore of inflect_test_cases.camel_to_underscore_without_reverse
        equal(inflect.underscore(camel), underscore)

test 'parameterize', ->
    for some_string, parameterized_string of inflect_test_cases.string_to_parameterized
        equal(inflect.parameterize(some_string), parameterized_string)

test 'parameterize with custom separator', ->
    for some_string, parameterized_string of inflect_test_cases.string_to_parameterized
        equal(inflect.parameterize(some_string, '_'), parameterized_string.replace(/-/g, '_'))

test 'parameterize with multi character separator', ->
    for some_string, parameterized_string of inflect_test_cases.string_to_parameterized
        equal(inflect.parameterize(some_string, '__sep__'), parameterized_string.replace(/-/g, '__sep__'))

test 'humanize', ->
    for underscore, human of inflect_test_cases.underscore_to_human
        equal(inflect.humanize(underscore), human)

test 'humanize by rule', ->
    inflect.inflections (inflect) ->
        inflect.human(/_cnt$/i, '_count')
        inflect.human(/^prefx_/i, '')
    equal(inflect.humanize('jargon_cnt'), 'Jargon count')
    equal(inflect.humanize('prefx_request'), 'Request')

test 'humanize by string', ->
    inflect.inflections (inflect) ->
        inflect.human('col_rpted_bugs', 'Reported bugs')
    equal(inflect.humanize('col_rpted_bugs'), 'Reported bugs')
    equal(inflect.humanize('COL_rpted_bugs'), 'Col rpted bugs')

test 'ordinal', ->
    for number, ordinalized of inflect_test_cases.ordinal_numbers
        equal(inflect.ordinalize(number), ordinalized)

test 'dasherize', ->
    for underscored, dasherized of inflect_test_cases.underscores_to_dashes
        equal(inflect.dasherize(underscored), dasherized)

test 'underscore as reverse of dasherize', ->
    for underscored, dasherized of inflect_test_cases.underscores_to_dashes
        equal(inflect.underscore(inflect.dasherize(underscored)), underscored)

test 'underscore to lower camel', ->
    for underscored, lower_camel of inflect_test_cases.underscore_to_lower_camel
        equal(inflect.camelize(underscored, false), lower_camel)

test 'overwrite previous inflectors', ->
    equal(inflect.singularize('series'), 'series')
    inflect.inflections().singular('series', 'serie')
    equal(inflect.singularize('series'), 'serie')
    inflect.inflections().uncountable('series') # Return to normal

test 'clear', ->
    for inflection_type in ['plurals', 'singulars', 'uncountables', 'humans']
        cached_values = inflect.inflections()[inflection_type]
        inflect.inflections().clear(inflection_type)
        equal(inflect.inflections()[inflection_type].length, 0)
        inflect.inflections()[inflection_type] = cached_values

test 'clear all', ->
    cached_values = {}
    inflection_types = ['plurals', 'singulars', 'uncountables', 'humans']
    for inflection_type in inflection_types
        cached_values[inflection_type] = inflect.inflections()[inflection_type]
    inflect.inflections().clear('all')
    for inflection_type in inflection_types
        equal(inflect.inflections()[inflection_type].length, 0)
        inflect.inflections()[inflection_type] = cached_values[inflection_type]

test 'clear with default', ->
    cached_values = {}
    inflection_types = ['plurals', 'singulars', 'uncountables', 'humans']
    for inflection_type in inflection_types
        cached_values[inflection_type] = inflect.inflections()[inflection_type]
    inflect.inflections().clear()
    for inflection_type in inflection_types
        equal(inflect.inflections()[inflection_type].length, 0)
        inflect.inflections()[inflection_type] = cached_values[inflection_type]

test 'irregularity between singular and plural', ->
    for singular, plural of inflect_test_cases.irregularities
        inflect.inflections().irregular(singular, plural)
        equal(inflect.singularize(plural), singular)
        equal(inflect.pluralize(singular), plural)

test 'pluralize of irregularity plural should be the same', ->
    for singular, plural of inflect_test_cases.irregularities
        inflect.inflections().irregular(singular, plural)
        equal(inflect.pluralize(plural), plural)

test 'register string extensions', ->
    string_extensions = ['pluralize', 'singularize', 'capitalize', 'decapitalize', 'camelize', 'titleize', 'underscore', 'dasherize', 'parameterize', 'humanize']
    for method in string_extensions
        equal('inflect'[method], undefined)
    inflect.enableStringExtensions()
    for method in string_extensions
        notEqual('inflect'[method], undefined)
        equal('inflect'[method](), inflect[method]('inflect'))

test 'register number extensions', ->
    number_extensions = ['ordinalize']
    for method in number_extensions
        equal(123[method], undefined)
    inflect.enableNumberExtensions()
    for method in number_extensions
        notEqual(123[method], undefined)
        equal(123[method](), inflect[method](123))
