<?php

namespace Controller;

use ORM\ORM;

class RestaurantController
{
    public static function getRestaurantData(): array|string
    {
        if (!isset($_POST['ID'])) {
            return 'Keine Daten!';
        }

        $orm = new ORM('select', 'Restaurants', 'r');
        $orm->setFields([
            'r.ID Restaurant_ID',
            'r.Name Restaurant_Name',
            'r.Zip_Code',
            'r.City',
            'r.Street',
            'mi.ID Item_ID',
            'mi.Name Item',
            'mi.Description',
            'mi.Price',
            'mi.Type Type_ID',
            'mit.Type',
        ])
            ->innerJoin('Menu_Items', 'mi', 'mi.Restaurant_ID = r.ID')
            ->innerJoin('Menu_Item_Types', 'mit', 'mit.ID = mi.Type')
            ->setWhere('r.ID = :rest_id')
            ->setWhereParameter('rest_id', $_POST['ID']);
        $data = $orm->execute();

        $returner = [];

        foreach($data as $value) {
            if(!isset($returner['Restaurant'])) {
                $returner['Restaurant'] = [
                    'ID' => $value['Restaurant_ID'],
                    'Name' => $value['Restaurant_Name'],
                    'Zip_Code' => $value['Zip_Code'],
                    'City' => $value['City'],
                    'Street' => $value['Street'],
                ];
            }
            if(!isset($returner['Items'][$value['Type_ID']])) {
                $returner['Items'][$value['Type_ID']] = [
                    'ID' => $value['Type_ID'],
                    'Type' => $value['Type'],
                ];
            }
            if(!isset($returner['Items'][$value['Type_ID']]['Items'][$value['Item_ID']])) {
                $returner['Items'][$value['Type_ID']]['Items'][$value['Item_ID']] = [
                    'ID' => $value['Item_ID'],
                    'Item' => $value['Item'],
                    'Description' => $value['Description'],
                    'Price' => $value['Price'],
                    'Type' => $value['Type'],
                ];
            }
        }

        return $returner;
    }
}