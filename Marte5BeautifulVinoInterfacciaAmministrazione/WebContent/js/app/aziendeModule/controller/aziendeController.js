angular.module("utentiModule").controller("aziendeController", ["getListaAziende", "getAzienda", "salvaAzienda", "cancellaAzienda", "salvaVino", "salvaImmagine", "VARIOUS", "$ngConfirm", "$scope",function(getListaAziende, getAzienda, salvaAzienda, cancellaAzienda, salvaVino, salvaImmagine, VARIOUS, $ngConfirm, $scope){
	
	var aziendeController = this;
	$scope.listaAziende = [];
	$scope.codiceEsito = 'attesa';
	
	$scope.visualizzaEsito = false;
	$scope.messaggioEsito = '';
	$scope.coloreSfondoEsito = VARIOUS.coloreSfondoEsitoNeutro;
	
	$scope.visualizzaEditorVino = false;
	$scope.urlImmagine = '';
	
	$scope.idAzienda = '';
	$scope.nomeAzienda = '';
	$scope.infoAzienda = '';
	$scope.latitudineAzienda = 0.0;
	$scope.longitudineAzienda = 0.0;
	$scope.luogoAzienda = '';
	$scope.zonaAzienda = '';
	$scope.urlImmagineAzienda = '';
	
	$scope.viniAzienda = [];
	
	$scope.file = '';
	$scope.fileVino = '';
	$scope.fileLogoVino = '';
	
	$scope.aziendaSelezionata = {};
	
	$scope.vinoSelezionato = {
			idVino : '',
			nomeVino : '',
			annoVino : '',
			aziendaVino : {},
			aziendaVinoInt : '',
			uvaggioVino : '',
			regioneVino : '',
			inBreveVino : '',
			descrizioneVino : '',
			infoVino : '',
			urlImmagineVino : '',
			urlLogoVino : ''
	};
	
	$scope.apriConfiguratoreVino = function(){
		
		$scope.vinoSelezionato.aziendaVino = $scope.aziendaSelezionata;
		$scope.vinoSelezionato.aziendaVinoInt = { idAzienda: $scope.aziendaSelezionata.idAzienda, nomeAzienda: $scope.aziendaSelezionata.nomeAzienda};
		$scope.visualizzaEditorVino = !$scope.visualizzaEditorVino;
	}
	
	$scope.salvaVino = function(){
		
		salvaVino.response($scope.vinoSelezionato).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.setEsitoPositivo("Vino inserito correttamente");
				//il vino selezionato lo devo mettere nella lista con una push
				$scope.viniAzienda.push({idVino: result.data.idVino, nomeVino: $scope.vinoSelezionato.nomeVino, annoVino: $scope.vinoSelezionato.annoVino});
				$scope.caricaLista();
				$scope.azzeraVinoSelezionato();
				$scope.visualizzaEditorVino = false;
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nell'inserimento del vino; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
				$scope.visualizzaEditorVino = false;
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nell'inserimento del vino");
			$scope.visualizzaEditorVino = false;
		});
		
	}
	
	$scope.azzeraVinoSelezionato = function(){
		$scope.vinoSelezionato = {
				idVino : '',
				nomeVino : '',
				annoVino : '',
				aziendaVino : {},
				aziendaVinoInt : '',
				uvaggioVino : '',
				regioneVino : '',
				inBreveVino : '',
				descrizioneVino : '',
				infoVino : '',
				urlImmagineVino : '',
				urlLogoVino : ''
		};
	}
	
	$scope.caricaLista = function(){
		getListaAziende.response().then(function(result){
			$scope.listaAziende = result.data.aziende;
			$scope.codiceEsito = result.data.esito.codice;
			
		    console.log($scope.listaAziende);
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
		$scope.idAzienda = '';
		$scope.nomeAzienda = '';
		$scope.infoAzienda = '';
		$scope.latitudineAzienda = 0.0;
		$scope.longitudineAzienda = 0.0;
		$scope.luogoAzienda = '';
		$scope.zonaAzienda = '';
		$scope.urlImmagineAzienda = '';
		
		$scope.azienda = {};
		
		$scope.viniAzienda = [];
	}
	
	$scope.caricaLista();
	
	$scope.clickAzienda = function(azienda){
		$scope.azzeraEsito();
		
		$scope.aziendaSelezionata = azienda;
		
		$scope.idAzienda = azienda.idAzienda;
		$scope.nomeAzienda = azienda.nomeAzienda;
		$scope.infoAzienda = azienda.infoAzienda;
		$scope.latitudineAzienda = azienda.latitudineAzienda;
		$scope.longitudineAzienda = azienda.longitudineAzienda;
		$scope.luogoAzienda = azienda.luogoAzienda;
		$scope.zonaAzienda = azienda.zonaAzienda;
		$scope.urlImmagineAzienda = azienda.urlImmagineAzienda;
		
		$scope.viniAzienda = azienda.viniAziendaInt;
	}
	
//	$scope.clickVino = function(vino){
//		$scope.vinoSelezionato.idVino = vino.idVino;
//		$scope.vinoSelezionato.nomeVino = vino.nomeVino ;
//		$scope.vinoSelezionato.annoVino = vino.annoVino ;
//		$scope.vinoSelezionato.aziendaVino = vino.aziendaVino ;
//		$scope.vinoSelezionato.aziendaVinoInt = vino.aziendaVinoInt ;
//		$scope.vinoSelezionato.uvaggioVino = vino.uvaggioVino ;
//		$scope.vinoSelezionato.regioneVino = vino.regioneVino ;
//		$scope.vinoSelezionato.inBreveVino = vino.inBreveVino ;
//		$scope.vinoSelezionato.descrizioneVino = vino.descrizioneVino ;
//		$scope.vinoSelezionato.infoVino = vino.infoVino ;
//		$scope.vinoSelezionato.urlImmagineVino = vino.urlImmagineVino ;
//		$scope.vinoSelezionato.urlLogoVino = vino.urlLogoVino ;
//	}
	
	$scope.cancellaAzienda = function(azienda){
		cancellaAzienda.response(azienda).then(function(result){
			var codiceEsito = result.data.esito.codice;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Azienda cancellata correttamente");
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nella cancellazione dell'azienda; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nella cancellazione dell'azienda");
		});
	}
	
	$scope.submitImage = function(file){
		if(file){
			$scope.upload(file, VARIOUS.aziendaImageBaseFileName);
		}
		$scope.file = '';
		$scope.urlImmagineAzienda = $scope.urlImmagine;
	}
	
	$scope.submitImageVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoImageBaseFileName);
		}
		$scope.file = '';
		$scope.vinoSelezionato.urlImmagineVino = $scope.urlImmagine;
	}
	
	$scope.submitImageLogoVino = function(file){
		if(file){
			$scope.upload(file, VARIOUS.vinoLogoBaseFileName);
		}
		$scope.file = '';
		$scope.vinoSelezionato.urlLogoVino = $scope.urlImmagine;
	}
	
	$scope.submit = function(){
		$scope.azzeraEsito();
		
		$scope.aziendaSelezionata.idAzienda = $scope.idAzienda;
		$scope.aziendaSelezionata.nomeAzienda = $scope.nomeAzienda;
		$scope.aziendaSelezionata.infoAzienda = $scope.infoAzienda;
		$scope.aziendaSelezionata.latitudineAzienda = $scope.latitudineAzienda;
		$scope.aziendaSelezionata.longitudineAzienda = $scope.longitudineAzienda;
		$scope.aziendaSelezionata.luogoAzienda = $scope.luogoAzienda;
		$scope.aziendaSelezionata.zonaAzienda = $scope.zonaAzienda;
		$scope.aziendaSelezionata.urlImmagineAzienda = $scope.urlImmagineAzienda;
		$scope.aziendaSelezionata.viniAziendaInt = $scope.viniAzienda;
		
		salvaAzienda.response($scope.aziendaSelezionata).then(function(result){
			var codiceEsito = result.data.esito.codice;
			var c = result.data.idAzienda;
			if(codiceEsito == 100){
				$scope.azzeraForm();
				$scope.caricaLista();
				$scope.setEsitoPositivo("Azienda correttamente salvata; codice esito: " + codiceEsito + " idAzienda: " + $scope);
			} else {
				var messaggioDiErrore = result.data.esito.message;
				$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'azienda; codice esito: " + codiceEsito + " messaggio di errore:" + messaggioDiErrore);
			}
			
		}).catch(function(){
			$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'azienda");
		});
	}
	
	$scope.confirmDecision = function(azienda){
		$scope.azzeraEsito();
        $ngConfirm({
            title: 'Conferma',
            content: 'Si conferma di cancellare azienda : ' + azienda.nomeAzienda + '?',
            scope: $scope,
            buttons: {
                conferma: {
                    text: 'Conferma',
                    btnClass: 'btn-blue',
                    action: function(scope, button){
                        $scope.cancellaAzienda(azienda);
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
	
	$scope.upload = function (file, baseFileName) {
		var reader = new window.FileReader();
		var urlImmagine = '';
		reader.readAsDataURL(file); 
		reader.onloadend = function() {
			base64data = reader.result;                
			console.log(base64data);
			
			 salvaImmagine.response(base64data, baseFileName, "").then(function(result){
				var codiceEsito = result.data.esito.codice;
				$scope.urlImmagine = result.data.imageUrl;
				if(codiceEsito == 100){
					$scope.setEsitoPositivo("Immagine correttamente salvata; \ncodice esito: " + codiceEsito);
					$scope.urlImmagineAzienda = urlImmagine;
				} else {
					var messaggioDiErrore = result.data.esito.message;
					$scope.setEsitoNegativo("ATTENZIONE, Problemi nel salvataggio dell'immagine dell'azienda; \ncodice esito: " + codiceEsito + " \nmessaggio di errore:" + messaggioDiErrore);
				}
				
			}).catch(function(){
				$scope.setEsitoNegativo("ATTENZIONE, Si è verificata un'eccezione nel salvataggio dell'immagine dell'azienda");
			});					
		 }
    };
    
}]);