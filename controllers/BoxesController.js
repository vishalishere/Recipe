MyRecipeBoxes.controller("Boxes",['$scope','angularFireCollection',function($scope,angularFireCollection)
{

	var url = "https://myrecipeboxes.firebaseio.com/boxes" ;
	$scope.boxes = angularFireCollection(url);
	$scope.create_box = function()
	{
		$scope.boxes.add({title: $scope.newbox.title, privacy: $scope.newbox.privacy, user_id: $scope.user.id});
		$scope.newbox = {};
	};
}]);