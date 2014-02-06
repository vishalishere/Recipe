MyRecipeBoxes.controller("User",[
	'$scope',
	'$location',
	'$firebase',
	'FIREBASE_URL',
	'$rootScope',
	'$fireLogin',
	function($scope,$location,$firebase,FIREBASE_URL,$rootScope,$fireLogin)
{

	$scope.login = function()
	{
		$fireLogin.$login('password',$scope.user_form).then(function()
		{
			$location.path('/');
		},function(error)
		{
			//TODO: error handling
			console.log('error',error);
		});
	};

	$scope.create_user = function()
	{
		$fireLogin.$createUser($scope.user_form.email,$scope.user_form.password).then(function(user)
		{
			console.log('user',user);
			if(user)
			{
				$rootScope.user_info = $firebase(new Firebase(FIREBASE_URL+"users/"+user.uid));
				$rootScope.user_info.first_name = $scope.user_form.first_name;
				$rootScope.user_info.last_name = $scope.user_form.last_name;
				$rootScope.user_info.email = $scope.user_form.email;
				$rootScope.user_info.id = user.uid;
				$rootScope.user_info.$save();
				$location.path("/");
			}
		},function(error)
		{
			//TODO: error handling;
			console.log('error',error);
		});
	};

	// validate that the password and confirm password match
	$scope.validatePassword = function()
	{
		// set the not matching error if the passwords don't match
		$scope.signup.confirm.$error.notMatching = $scope.user_form.password !== $scope.user_form.confirm;
	};
}]);