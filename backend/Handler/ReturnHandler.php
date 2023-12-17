<?php

namespace Handler;

class ReturnHandler {
    public function return($data, int $code = 100, $error_msg = null) {
        $return_data = [
            'code' => $code,
            'data' => $data,
            'error_msg' => $error_msg,
        ];
        echo json_encode($return_data, JSON_NUMERIC_CHECK);
    }
}