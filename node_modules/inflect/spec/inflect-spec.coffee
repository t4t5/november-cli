inflect = require('../src/inflect')
inflect_test_cases = require('./inflect_test_cases')

vows = require('vows')
assert = require('assert')

vows.describe('Inflect').addBatch(
    'pluralize plurals': ->
        assert.equal inflect.pluralize('plurals'), 'plurals'
        assert.equal inflect.pluralize('Plurals'), 'Plurals'

    'pluralize empty string': ->
        assert.equal inflect.pluralize(''), ''

    'uncountability': ->
        for word in inflect.inflections().uncountable()
            assert.equal inflect.singularize(word), word
            assert.equal inflect.pluralize(word), word
            assert.equal inflect.singularize(word), inflect.pluralize(word)

    'uncountable word is not greedy': ->
        uncountable_word = 'ors'
        countable_word = 'sponsor'

        cached_uncountables = inflect.inflections().uncountables

        inflect.inflections().uncountable(uncountable_word)

        assert.equal(inflect.singularize(uncountable_word), uncountable_word)
        assert.equal(inflect.pluralize(uncountable_word), uncountable_word)
        assert.equal(inflect.singularize(uncountable_word), inflect.pluralize(uncountable_word))

        assert.equal(inflect.singularize(countable_word), 'sponsor')
        assert.equal(inflect.pluralize(countable_word), 'sponsors')
        assert.equal(inflect.singularize(inflect.pluralize(countable_word)), 'sponsor')

        inflect.inflections().uncountables = cached_uncountables

    'capitalize': ->
        assert.equal(inflect.capitalize('USER'), 'User')
        assert.equal(inflect.capitalize('übercool'), 'Übercool')

    'decapitalize': ->
        assert.equal(inflect.decapitalize('SomeMethodName'), 'someMethodName')
        assert.equal(inflect.decapitalize('Übercool'), 'übercool')
        assert.equal(inflect.decapitalize('USER'), 'uSER')

    'pluralize singular': ->
        for singular, plural of inflect_test_cases.singular_to_plural
            assert.equal(inflect.pluralize(singular), plural)
            assert.equal(inflect.pluralize(inflect.capitalize(singular)), inflect.capitalize(plural))

    'pluralize plural': ->
        for singular, plural of inflect_test_cases.singular_to_plural
            assert.equal(inflect.pluralize(plural), plural)
            assert.equal(inflect.pluralize(inflect.capitalize(plural)), inflect.capitalize(plural))

    'singularize plural': ->
        for singular, plural of inflect_test_cases.singular_to_plural
            assert.equal(inflect.singularize(plural), singular)
            assert.equal(inflect.singularize(inflect.capitalize(plural)), inflect.capitalize(singular))

    'titleize': ->
        for before, titleized of inflect_test_cases.mixture_to_title_case
            assert.equal(inflect.titleize(before), titleized)

    'camelize': ->
        for camel, underscore of inflect_test_cases.camel_to_underscore
            assert.equal(inflect.camelize(underscore), camel)

    'camelize with lower downcases the first letter': ->
        assert.equal(inflect.camelize('Capital', false), 'capital')

    'underscore': ->
        for camel, underscore of inflect_test_cases.camel_to_underscore
            assert.equal(inflect.underscore(camel), underscore)
        for camel, underscore of inflect_test_cases.camel_to_underscore_without_reverse
            assert.equal(inflect.underscore(camel), underscore)

    'parameterize': ->
        for some_string, parameterized_string of inflect_test_cases.string_to_parameterized
            assert.equal(inflect.parameterize(some_string), parameterized_string)

    'parameterize with custom separator': ->
        for some_string, parameterized_string of inflect_test_cases.string_to_parameterized
            assert.equal(inflect.parameterize(some_string, '_'), parameterized_string.replace(/-/g, '_'))

    'parameterize with multi character separator': ->
        for some_string, parameterized_string of inflect_test_cases.string_to_parameterized
            assert.equal(inflect.parameterize(some_string, '__sep__'), parameterized_string.replace(/-/g, '__sep__'))

    'humanize': ->
        for underscore, human of inflect_test_cases.underscore_to_human
            assert.equal(inflect.humanize(underscore), human)

    'humanize by rule': ->
        inflect.inflections (inflect) ->
            inflect.human(/_cnt$/i, '_count')
            inflect.human(/^prefx_/i, '')
        assert.equal(inflect.humanize('jargon_cnt'), 'Jargon count')
        assert.equal(inflect.humanize('prefx_request'), 'Request')

    'humanize by string': ->
        inflect.inflections (inflect) ->
            inflect.human('col_rpted_bugs', 'Reported bugs')
        assert.equal(inflect.humanize('col_rpted_bugs'), 'Reported bugs')
        assert.equal(inflect.humanize('COL_rpted_bugs'), 'Col rpted bugs')

    'ordinal': ->
        for number, ordinalized of inflect_test_cases.ordinal_numbers
            assert.equal(inflect.ordinalize(number), ordinalized)

    'dasherize': ->
        for underscored, dasherized of inflect_test_cases.underscores_to_dashes
            assert.equal(inflect.dasherize(underscored), dasherized)

    'underscore as reverse of dasherize': ->
        for underscored, dasherized of inflect_test_cases.underscores_to_dashes
            assert.equal(inflect.underscore(inflect.dasherize(underscored)), underscored)

    'underscore to lower camel': ->
        for underscored, lower_camel of inflect_test_cases.underscore_to_lower_camel
            assert.equal(inflect.camelize(underscored, false), lower_camel)

    'overwrite previous inflectors': ->
        assert.equal(inflect.singularize('series'), 'series')
        inflect.inflections().singular('series', 'serie')
        assert.equal(inflect.singularize('series'), 'serie')
        inflect.inflections().uncountable('series') # Return to normal

    'clear': ->
        for inflection_type in ['plurals', 'singulars', 'uncountables', 'humans']
            cached_values = inflect.inflections()[inflection_type]
            inflect.inflections().clear(inflection_type)
            assert.equal(inflect.inflections()[inflection_type].length, 0)
            inflect.inflections()[inflection_type] = cached_values

    'clear all': ->
        cached_values = {}
        inflection_types = ['plurals', 'singulars', 'uncountables', 'humans']
        for inflection_type in inflection_types
            cached_values[inflection_type] = inflect.inflections()[inflection_type]
        inflect.inflections().clear('all')
        for inflection_type in inflection_types
            assert.equal(inflect.inflections()[inflection_type].length, 0)
            inflect.inflections()[inflection_type] = cached_values[inflection_type]

    'clear with default': ->
        cached_values = {}
        inflection_types = ['plurals', 'singulars', 'uncountables', 'humans']
        for inflection_type in inflection_types
            cached_values[inflection_type] = inflect.inflections()[inflection_type]
        inflect.inflections().clear()
        for inflection_type in inflection_types
            assert.equal(inflect.inflections()[inflection_type].length, 0)
            inflect.inflections()[inflection_type] = cached_values[inflection_type]

    'irregularity between singular and plural': ->
        for singular, plural of inflect_test_cases.irregularities
            inflect.inflections().irregular(singular, plural)
            assert.equal(inflect.singularize(plural), singular)
            assert.equal(inflect.pluralize(singular), plural)

    'pluralize of irregularity plural should be the same': ->
        for singular, plural of inflect_test_cases.irregularities
            inflect.inflections().irregular(singular, plural)
            assert.equal(inflect.pluralize(plural), plural)

    'register string extensions': ->
        string_extensions = ['pluralize', 'singularize', 'capitalize', 'decapitalize', 'camelize', 'titleize', 'underscore', 'dasherize', 'parameterize', 'humanize']
        for method in string_extensions
            assert.equal('inflect'[method], undefined)
        inflect.enableStringExtensions()
        for method in string_extensions
            assert.notEqual('inflect'[method], undefined)
            assert.equal('inflect'[method](), inflect[method]('inflect'))

    'register number extensions': ->
        number_extensions = ['ordinalize']
        for method in number_extensions
            assert.equal(123[method], undefined)
        inflect.enableNumberExtensions()
        for method in number_extensions
            assert.notEqual(123[method], undefined)
            assert.equal(123[method](), inflect[method](123))
).export(module)
