MyRecipeBoxes.controller("Boxes",['FIREBASE_URL','$scope','firebaseCollection',function(FIREBASE_URL,$scope,firebaseCollection)
{

	$scope.boxes = firebaseCollection(FIREBASE_URL+"boxes");
	$scope.create_box = function()
	{
		$scope.boxes.add({
			title: $scope.newbox.title,
			privacy: $scope.newbox.privacy,
			user_id: $scope.user.id,
			recipes: []
		});
		$scope.newbox = {};
	};
}]);