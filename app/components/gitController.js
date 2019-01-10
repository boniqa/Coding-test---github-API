angular.module('gitApp').controller('gitHubController', ['$scope', '$uibModal','result', 'info', 'NgTableParams', '$filter','RepoService', 'localStorageService', 'emojiService', function( $scope, $uibModal, result, info, NgTableParams, $filter, RepoService, localStorageService, emojiService) {
    $scope.repoData = result;
    $scope.userData = info;
    $scope.isSaved = false;
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.dynamicPopover = {
        content: 'Hello, World!',
        templateUrl: 'components/myPopoverTemplate.html',
        title1: 'New Title',
        title2: 'New Title'
      };

     

    $scope.save = function(name, token){
        if(!name || !token){
            alert('empty input!');
          }
        else{
            localStorageService.setItem(name, token);
            $scope.isSaved = true;
            console.log('Saved!', name, token);
        }
       
         
        ////save to local storage
    };

    $scope.showToken = function (name){
        $scope.resToken = localStorageService.getItem(name);
        console.log($scope.resToken);        
    }

    $scope.refresh = function(){
        RepoService.getRepos().then(function(result){
            $scope.repoData = result;
        }).catch(function(err){
            console.error('Error while fetching repos', err);            
        });
    };

    $scope.openModal = function(repo){        
        
        $scope.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'components/myModalTemplate.html',
            controller: 'modalController',
            size: 'lg',
            resolve: {
                repo: function(){
                    return repo;
                }         
            }
          });

        // modalInstance.result.then(function (selectedItem) {
        //     $scope.selected = selectedItem;
        //   }, function () {
            
        //   });
    };

   
    $scope.repoTable = new NgTableParams({
    page: 1,
    count: 10
}, {
    counts: [],
    total: $scope.repoData.length,
    getData: function (params) {
        var data = params.sorting() ? $filter('orderBy')($scope.repoData, params.orderBy()) : $scope.repoData;
        data = params.filter() ? $filter('filter')(data, params.filter()) : data;
        return data.slice((params.page() - 1) * params.count(), params.page() * params.count());
    }
});




//emmoji controller

$scope.popoverEmoji = {
    content: 'Hello, World!',
    templateUrl: 'components/emojiPopover.html',
    title1: 'New Title',
    title2: 'New Title'
  };

$scope.emojiList = function(){
    
    // not working
   
    var emojiList = Object.values(emojiService.emojiList).map(function(emoji){
        return emoji[unicode_output];
    });

    
   

    console.log(emojiList);
    
    
    return emojiList;
}

$scope.emojiNames = $scope.emojiList();

$scope.emo = function(code){
    console.log("inside emo method");
    
    console.log($scope.convert(code));
    
}

$scope.convert = function(unicode) {
	if(unicode.indexOf("-") > -1) {
		var parts = [];
		var s = unicode.split('-');
		for(var i = 0; i < s.length; i++) {
			var part = parseInt(s[i], 16);
			if (part >= 0x10000 && part <= 0x10FFFF) {
				var hi = Math.floor((part - 0x10000) / 0x400) + 0xD800;
				var lo = ((part - 0x10000) % 0x400) + 0xDC00;
				part = (String.fromCharCode(hi) + String.fromCharCode(lo));
			}
			else {
				part = String.fromCharCode(part);
			}
			parts.push(part);
		}
		return parts.join('');
	}
	else {
		var s = parseInt(unicode, 16);
		if (s >= 0x10000 && s <= 0x10FFFF) {
			var hi = Math.floor((s - 0x10000) / 0x400) + 0xD800;
			var lo = ((s - 0x10000) % 0x400) + 0xDC00;
			return (String.fromCharCode(hi) + String.fromCharCode(lo));
		}
		else {
			return String.fromCharCode(s);
		}
	}
};

$scope.pickEmoji = function(code){
    var emoji = $scope.convert(code);
    insertText(emoji, "emojiInput");
};
// text - the text to add
// id - the id of the textarea
function insertText(text, id) {

	var input = document.getElementById(id);
	if (input === undefined) { return; }

	var scrollPos = input.scrollTop;
	var pos = 0;
	var browser = ((input.selectionStart || input.selectionStart == "0") ?
				   "ff" : (document.selection ? "ie" : false));
	if (browser == "ie") {
		input.focus();
		var range = document.selection.createRange();
		range.moveStart("character", -input.value.length);
		pos = range.text.length;
	}
	else if (browser == "ff") {
		pos = input.selectionStart;
	}
	var front = (input.value).substring(0, pos);
	var back = (input.value).substring(pos, input.value.length);
	input.value = front + text + back;
	pos = pos + text.length;
	if (browser == "ie") {
		input.focus();
		var range = document.selection.createRange();
		range.moveStart("character", -input.value.length);
		range.moveStart("character", pos);
		range.moveEnd("character", 0);
		range.select();
	}
	else if (browser == "ff") {
		input.selectionStart = pos;
		input.selectionEnd = pos;
		input.focus();
	}
	input.scrollTop = scrollPos;
	angular.element(input).trigger('input');
}

}])
.controller('modalController', ['repo', '$uibModalInstance', '$scope', function( repo, $uibModalInstance, $scope){
    $scope.repo = repo;

      $scope.ok = function () {
        $uibModalInstance.close();
      };

}]);
