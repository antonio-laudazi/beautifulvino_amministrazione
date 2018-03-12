angular.module("utentiModule").service("getListaUtenti", ["$http", "URLS", "getMessagesCreator", "RESPONSE_CODES", function($http, URLS, getMessagesCreator, RESPONSE_CODES) {
	
	this.response = function(){
		var config = {
			      headers : {
			          'Content-Type': 'application/json'
			      }
			  };
		
		return $http.post(URLS.get, getMessagesCreator.genericMessage('getUtentiGen'), config);
	}
}]);