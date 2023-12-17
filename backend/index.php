<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Backend\RouteDispatcher;
use Handler\ReturnHandler;

if (php_sapi_name() === 'cli' || $_SERVER['HTTP_HOST'] === 'localhost') {
    header('Access-Control-Allow-Origin: *');
}

$dispatcher = new RouteDispatcher();
$returnHandler = new ReturnHandler();
$returnHandler->return($dispatcher->dispatch());
