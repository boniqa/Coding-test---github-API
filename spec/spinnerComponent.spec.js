
describe('spinner test', function(){
    
    var controller, $transitions;


    beforeEach(function(){
        var self = this;
        module('ui.router');
        // module('ngAnimate');
        // module('ngTable');

        

        $transitions = {
            onStart: function(params){
                // return {
                //     result: {
                //         then: function (callback) {
                //             callback(params);
                //         }
                //     }
                // };
            }
        };

        
        module('gitApp', function($provide){
            $provide.value('$transitions', $transitions);
        });


        inject(function ($componentController) {
            var self = this;
            controller = $componentController('spinner', {
                $transitions: $transitions                
            }, 
            {});
            

        });

    });



    it('should initialise correctly', function(done){

        expect(controller.loading).toBeFalsy();
        done();
    });

});