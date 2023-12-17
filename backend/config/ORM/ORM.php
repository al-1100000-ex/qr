<?php

namespace ORM;

use config\ConnectDB;
use Exception;
use Logger\Logger;
use PDO;

class ORM
{
    #region attributes

    private mixed $_expression;
    private mixed $_table;
    private mixed $_alias;
    private mixed $_fields;
    private mixed $_new_values;
    private mixed $_where;
    private mixed $_innerJoinQuery;
    private mixed $_leftJoinQuery;
    private mixed $_order;
    private mixed $_having;
    private mixed $_limit;

    #endregion

    #region setters

    /**
     * @param mixed $expression
     */
    public function setExpression(string $expression): static
    {
        $this->_expression = $expression;
        return $this;
    }

    /**
     * @param mixed $table
     */
    public function setTable(string $table): static
    {
        $this->_table = $table;
        return $this;
    }

    /**
     * @param mixed $alias
     */
    public function setAlias(string $alias): static
    {
        $this->_alias = $alias;
        return $this;
    }

    /**
     * @param mixed $fields
     */
    public function setFields(array $fields): static
    {
        $this->_fields = $fields;
        return $this;
    }

    /**
     * @param mixed $where
     */
    public function setWhere(string $where): static
    {
        $this->_where = $where;
        return $this;
    }

    /**
     * @param mixed $innerJoinQuery
     */
    public function setInnerJoinQuery(string $innerJoinQuery): void
    {
        $this->_innerJoinQuery = $innerJoinQuery;
    }

    /**
     * @param mixed $leftJoinQuery
     */
    public function setLeftJoinQuery(string $leftJoinQuery): void
    {
        $this->_leftJoinQuery = $leftJoinQuery;
    }

    /**
     * @param mixed $order
     */
    public function setOrder(string $order): void
    {
        $this->_order = $order;
    }

    /**
     * @param mixed $having
     */
    public function setHaving(mixed $having): static
    {
        $this->_having = $having;
        return $this;
    }

    /**
     * @param mixed $limit
     */
    public function setLimit(mixed $limit): static
    {
        $this->_limit = $limit;
        return $this;
    }

    /**
     * @param mixed $new_values
     */
    public function setNewValues(mixed $new_values): static
    {
        $this->_new_values = $new_values;
        return $this;
    }

    #endregion

    #region getters

    /**
     * @return mixed
     */
    public function getExpression(): mixed
    {
        return $this->_expression;
    }

    /**
     * @return mixed
     */
    public function getTable(): mixed
    {
        return $this->_table;
    }

    /**
     * @return mixed
     */
    public function getAlias(): mixed
    {
        return $this->_alias;
    }

    /**
     * @return mixed
     */
    public function getFields(): mixed
    {
        return $this->_fields;
    }

    /**
     * @return mixed
     */
    public function getWhere(): mixed
    {
        return $this->_where;
    }

    /**
     * @return mixed
     */
    public function getInnerJoinQuery(): mixed
    {
        return $this->_innerJoinQuery;
    }

    /**
     * @return mixed
     */
    public function getLeftJoinQuery(): mixed
    {
        return $this->_leftJoinQuery;
    }

    /**
     * @return mixed
     */
    public function getOrder(): mixed
    {
        return $this->_order;
    }

    /**
     * @return mixed
     */
    public function getHaving(): mixed
    {
        return $this->_having;
    }

    /**
     * @return mixed
     */
    public function getLimit(): mixed
    {
        return $this->_limit;
    }

    /**
     * @return mixed
     */
    public function getNewValues(): mixed
    {
        return $this->_new_values;
    }

    #endregion

    #region methods

    /**
     * @throws Exception
     */
    public function __construct(string $expression, string $table, string $alias = '')
    {
        if (!isset($expression) || !isset($table) || !isset($alias)) {
            throw new Exception('Error!');
        }
        $this->setExpression($expression);
        $this->setTable($table);
        $this->setAlias($alias);
        $this->setFields(['*']);
        $this->setNewValues([]);
        $this->setInnerJoinQuery('');
        $this->setLeftJoinQuery('');
        $this->setWhere('');
        $this->setHaving('');
        $this->setLimit('');
        $this->setOrder('');
    }

