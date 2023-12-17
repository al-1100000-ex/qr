<?php

namespace Logger;


use Handler\ReturnHandler;

class Logger
{
    #region attributes

    private $_error_code;
    private $_error_msg;
    private $_type;

    #endregion

    #region setters

    /**
     * @param mixed $error_code
     */
    public function setErrorCode($error_code): void
    {
        $this->_error_code = $error_code;
    }

    /**
     * @param mixed $error_msg
     */
    public function setErrorMsg($error_msg): void
    {
        $this->_error_msg = $error_msg;
    }

    /**
     * @param mixed $type
     */
    public function setType($type): void
    {
        $this->_type = $type;
    }

    #endregion

    #region getters

    /**
     * @return mixed
     */
    public function getErrorCode()
    {
        return $this->_error_code;
    }

    /**
     * @return mixed
     */
    public function getErrorMsg()
    {
        return $this->_error_msg;
    }

    /**
     * @return mixed
     */
    public function getType()
    {
        return $this->_type;
    }

    #endregion

    #region methods

    public function __construct($expression, $code = 0, $msg = '')
    {
        $this->setType($expression);
        $this->setErrorCode($code);
        $this->setErrorMsg($msg);
    }

    public function logError($error_msg, $error_code = 100, $sql = null): void
    {
        $backtrace = debug_backtrace(DEBUG_BACKTRACE_PROVIDE_OBJECT, 5);

        $trace_log = [];

        if (isset($backtrace) && !empty($backtrace)) {
            if (count($backtrace) > 0) {
                foreach ($backtrace as $key => $trace) {
                    $file = $trace['file'] ?? null;
                    $line = $trace['line'] ?? null;

                    $trace_log[] = "Step: " . (count($backtrace) - (int)$key) . "\n" . "File: " . $file . "\n" . "Line: " . $line;
                }
            }
        }

        if (isset($sql)) $sql = "SQL: " . $sql . "\n\n";
        $path = __DIR__ . '/../../Logs/Error.log';
        $handle = fopen($path, 'a');
        $log_text =
            "Error_Code: " . $error_code .
            "\nError_Message: " . $error_msg . "\n\n" .
            $sql .
            implode("\n", $trace_log) .
            "\nTime: " . date('Y-m-d H:i:s') . "\n\n" .
            "-------------------------------------------------------\n\n";
        fwrite($handle, $log_text);
        fclose($handle);
        $returnHandler = new ReturnHandler();
        $returnHandler->return([
            'code' => 200,
            'error_msg' => (string)$error_msg,
            'data' => $trace_log,
        ]);
    }

    public function logSelect($query)
    {
        $path = __DIR__ . '/../../Logs/' . $this->getType() . '.log';
        $handle = fopen($path, 'a');
        $log_text = "SQL Query: " . $query . "\n" . "Time: " . date('Y-m-d H:i:s') . "\n\n";
        fwrite($handle, $log_text);
        fclose($handle);
    }

    #endregion
}