# Inflect [![Build Status](https://secure.travis-ci.org/MSNexploder/inflect.png)](http://travis-ci.org/MSNexploder/inflect)

A port of the Rails / ActiveSupport inflector to JavaScript (node.js and browser compatible).

## Install

    npm install inflect

[Client version](https://raw.github.com/MSNexploder/inflect/master/client/inflect.js)

[Client version (minified)](https://raw.github.com/MSNexploder/inflect/master/client/inflect.min.js)

## Documentation

[Documentation](http://msnexploder.github.com/inflect)

## Usage

    inflect.pluralize('user'); // users

    inflect.singularize('users'); // user

    inflect.camelize('users_controller'); // UsersController

    inflect.capitalize('user'); // User

    inflect.decapitalize('User'); // user

    inflect.titleize('man from the boondocks'); // Man From The Boondocks

    inflect.underscore('UsersController'); // users_controller

    inflect.dasherize('puni_puni'); // puni-puni

    inflect.parameterize('Donald E. Knuth'); // donald-e-knuth

    inflect.humanize('employee_salary'); // Employee salary

## Note on Patches/Pull Requests

* Fork the project.
* Make your feature addition or bug fix.
* Commit, do not mess with cakefile, package.json, version, or history. (if you want to have your own version, that is fine but bump version in a commit by itself I can ignore when I pull)
* Send me a pull request. Bonus points for topic branches.

## License

(The MIT License)

Copyright © 2011 Stefan Huber

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the ‘Software’), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
