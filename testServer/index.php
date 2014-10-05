<?php
//error_reporting(E_ALL);
//ini_set('display_errors', 1);
//
//include __DIR__ . "/vendor/autoload.php";
//
//use Symfony\Component\Routing\Route;
//use Symfony\Component\Routing\RouteCollection;
//
//$routes = new RouteCollection();
//
//$routeSala = new Route(
//    '/sala/{apiKey}/{idHotel}/{idSala}',
//    array('controller' => 'SalaController')
//);
//
//$routeSalas = new Route(
//    '/salas/{apiKey}/{idHotel}/{idSala}',
//    array('controller', 'SalasController')
//);
//
//$routes.add('sala', $routeSala);
//$routes.add('salas', $routeSalas);
//
//
//$context = new \Symfony\Component\Routing\RequestContext($_SERVER['REQUEST_URI']);
//
//$matcher = new \Symfony\Component\Routing\Matcher\UrlMatcher($routes, $context);
//
//
//echo 'KUKU';
//
//print_r($_REQUEST['REQUEST_URI']);
//exit;

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
            'nombre' => 'Roma',
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

echo json_encode($salas);