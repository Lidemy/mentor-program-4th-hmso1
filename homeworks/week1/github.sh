#!/bin/bash

curl https://api.github.com/users/$1 > output

grep "\<name\>" output | cut -c 1-10 --complement > userinfo 
grep "\<bio\>" output | cut -c 1-9 --complement >> userinfo 
grep "\<location\>" output | cut -c 1-14 --complement >> userinfo 
grep "\<blog\>" output | cut -c 1-10 --complement >> userinfo 

sed 's/"//g; s/,//g' userinfo
rm output
rm userinfo