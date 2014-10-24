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

var tvidiApp = angular.module('tvidiApp', []);

tvidiApp.controller('GeneralController', [
    '$scope',
    '$http',
    function($scope, $http){

        $scope.settings = settings;

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;
        var antelacion = $scope.settings.antelacion;

        $scope.data = {
            error: false,
            nombreHotel: ""
        };

        $scope.getSalas = function(){

//            var url     = apiUrl + '/hotel/' + idHotel  + '/' + apiKey;
            var url     = apiUrl + '/hotel/' + idHotel  + '/' + apiKey + '/' + antelacion;
            
            $http.get(url)
                .success(function (data) {
                    $scope.data = data;
                })
                .error(function (e) {
                    $scope.data = {error: true, message: e.message}
                    console.log($scope.data);
                });
        }

        $scope.getSalas();
    }
]);

tvidiApp.controller('SalaController', [
    '$scope',
    '$http',
    function($scope, $http){

        $scope.settings = settings;

        var apiUrl  = $scope.settings.apiUrl;
        var apiKey  = $scope.settings.apiKey;
        var idHotel = $scope.settings.idHotel;
        var idSala  = $scope.settings.idSala;
        var antelacion = $scope.settings.antelacion;

        $scope.data = {
            error: false,
            nombre: ""
        };

        $scope.getDatosSala = function () {
            var url     = apiUrl + '/sala/' + idSala  + '/' + apiKey;

            $http.get(url)
                .success(function(data){
                    $scope.sala = data;
                })
                .error(function(e){
                    $scope.sala = {error: true, message: e.message}

                });
        }

        $scope.getDatosSala();
    }
]);