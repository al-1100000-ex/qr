<?php

namespace Backend;

class RouteDispatcher
{
    public function dispatch()
    {
        $routes = json_decode(file_get_contents(__DIR__ . '/routes/routes.json'), true);

        foreach ($routes as $route) {
            $request_route = str_replace("/qr/backend","",$_SERVER['REQUEST_URI']);
            if ($_SERVER['REQUEST_METHOD'] === $route['method'] && $request_route === $route['route']) {
                $handlerComponents = explode('::', $route['handler']);
                $controllerClass = $handlerComponents[0];
                $controllerMethod = $handlerComponents[1];

                $controller = new $controllerClass();
                return $controller->$controllerMethod();
            }
        }

        // Route not found
        http_response_code(404);
        return ["error" => "Route not found"];
    }
}