    /**
     * @throws Exception
     */
    public function setWhereParameter(string $field, string $value): ?static
    {
        if (!isset($field) || !isset($value)) {
            return null;
        }

        $where_query = $this->getWhere();
        $innerJoin_query = $this->getInnerJoinQuery();
        $leftJoin_query = $this->getLeftJoinQuery();
        $having_query = $this->getHaving();
        $field_val = ':' . $field;
        if (str_contains($where_query, $field_val)) {
            $new_where_query = str_replace($field_val, $value, $where_query);
            $this->setWhere($new_where_query);
        }
        if (str_contains($innerJoin_query, $field_val)) {
            $new_innerJoin_query = str_replace($field_val, $value, $innerJoin_query);
            $this->setInnerJoinQuery($new_innerJoin_query);
        }
        if (str_contains($leftJoin_query, $field_val)) {
            $new_leftJoin_query = str_replace($field_val, $value, $leftJoin_query);
            $this->setLeftJoinQuery($new_leftJoin_query);
        }
        if (str_contains($having_query, $field_val)) {
            $new_having_query = str_replace($field_val, $value, $having_query);
            $this->setHaving($new_having_query);
        }
        return $this;
    }

    public function addWhere(string $stmt): static
    {
        $setWhere = $this->getWhere();
        if(isset($setWhere) && !empty($setWhere)) {
            $this->setWhere($setWhere . ' AND ' . $stmt);
        }
        return $this;
    }

    public function innerJoin(string $table, string $alias, string $on): static
    {
        $innerJoin = ' INNER JOIN ' . $table . ' ' . $alias . ' ON ' . $on;
        $setJoin = $this->getInnerJoinQuery();
        if(isset($setJoin) && !empty($setJoin)) {
            $this->setInnerJoinQuery($setJoin . $innerJoin);
        }else{
            $this->setInnerJoinQuery($innerJoin);
        }
        return $this;
    }

    public function leftJoin(string $table, string $alias, string $on): static
    {
        $leftJoin = ' LEFT JOIN ' . $table . ' ' . $alias . ' ON ' . $on;
        $setJoin = $this->getLeftJoinQuery();
        if(isset($setJoin) && !empty($setJoin)) {
            $this->setLeftJoinQuery($setJoin . $leftJoin);
        }else{
            $this->setLeftJoinQuery($leftJoin);
        }
        return $this;
    }

    public function setOrderBy(string $field, string $direction = 'ASC'): static
    {
        $order = ' ORDER BY ' . $field . ' ' . $direction;
        $setOrder = $this->getOrder();
        if(isset($setOrder) && !empty($setOrder)) {
            $order = ', ' . $field . ' ' . $direction;
            $this->setOrder($setOrder . $order);
        }else{
            $this->setOrder($order);
        }
        return $this;
    }

    public function execute(): bool|array|null
    {
        $getWhere = $this->getWhere() ?? null;
        $getHaving = $this->getHaving() ?? null;
        $getLimit = $this->getLimit() ?? null;

        $where_query = null;
        $having_query = null;
        $limit_query = null;

        if(isset($getWhere) && !empty($getWhere)) {
            $where_query = ' WHERE ' . $getWhere;
        }
        if(isset($getHaving) && !empty($getHaving)) {
            $having_query = ' HAVING ' . $getHaving;
        }
        if(isset($getLimit) && !empty($getLimit)) {
            $limit_query = ' LIMIT ' . $getLimit;
        }

        $Expression = strtoupper($this->getExpression());
        $Table = $this->getTable();
        $Fields = implode(',', $this->getFields());
        $NewValues = '"' . implode('","', $this->getNewValues()) . '"';

        $sql = '';
        switch($Expression) {
            case 'SELECT': {
                $sql = $Expression . ' ' . $Fields .
                    ' FROM ' . $this->getTable() . ' ' . $this->getAlias() .
                    $this->getInnerJoinQuery() .
                    $this->getLeftJoinQuery() .
                    $where_query .
                    //GROUP BY
                    $having_query .
                    $this->getOrder() .
                    $limit_query
                ;
            } break;
            case 'INSERT': {
                $sql = 'INSERT INTO ' . $Table . ' (' . $Fields . ')
                VALUES
                (' . $NewValues . ')';
            }break;
            default:
        }
        $logger = new Logger($Expression);

        if(empty($sql)) {
            return null;
        }

        $db = ConnectDB::getInstance();
        $pdo = $db->getConnection();

        try {
            $pdo->beginTransaction();

            $stmt = $pdo->prepare($sql);
            $exec = $stmt->execute();

            if ($pdo->inTransaction()) {
                $pdo->commit();
            }
            switch(strtoupper($this->getExpression())) {
                case 'SELECT': $logger->logSelect($sql); break;
                default:
            }
            if ($this->getExpression() === 'select') {
                return $stmt->fetchAll(PDO::FETCH_ASSOC);
            } else {
                return $exec;
            }
        } catch(\PDOException $e) {
            $logger->logError($e, '200', $sql);
        }
        return null;
    }

    #endregion
}