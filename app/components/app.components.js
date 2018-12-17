angular.module('gitApp')
.component('spinner', {
    controller: ['$transitions', function ($transitions) {
        var ctrl = this;
        ctrl.loading = false;
        $transitions.onStart({ }, function(trans) {
            transitionStart();
            trans.promise.finally(transitionEnd);
          });
        
          var count = 0;
            function transitionStart() { 
                if (++count > 0){
                    ctrl.loading = true;
                } 
            };
            function transitionEnd() { 
                if (--count <= 0) {
                    ctrl.loading = false;
                }
            };
    }],
    
    templateUrl: 'components/component.spinner.html'
})