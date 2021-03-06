'use strict';

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var time = '';
function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var changeStyle = function () {
    var link = document.getElementsByTagName('link').item(0);
    link.href = 'css/' + settings.style + '.css'
}

var timeRefresh = (settings.timeRefresh == undefined)? 300000: settings.timeRefresh * 60000;

var getDate = function(){
    var date = new Date();
    var options = { weekday: "long",  month: "long", day: "numeric" };
    var stringDate = capitalizeEachWord(date.toLocaleDateString("es-ES", options));

    return stringDate;
};

var getTime = function(){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    var stringTime =  h + ":" + m;// + ":" + s;

    return stringTime;
};


var tvidiApp = angular.module('tvidiApp', []);


tvidiApp.controller('HotelController', [
    '$scope',
    '$http',
    '$interval',
    function($scope, $http, $interval){
        $scope.settings = settings;
        $scope.stringDate = getDate();
        $scope.getTime = function(){
            $scope.stringTime =  getTime();
        };
        $scope.data = {
            error: false,
            nombreHotel: ""
        };
        $scope.getSalas = function(){

            var url = settings.apiUrl + '/hotel/' + settings.idHotel  + '/' + settings.antelacion + '/' + settings.apiKey;

            $http.get(url)
                .success(function (data) {
                    $scope.data = data;

                    console.log($scope.data);
                })
                .error(function (e) {
                    $scope.data = {error: true, message: 'Error al acceder a los datos del hotel'}

                });
        }

        $scope.getSalas();
        $interval($scope.getSalas, timeRefresh);
        $interval($scope.getTime, 500);
    }
]);

tvidiApp.controller('SalaController', [
    '$scope',
    '$http',
    '$interval',
    function($scope, $http, $interval){
        $scope.settings = settings;
        $scope.stringDate = getDate();
        $scope.getTime = function(){
            $scope.stringTime =  getTime();
        };
        $scope.data = {
            error: false,
            nombre: ""
        };
        $scope.getDatosSala = function () {
            var url     = settings.apiUrl + '/sala'  + '/' + settings.idSala + '/' + settings.apiKey ;

            $http.get(url)
                .success(function(data){
                    $scope.sala = data;
                })
                .error(function(e){
                    $scope.sala = {error: true, message: 'Error al acceder a los datos de la sala' }

                });
        }

        $scope.getDatosSala();
        $interval($scope.getDatosSala, timeRefresh);
        $interval($scope.getTime, 500);
    }
]);

tvidiApp.controller('Salav2Controller', [
    '$scope',
    '$http',
    '$interval',
    function($scope, $http, $interval){
        $scope.settings = settings;
        $scope.stringDate = getDate();
        $scope.getTime = function(){
            $scope.stringTime =  getTime();
        };
        $scope.data = {
            error: false,
            nombre: ""
        };
        $scope.getDatosSala = function () {
            var url     = settings.apiUrl + '/salav2' + '/' + settings.idSala + '/' + settings.antelacion  + '/' + settings.apiKey ;

           
            $http.get(url)
                .success(function(data){            
                    $scope.sala = data;
                    if(data.enCurso) {
                        $scope.evento0 = data.eventos[0];
                        $scope.eventosSiguientes = data.eventos.splice(1);
                         
                    }else{
                        $scope.evento0 = {url_imagen: './images/logo-blank.png', cliente: 'Sala libre', descripcion: '', hora: ''};
                        $scope.eventosSiguientes = data.eventos;
                    }
                    console.log(data);
                })
                .error(function(e){
                    $scope.sala = {error: true, message: 'Error al acceder a los datos de la sala' }

                });
        };

        $scope.getDatosSala();
        $interval($scope.getDatosSala, timeRefresh);
        $interval($scope.getTime, 500);
    }
]);

changeStyle();
