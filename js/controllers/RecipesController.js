// Controller for One Box/Recipe
MyRecipeBoxes.controller("Recipes",[
	'FIREBASE_URL',
	'$scope',
	'$location',
	'$firebase',
	'$routeParams',
	'$rootScope',
	function(FIREBASE_URL,$scope,$location,$firebase,$routeParams,$rootScope)
	{
		// get the current box using the route
		$scope.box = $firebase(new Firebase(FIREBASE_URL+"boxes/"+$routeParams.box_id));

		// get all the boxes for the user
		$scope.boxes = $firebase(new Firebase(FIREBASE_URL+"boxes").startAt($rootScope.user.uid).endAt($rootScope.user.uid));

		// if we aren't forking the recipe
		if($routeParams.type !== "fork")
		{
			// set the box id to the route param
			$scope.box_$id = $routeParams.box_id;
		}
		// if we are looking at one recipe
		if($routeParams.recipe_id)
		{
			// get the child recipe of the box
			$scope.recipe = $scope.box.$child('recipes/'+$routeParams.recipe_id);

			// set the recipe id
			$scope.recipe_$id = $routeParams.recipe_id;
		}
		// if we are creating a new recipe
		else
		{
			// SETUP NG-MODEL
			$scope.recipe = {};
			$scope.recipe.ingredients = [{}];
		}

		// sizes for edit/create/fork dropdown
		$scope.sizes = ["Measurment","Cup(s)","Tbsp(s)","Tsp(s)","Oz(s)","None"];

		// DUMMY DATA
		// $scope.recipe.title = "My Recipe";
		// $scope.recipe.ingredients = [{size: "1",measurement:"Cup(s)",food:"flour"}];
		// $scope.recipe.preheat = "350";
		// $scope.recipe.directions = "Direction";

		// on recipe form submit
		$scope.save_recipe = function()
		{
			// if the box of the recipe has changed
			if($routeParams.box_id !== $scope.box_$id)
			{
				// if there is no box id stop
				if($scope.box_$id === undefined)
				{
					//TODO: throw error
					return;
				}
				// get the box to add the recipe to
				$scope.box = $firebase(new Firebase(FIREBASE_URL+"boxes/"+$scope.box_$id));

				// add the recipe to the box
				$scope.box.$child('recipes').$add($scope.recipe);
			}
			else
			{
				// if we are editing a recipe
				if(typeof $routeParams.recipe_id !== 'undefined')
				{

					// save it
					$scope.recipe.$save();

				}
				// if we are creating a recipe
				else{

					// set the user id to the current user
					$scope.recipe.user_id = $rootScope.user.uid;

					// add the recipe to the box
					$scope.box.$child('recipes').$add($scope.recipe);

				}
			}

			// go back to the box detail page
			$location.path("/boxes/"+$scope.box_$id);

		};

	}]);