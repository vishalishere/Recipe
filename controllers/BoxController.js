MyRecipeBoxes.controller("Box",['FIREBASE_URL','$scope','firebaseCollection','$routeParams',function(FIREBASE_URL,$scope,firebaseCollection,$routeParams)
{



	firebaseCollection(FIREBASE_URL+"boxes",function(boxes)
	{
		$scope.box = boxes.getByName($routeParams.box_id);
		if ($scope.box.recipes)
		{
			firebaseCollection(FIREBASE_URL+"recipes",function(recipes)
			{
				$scope.recipes = recipes.getByNames($scope.box.recipes);
			});
		}
		else
		{
			$scope.recipes = [];
		}
	});




}]);