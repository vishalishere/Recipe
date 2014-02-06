// Controller for user information
MyRecipeBoxes.controller("User",[
	'$scope',
	'$location',
	'$firebase',
	'FIREBASE_URL',
	'$rootScope',
	'$fireLogin',
	function($scope,$location,$firebase,FIREBASE_URL,$rootScope,$fireLogin)
{

	// on login form submission
	$scope.login = function()
	{
		// login to firebase
		$fireLogin.$login('password',$scope.user_form).then(function()
		{
			// if successful redirect to home page
			$location.path('/');
		},function(error)
		{
			// if unsuccessful throw error
			//TODO: error handling
			console.log('error',error);
		});
	};


	// on signup form submission
	$scope.create_user = function()
	{
		// create the user in firebase
		$fireLogin.$createUser($scope.user_form.email,$scope.user_form.password).then(function(user)
		{
			console.log('user',user);
			if(user)
			{
				// setup user information in firebase
				$rootScope.user_info = $firebase(new Firebase(FIREBASE_URL+"users/"+user.uid));
				$rootScope.user_info.first_name = $scope.user_form.first_name;
				$rootScope.user_info.last_name = $scope.user_form.last_name;
				$rootScope.user_info.email = $scope.user_form.email;
				$rootScope.user_info.id = user.uid;
				$rootScope.user_info.$save();

				// redirect to home page
				$location.path("/");
			}
		},function(error)
		{
			// if unsuccessful throw error
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