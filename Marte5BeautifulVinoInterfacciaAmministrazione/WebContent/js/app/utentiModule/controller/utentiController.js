angular.module("utentiModule").controller("utentiController", ["getListaUtenti", "salvaUtente", "cancellaUtente", "salvaImmagine", "VARIOUS", "$ngConfirm", "Upload", "$scope",function(getListaUtenti, salvaUtente, cancellaUtente, salvaImmagine, VARIOUS, $ngConfirm, Upload, $scope){
	
	var utentiController = this;
	$scope.listaUtenti = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.idUtente = '';
	$scope.nomeUtente = '';
	$scope.cognomeUtente = '';
	$scope.biografiaUtente = '';
	$scope.creditiUtente = 0;
	$scope.esperienzaUtente = 0;
	$scope.livelloUtente = '';
	$scope.urlFotoUtente = '';
	$scope.file = '';
	
	$scope.utenteSelezionato = {};
	
	$scope.caricaLista = function(){
		getListaUtenti.response().then(function(result){
			$scope.listaUtenti = result.data.utenti;
			$scope.codiceEsito = result.data.esito.codice;
		    console.log($scope.listaUtenti);
		}).catch(function(){
		   $scope.codiceEsito = 'ERRORE';
		   console.log('Error');
		});
	}
	
	$scope.azzeraEsito = function(){
		$scope.visualizzaEsito = false;
		$scope.messaggioEsito = '';
		$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	}
	
	$scope.setEsitoPositivo = function(message){
		$scope.visualizzaEsito = true;
		$scope.messaggioEsito = message;
		$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoOk;
	}
	
	$scope.setEsitoNegativo = function(message){
		$scope.visualizzaEsito = true;
		$scope.messaggioEsito = message;
		$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoKo;
	}
	
	$scope.azzeraForm = function(){
		$scope.idUtente = '';
		$scope.nomeUtente = '';
		$scope.cognomeUtente = '';
		$scope.biografiaUtente = '';
		$scope.creditiUtente = 0;
		$scope.esperienzaUtente = 0;
		$scope.livelloUtente = '';
		$scope.urlFotoUtente = '';
		
		$scope.utente = {};
	}
	
	$scope.caricaLista();
	
	$scope.clickUtente = function(utente){
		$scope.azzeraEsito();
		
		$scope.utenteSelezionato = utente;
		
		$scope.idUtente = utente.idUtente;
		$scope.nomeUtente = utente.nomeUtente;
		$scope.cognomeUtente = utente.cognomeUtente;
		$scope.creditiUtente = utente.creditiUtente;
		$scope.esperienzaUtente = utente.esperienzaUtente;
		$scope.livelloUtente = utente.livelloUtente;
		$scope.biografiaUtente = utente.biografiaUtente;
		$scope.urlFotoUtente = utente.urlFotoUtente;
	}
	
	$scope.cancellaUtente = function(utente){
		cancellaUtente.response(utente).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Utente cancellato correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione dell'utente; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione dell'utente");
		});
	}
	
	$scope.submitTest = function(file){
		if(file){
			$scope.upload(file, '12345');
		}
	}
	
	$scope.submit = function(){
		$scope.azzeraEsito();
		
		$scope.utenteSelezionato.idUtente = $scope.idUtente;
		$scope.utenteSelezionato.nomeUtente = $scope.nomeUtente;
		$scope.utenteSelezionato.cognomeUtente = $scope.cognomeUtente;
		$scope.utenteSelezionato.creditiUtente = $scope.creditiUtente;
		$scope.utenteSelezionato.esperienzaUtente = $scope.esperienzaUtente;
		$scope.utenteSelezionato.livelloUtente = $scope.livelloUtente;
		$scope.utenteSelezionato.livelloUtente = $scope.livelloUtente;
		$scope.utenteSelezionato.biografiaUtente = $scope.biografiaUtente;
		$scope.utenteSelezionato.urlFotoUtente = $scope.urlFotoUtente;
		
		salvaUtente.response($scope.utenteSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			var idUtenteSalvato = result.data.idUtente;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Utente correttamente salvato;/ncodice esito: " + codiceEsito + "/nidUtente: " + idUtenteSalvato);
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'utente;/ncodice esito: " + codiceEsito + "/nmessaggio di errore:" + messaggioDiErrore);
			}
			
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'utente");
		});
	}
	
	$scope.confirmDecision = function(utente){
		$scope.azzeraEsito();
        $ngConfirm({
            title: 'Conferma',
            content: 'Si conferma di cancellare utente : ' + utente.nomeUtente + ' ' + utente.cognomeUtente + '?',
            scope: $scope,
            buttons: {
                conferma: {
                    text: 'Conferma',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                        $scope.cancellaUtente(utente);
                    }
                },
                esci: {
                    text: 'Esci',
                    btnClass: 'btn-red',
                    action: function(scope, button){
                    }
                }
            }
        });
    }
	
	$scope.upload = function (file, idUtente) {
		var reader = new window.FileReader();
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, VARIOUS.utenteImageBaseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				var urlImmagine = result.data.imageUrl;
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvato; \ncodice esito: " + codiceEsito);
					$scope.urlFotoUtente = urlImmagine;
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'utente; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'utente");
			});					
		 }
    };
    
}]);