#!/bin/bash
current_number=1
target=$(($1 + 1))

while [ $current_number -ne $target ]
do
    
    touch "${current_number}.js";
    echo "檔案建立完成";
    current_number=$((current_number + 1))
done