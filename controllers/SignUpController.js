MyRecipeBoxes.controller("SignUp",['$scope','angularFireCollection','angularFireAuth',function($scope,angularFireCollection,angularFireAuth)
	{


		$scope.create_user = function()
		{
			angularFireAuth._authClient.createUser($scope.user.email,$scope.user.password,function(error,user)
			{
				if(!error)
				{
					angularFireAuth._loggedIn(user);

				}
				//TODO: ERROR HANDLING
			});
		};

		$scope.validatePassword = function()
		{
			$scope.signup.confirm.$error.dontMatch = $scope.user.password !== $scope.user.confirm;
		};
	}]);