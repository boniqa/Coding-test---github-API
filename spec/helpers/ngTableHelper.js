function customNgTableProvider(){
    var ngTableOptions, ngTableFunctions;
    return {
        provider: function(){
            return function (options, functions) {
                ngTableOptions = options;
                ngTableFunctions = functions;
                return {
                    reload: function () {},
                    sorting: function () {}
                };
            }
        },
        getData: function(filters, sorting, orderBy, page, count){
            var params = {
                filter: function(){return filters},
                sorting: function(){return sorting;},
                orderBy: function(){return orderBy;},
                page: function(){return page ? page : 1},
                count: function(){return count ? count : 10},
            }
            return ngTableFunctions.getData(params);
        }
    }
}