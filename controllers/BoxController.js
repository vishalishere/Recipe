MyRecipeBoxes.controller("Box",['FIREBASE_URL','$scope','firebaseCollection','$routeParams',function(FIREBASE_URL,$scope,firebaseCollection,$routeParams)
{



	$scope.box = firebaseCollection(FIREBASE_URL+"boxes",function(boxes)
	{
		$scope.box = boxes.getByName($routeParams.box_id);
		if ($scope.box.recipes)
		{
			$scope.recipes = firebaseCollection(FIREBASE_URL+"recipes").getByNames($scope.box.recipes);
		}
		else
		{
			$scope.recipes = [];
		}
	});


	console.log(firebaseCollection(FIREBASE_URL+"boxes").getByName($routeParams.box_id));





}]);