'use strict';

/**
* <%= moduleCompoundName %> Module
*
* Module description
*/
angular.module('<%= moduleCompoundName %>')

  .config(['$stateProvider',function(<%= moduleName %>States) {

    <%= moduleName %>States.state('<%= moduleName %>',{
      url:'/<%= moduleName %>/',
      views:{
        'app':{
          templateUrl:'<%= moduleViewPath %>',
          controller:'<%= moduleCtrlName %>Ctrl'
        }
      }
    });
  }]);