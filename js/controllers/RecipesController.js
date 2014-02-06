MyRecipeBoxes.controller("Recipes",[
	'FIREBASE_URL',
	'$scope',
	'$location',
	'$firebase',
	'$routeParams',
	'$rootScope',
	function(FIREBASE_URL,$scope,$location,$firebase,$routeParams,$rootScope)
	{
		$scope.box = $firebase(new Firebase(FIREBASE_URL+"boxes/"+$routeParams.box_id));
		$scope.boxes = $firebase(new Firebase(FIREBASE_URL+"boxes").startAt($rootScope.user.uid).endAt($rootScope.user.uid));

		if($routeParams.type !== "fork")
		{
			$scope.box_$id = $routeParams.box_id;
		}
		if($routeParams.recipe_id)
		{
			$scope.recipe = $scope.box.$child('recipes/'+$routeParams.recipe_id);
			$scope.recipe_$id = $routeParams.recipe_id;
			console.log('$scope.recipe',$scope.recipe);
		}
		else
		{
			// SETUP NG-MODEL
			$scope.recipe = {};
			$scope.recipe.ingredients = [{}];
		}

		$scope.sizes = ["Measurment","Cup(s)","Tbsp(s)","Tsp(s)","Oz(s)","None"];

		// DUMMY DATA
		$scope.recipe.title = "My Recipe";
		$scope.recipe.ingredients = [{size: "1",measurement:"Cup(s)",food:"flour"}];
		$scope.recipe.preheat = "350";
		$scope.recipe.directions = "Direction";

		$scope.save_recipe = function()
		{
			console.log('$scope.box_$id',$scope.box_$id);
			if($routeParams.box_id !== $scope.box_$id)
			{
				if($scope.box_$id === undefined)
				{
					return;
				}
				$scope.box = $firebase(new Firebase(FIREBASE_URL+"boxes/"+$scope.box_$id));
				$scope.box.$child('recipes').$add($scope.recipe);
			}
			else
			{
				if(typeof $routeParams.recipe_id !== 'undefined')
				{

					console.log('$scope.recipe',$scope.recipe);
					$scope.recipe.$save();

				}
				else{

					$scope.recipe.user_id = $rootScope.user.uid;
					$scope.box.$child('recipes').$add($scope.recipe);

				}
			}


			$location.path("/boxes/"+$scope.box_$id);

		};

	}]);