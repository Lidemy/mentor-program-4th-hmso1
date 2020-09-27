<?php
    function escape($str) {
        // return $str;
        return htmlspecialchars($str, ENT_QUOTES);
    }
?>