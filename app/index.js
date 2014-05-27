'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var NgCklusterGenerator = yeoman.generators.Base.extend({

  askFor: function () {

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous ng-Ckluster generator!'));

    this.log('- To create a new module do:');
    this.log(chalk.yellow('        yo ng-ckluster:module moduleName'));
  },
});

module.exports = NgCklusterGenerator;
