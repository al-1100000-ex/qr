<?php

namespace config;

use Dotenv\Dotenv;
use PDO;
use PDOException;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

class ConnectDB {
    private static ?ConnectDB $instance = null;
    private PDO $pdo;

    private function __construct() {
        $host = $_ENV['DB_HOST'];
        $user = $_ENV['DB_USER'];
        $pw = $_ENV['DB_PASSWORD'];
        $db = $_ENV['DB_NAME'];

        $this->pdo = new PDO("mysql:host={$host};dbname={$db};charset=utf8mb4", $user, $pw,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES'utf8mb4'"));
    }

    public static function getInstance(): ?ConnectDB
    {
        if(empty(self::$instance)) {
            self::$instance = new ConnectDB();
        }
        return self::$instance;
    }

    public function getConnection(): PDO
    {
        return $this->pdo;
    }
}