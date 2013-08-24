MyRecipeBoxes.controller("Recipes",['FIREBASE_URL','$scope','$location','firebaseCollection','$routeParams',function(FIREBASE_URL,$scope,$location,firebaseCollection,$routeParams)
{
	$scope.recipe = {};
	$scope.recipe.ingredents = [{}];

	$scope.recipes = firebaseCollection(FIREBASE_URL+"recipes");

	$scope.add_ingred = function()
	{
		$scope.recipe.ingredents.push({});
	};
	$scope.create_recipe = function()
	{
		$scope.recipe.user_id = $routeParams.user_id;
		var id = $scope.recipes.add(angular.copy($scope.recipe)).name();

		firebaseCollection(FIREBASE_URL+"boxes",function(boxes)
		{
			var box = boxes.getByName($routeParams.box_id);

			box.recipes.push(id);

			boxes.update(box);
			$location.path("/box/"+$routeParams.user_id+"/"+$routeParams.box_id);
		});

	};

}]);