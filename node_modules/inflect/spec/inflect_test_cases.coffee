test_data = {
  singular_to_plural: {
    "search"      : "searches",
    "switch"      : "switches",
    "fix"         : "fixes",
    "box"         : "boxes",
    "process"     : "processes",
    "address"     : "addresses",
    "case"        : "cases",
    "stack"       : "stacks",
    "wish"        : "wishes",
    "fish"        : "fish",
    "jeans"       : "jeans",
    "funky jeans" : "funky jeans",

    "category"    : "categories",
    "query"       : "queries",
    "ability"     : "abilities",
    "agency"      : "agencies",
    "movie"       : "movies",

    "archive"     : "archives",

    "index"       : "indices",

    "wife"        : "wives",
    "safe"        : "saves",
    "half"        : "halves",

    "move"        : "moves",

    "salesperson" : "salespeople",
    "person"      : "people",

    "spokesman"   : "spokesmen",
    "man"         : "men",
    "woman"       : "women",

    "basis"       : "bases",
    "diagnosis"   : "diagnoses",
    "diagnosis_a" : "diagnosis_as",

    "datum"       : "data",
    "medium"      : "media",
    "stadium"     : "stadia",
    "analysis"    : "analyses",

    "node_child"  : "node_children",
    "child"       : "children",

    "experience"  : "experiences",
    "day"         : "days",

    "comment"     : "comments",
    "foobar"      : "foobars",
    "newsletter"  : "newsletters",

    "old_news"    : "old_news",
    "news"        : "news",

    "series"      : "series",
    "species"     : "species",

    "quiz"        : "quizzes",

    "perspective" : "perspectives",

    "ox"          : "oxen",
    "photo"       : "photos",
    "buffalo"     : "buffaloes",
    "tomato"      : "tomatoes",
    "dwarf"       : "dwarves",
    "elf"         : "elves",
    "information" : "information",
    "equipment"   : "equipment",
    "bus"         : "buses",
    "status"      : "statuses",
    "status_code" : "status_codes",
    "mouse"       : "mice",

    "louse"       : "lice",
    "house"       : "houses",
    "octopus"     : "octopi",
    "virus"       : "viri",
    "alias"       : "aliases",
    "portfolio"   : "portfolios",

    "vertex"      : "vertices",
    "matrix"      : "matrices",
    "matrix_fu"   : "matrix_fus",

    "axis"        : "axes",
    "testis"      : "testes",
    "crisis"      : "crises",

    "rice"        : "rice",
    "shoe"        : "shoes",

    "horse"       : "horses",
    "prize"       : "prizes",
    "edge"        : "edges",

    "cow"         : "kine",
    "database"    : "databases"
  }

  camel_to_underscore: {
    "Product"               : "product",
    "SpecialGuest"          : "special_guest",
    "ApplicationController" : "application_controller",
    "Area51Controller"      : "area51_controller"
  }

  underscore_to_lower_camel: {
    "product"                : "product",
    "special_guest"          : "specialGuest",
    "application_controller" : "applicationController",
    "area51_controller"      : "area51Controller"
  }

  camel_to_underscore_without_reverse: {
    "HTMLTidy"              : "html_tidy",
    "HTMLTidyGenerator"     : "html_tidy_generator",
    "FreeBSD"               : "free_bsd",
    "HTML"                  : "html",
  }

  string_to_parameterized: {
    "Donald E. Knuth"                     : "donald-e-knuth",
    "Random text with *(bad)* characters" : "random-text-with-bad-characters",
    "Allow_Under_Scores"                  : "allow_under_scores",
    "Trailing bad characters!@#"          : "trailing-bad-characters",
    "!@#Leading bad characters"           : "leading-bad-characters",
    "Squeeze   separators"                : "squeeze-separators",
    "Test with + sign"                    : "test-with-sign",
  }

  underscore_to_human: {
    "employee_salary" : "Employee salary",
    "employee_id"     : "Employee",
    "underground"     : "Underground"
  }

  mixture_to_title_case: {
    'active_record'       : 'Active Record',
    'ActiveRecord'        : 'Active Record',
    'action web service'  : 'Action Web Service',
    'Action Web Service'  : 'Action Web Service',
    'Action web service'  : 'Action Web Service',
    'actionwebservice'    : 'Actionwebservice',
    'Actionwebservice'    : 'Actionwebservice',
    "david's code"        : "David's Code",
    "David's code"        : "David's Code",
    "david's Code"        : "David's Code"
  }

  ordinal_numbers: {
    "0" : "0th",
    "1" : "1st",
    "2" : "2nd",
    "3" : "3rd",
    "4" : "4th",
    "5" : "5th",
    "6" : "6th",
    "7" : "7th",
    "8" : "8th",
    "9" : "9th",
    "10" : "10th",
    "11" : "11th",
    "12" : "12th",
    "13" : "13th",
    "14" : "14th",
    "20" : "20th",
    "21" : "21st",
    "22" : "22nd",
    "23" : "23rd",
    "24" : "24th",
    "100" : "100th",
    "101" : "101st",
    "102" : "102nd",
    "103" : "103rd",
    "104" : "104th",
    "110" : "110th",
    "111" : "111th",
    "112" : "112th",
    "113" : "113th",
    "1000" : "1000th",
    "1001" : "1001st"
  }

  underscores_to_dashes: {
    "street"                : "street",
    "street_address"        : "street-address",
    "person_street_address" : "person-street-address"
  }

  irregularities: {
    'person' : 'people',
    'man'    : 'men',
    'child'  : 'children',
    'sex'    : 'sexes',
    'move'   : 'moves',
  }
}

if window?
  window.inflect_test_cases = test_data
else
  module.exports = test_data
