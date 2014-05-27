'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var ModuleGenerator = yeoman.generators.NamedBase.extend({

  generateModule: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'moduleParent',
      message: 'What\'s the new module parent?',
      default: 'clustterApp'
    },
    {
      type: 'confirm',
      name: 'routesFile',
      message: 'Do you need a routes file for this module?',
      default: true
    }];

    this.prompt(prompts, function (props) {

      var context = {
        moduleName : this.name,
        moduleParent : props.moduleParent,
        moduleCompoundName: (function (moduleName, moduleParent) {
          if (moduleParent !== 'clustterApp') {
            moduleParent = 'clustterApp.' + moduleParent;
          }

          return moduleParent + '.' + moduleName;
        })(this.name, props.moduleParent),
        routesFile : props.routesFile
      };

      //HTML files config

      var htmlFilesPath = '../templates/views' +
                          ((context.moduleParent !== 'clustterApp') ?
                          '/' + this._.underscored(context.moduleParent) : '') +
                          '/' + this._.underscored(context.moduleName) + '/' +
                          this._.underscored(context.moduleName) + '_app.html';
      context.moduleViewPath = htmlFilesPath.replace(/..\/templates\//, '');
      this.template('html/_view.html', htmlFilesPath, context);


      //Javascript files config

      var baseJSPath = 'sources/scripts/ng-ckluster/modules/clustter-app/' +
                        ((context.moduleParent !== 'clustterApp') ?
                        '/' + this._.underscored(context.moduleParent) : '') +
                        '/' + this._.underscored(context.moduleName) + '/';

      context.moduleCtrlName = context.moduleName.charAt(0).toUpperCase() + context.moduleName.slice(1);

      var controllerPath = baseJSPath + this._.underscored(context.moduleName) + '_controller.js';
      this.template('js/_controller.js', controllerPath, context);

      if (context.routesFile) {
        var routesPath = baseJSPath + this._.underscored(context.moduleName) + '_routes.js';
        this.template('js/_routes.js', routesPath, context);
      }

      //SCSS files config

      var cssParentName = (context.moduleParent !== 'clustterApp') ?
                          context.moduleParent.charAt(0).toUpperCase() + context.moduleParent.slice(1):'';

      var cssModuleName = context.moduleCtrlName;

      var cssPath = 'sources/css/clustter-style/Apps/' + cssParentName + '/' + cssModuleName + '/' +
                    '_' + (cssModuleName.charAt(0).toLowerCase() + cssModuleName.slice(1)) + '.scss';

      this.template('css/_style.scss', cssPath, context);

      console.log(chalk.red.bold('\n\n***** IMPORTANT !! *****'));
      console.log('\n----- REMEMBER TO ADD ' + chalk.yellow(context.moduleCompoundName) + ' MODULE DECLARATION');
      console.log('----- ON _declarations.js AND DEPENDENCY INJECTION ON ' +
                  chalk.yellow(context.moduleCompoundName.replace('.' + context.moduleName, '')) + ' MODULE');
      console.log('----- AND ' + chalk.magenta('@import ' + cssParentName + '/' + cssModuleName + '/' +
                    '_' + (cssModuleName.charAt(0).toLowerCase() + cssModuleName.slice(1)) +
                    '.scss') + ' ON ' + chalk.magenta('app.scss\n\n'));

      done();
    }.bind(this));
  }
});

module.exports = ModuleGenerator;