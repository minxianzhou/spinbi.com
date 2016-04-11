(function () {
    'use strict';

    angular.module('app', [
        // Core modules
         'app.core'
        
        // Custom Feature modules
        ,'app.chart'
        ,'app.ui'
        ,'app.ui.form'
        ,'app.ui.form.validation'
        ,'app.page'
        ,'app.table'

        // custom controllers
        ,'app.translate'
        ,'app.user'
        ,'app.account'
        ,'app.contact'
        ,'app.forms'
        ,'app.header'
        ,'app.home'

        // Custome service
        ,'app.services'

        // 3rd party feature modules
        ,'ui.tree'
        ,'ngMap'
        ,'textAngular'
        ,'ngMask'
    ]);

})();

