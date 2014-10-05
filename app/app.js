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

var tvidiApp = angular.module('tvidiApp', ['LocalStorageModule']);

tvidiApp.controller('MenuController', [
    '$scope',
    '$window',
    'localStorageService',
    function($scope, $window, localStorageService){

        $scope.settings = localStorageService.get('settings');

        $scope.openSettings = function(){
            $window.location.assign('settings.html');
        };

        $scope.openGeneral = function(){
            $window.location.assign('general.html');
        };

        $scope.openSala = function(){
            $window.location.assign('sala.html');
        };

    }
]);

tvidiApp.controller('SettingsController', [
    '$scope',
    '$window',
    'localStorageService',
    function($scope, $window, localStorageService){

        $scope.settings = localStorageService.get('settings');

        $scope.saveSettings = function(_settings){

            localStorageService.set('settings', _settings);

            $window.location.assign('app.html');
        };
    }
]);

tvidiApp.controller('GeneralController', [
    '$scope',
    '$window',
    '$http',
    'localStorageService',
    function($scope, $window, $http, localStorageService){

        $scope.settings = localStorageService.get('settings');

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;

        $scope.data = {
            error: false,
            nombreHotel: ""
        };

        $scope.getSalas = function(){

            var url     = apiUrl + '/salas/' + apiKey + '/' + idHotel
            $http.get(url)
                .success(function (data) {
                    $scope.data = data;
                })
                .error(function () {
                    $scope.data = {error: true, message: e.message}
                });
        }

        $scope.getSalas();
    }
]);

tvidiApp.controller('SalaController', [
    '$scope',
    '$window',
    '$http',
    'localStorageService',
    function($scope, $window, $http, $localStorageService){

        $scope.settings = $localStorageService.get('settings');

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;
        var idSala  = $scope.settings.idSala;

        $scope.data = {
            error: false,
            nombre: ""
        };

        $scope.getDatosSala = function () {
            var url     = apiUrl + '/sala/' + apiKey + '/' + idHotel + '/' + idSala;

            $http.get(url)
                .success(function(data){
                    $scope.sala = data;
                })
                .error(function(e){
                    $scope.sala = {error: true,message: e.message}

                });
        }

        $scope.getDatosSala();
    }
]);