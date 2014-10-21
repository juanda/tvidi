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
        var timeRefresh = ($scope.settings.timeRefresh == undefined)? 5000: $scope.settings.timeRefresh * 1000;

        $scope.data = {
            error: false,
            nombreHotel: ""
        };

        $scope.getSalas = function(){

            var url     = apiUrl + '/hotel'  + '/' + idHotel + '/' +apiKey;

            $http.get(url)
                .success(function (data) {
                    $scope.data = data;
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
        var timeRefresh = ($scope.settings.timeRefresh == undefined)? 5000: $scope.settings.timeRefresh * 1000;

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