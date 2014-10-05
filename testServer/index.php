<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include __DIR__ . "/vendor/autoload.php";

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

$routeSala = new Route(
    '/sala/{apiKey}/{idHotel}/{idSala}',
    array('controller' => 'SalaController')
);

$routeSalas = new Route(
    '/salas/{apiKey}/{idHotel}',
    array('controller', 'SalasController')
);

$routes->add('sala', $routeSala);
$routes->add('salas', $routeSalas);


$context = new \Symfony\Component\Routing\RequestContext($_SERVER['REQUEST_URI']);

$matcher = new \Symfony\Component\Routing\Matcher\UrlMatcher($routes, $context);

//echo $matcher->getContext()->getBaseUrl();

$routeParams = $matcher->match($matcher->getContext()->getBaseUrl());

//print_r($routeParams);

if(isset($routeParams['_route']) && $routeParams['_route'] == 'salas'){
    returnSalas($routeParams['apiKey']);
}elseif(isset($routeParams['_route']) && $routeParams['_route'] == 'sala'){
    returnSala($routeParams['apiKey']);
}else{
    returnError();
}


function returnSalas($apiKey)
{

    $error = array('error' => true, 'message' => 'Api Key errónea');

    $salas = array(
        'nombreHotel' => 'Miguel Ángel',
        'salas' => array(
            array(
                'nombre' => 'Venecia',
                'cliente' => 'Renault',
                'reunion' => 'Los embrages magnéticos',
                'hora' => 'de 15:30 a 17:00',
                'enCurso' => true
            ),
            array(
                'nombre' => 'Santiago',
                'cliente' => 'Mercedes',
                'reunion' => 'Los frenos marúlicos',
                'hora' => 'de 16:30 a 19:00'
            ),
            array(
                'nombre' => 'Siena',
                'cliente' => 'Volskwagen',
                'reunion' => 'Las trócolas de titanium',
                'hora' => 'de 17:30 - 18:30'
            ),
        )
    );

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    header('Content-Type: application/json');

    if($apiKey == "error"){
        header('HTTP/1.0 404 Not Found');
        echo json_encode($error);
    }else{
        echo json_encode($salas);
    }


}

function returnSala($apiKey){

    $error = array('error' => true, 'message' => 'Api Key errónea');

    $sala = array(
        'nombre' => 'Roma',
        'cliente' => 'Renault',
        'reunion' => 'Las trócolas díscolas',
        'hora' => 'de 15:30 a 17:40'
    );

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    header('Content-Type: application/json');


    if($apiKey == "error"){
        header('HTTP/1.0 404 Not Found');
        echo json_encode($error);
    }else{
        echo json_encode($sala);
    }


}

function returnError(){

    $error = array(
        'error' => true,
        'message' => 'Errrroroororroo'
    );

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');
    }

    header('Content-Type: application/json');

    echo json_encode($error);
}