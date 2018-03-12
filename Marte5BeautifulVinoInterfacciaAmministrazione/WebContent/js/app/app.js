var app = angular.module('applicationModule', ['utentiModule', 'cp.ngConfirm', 'ngFileUpload', 'ngSanitize', 'ui.select']).directive('testContent', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'content-pages/test-page.html'
	 };
}).directive('utentiAdmin', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'content-pages/utenti-admin.html'
	 };
}).directive('aziendeAdmin', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'content-pages/aziende-admin.html'
	 };
}).directive('viniAdmin', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'content-pages/vini-admin.html'
	 };
}).directive('eventiAdmin', function(){
	 return {
		 restrict: 'E',
		 templateUrl: 'content-pages/eventi-admin.html'
	 };
});