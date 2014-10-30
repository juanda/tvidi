/**
 protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = (WebView) findViewById(R.id.webView);

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        if(android.os.Build.VERSION.SDK_INT >= 16) {
            webSettings.setAllowUniversalAccessFromFileURLs(true);
        }

        webView.loadUrl("file:///android_asset/tvidi/app.html");
    }
 */

'use strict';

var changeStyle = function () {
    var link = document.getElementsByTagName('link').item(0);
    link.href = 'css/' + settings.style + '.css'
}

changeStyle();

var tvidiApp = angular.module('tvidiApp', []);

tvidiApp.controller('HotelController', [
    '$scope',
    '$http',
    '$interval',
    function($scope, $http, $interval){

        $scope.settings = settings;

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;
        var antelacion = $scope.settings.antelacion;
        var timeRefresh = ($scope.settings.timeRefresh == undefined)? 300000: $scope.settings.timeRefresh * 60000;

        $scope.data = {
            error: false,
            nombreHotel: ""
        };

        $scope.getSalas = function(){


            var url     = apiUrl + '/hotel/' + idHotel  + '/' + apiKey + '/' + antelacion;
            

            $http.get(url)
                .success(function (data) {
                    $scope.data = data;
                    console.log(url);
                    console.log(data);
                })
                .error(function (e) {
                    $scope.data = {error: true, message: 'Error al acceder a los datos del hotel'}

                });
        }

        $scope.getSalas();
        $interval($scope.getSalas, timeRefresh);
    }
]);

tvidiApp.controller('SalaController', [
    '$scope',
    '$http',
    '$interval',
    function($scope, $http, $interval){

        $scope.settings = settings;

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;
        var idSala  = $scope.settings.idSala;
<<<<<<< HEAD
        var antelacion = $scope.settings.antelacion;
=======
        var timeRefresh = ($scope.settings.timeRefresh == undefined)? 300000: $scope.settings.timeRefresh * 60000;
>>>>>>> a7d015bbbd35c38cac916ab486b5a4c5dbbaa2ec

        $scope.data = {
            error: false,
            nombre: ""
        };

        $scope.getDatosSala = function () {
            var url     = apiUrl + '/sala'  + '/' + idSala + '/' + apiKey ;

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
    }
]);

function capitalizeEachWord(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

var time = '';
function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);

    time =  h + ":" + m;
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

startTime();

tvidiApp.controller('Salav2Controller', [
    '$scope',
    '$http',
    '$interval',
    function($scope, $http, $interval){

        $scope.settings = settings;

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;
        var idSala  = $scope.settings.idSala;
        var antelacion = $scope.settings.antelacion;
        var timeRefresh = ($scope.settings.timeRefresh == undefined)? 300000: $scope.settings.timeRefresh * 60000;

        var date = new Date();
        var options = { weekday: "long",  month: "long", day: "numeric" };
        $scope.stringDate = capitalizeEachWord(date.toLocaleDateString("es-ES", options));


        $scope.data = {
            error: false,
            nombre: ""
        };

        $scope.getTime = function(){
            var today=new Date();
            var h=today.getHours();
            var m=today.getMinutes();
            var s=today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);

            $scope.stringTime =  h + ":" + m;// + ":" + s;
        };

        $scope.getDatosSala = function () {
            var url     = apiUrl + '/salav2' + '/' + idSala + '/' + antelacion  + '/' + apiKey ;

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
