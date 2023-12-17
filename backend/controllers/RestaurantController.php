<?php

namespace Controller;

use ORM\ORM;

class RestaurantController {
    public static function getRestaurantData() {
        if(!isset($_POST['ID'])) {
            return 'Keine Daten!';
        }

        $orm = new ORM('select', 'Restaurants', 'r');
        $orm->setWhere('r.ID = :id')
            ->setWhereParameter('id', $_POST['ID']);
        $data = $orm->execute();
        if(!empty($data)) {
            return $data[0];
        }
        return [];
    }
}