MyRecipeBoxes.controller("Recipe",['$scope','$routeParams','FIREBASE_URL','firebaseCollection',function($scope, $routeParams, FIREBASE_URL, firebaseCollection){

	firebaseCollection(FIREBASE_URL+"recipes", function(recipes)
	{
		$scope.recipe = recipes.getByName($routeParams.recipe_id);
		console.log('$scope.recipe',$scope.recipe);
	});
}]);