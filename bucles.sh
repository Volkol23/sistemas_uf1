#!/bin/bash

echo "Ejercicio de bulces"

RED="[0;31"
GREEN="[0;32"
NOCOLOR="[0m"

for FILE in `ls`; do
	if [ -e $FILE ];then
		echo -e "\e$GREEN El archivo $FILE existe \e$NOCOLOR"
	else
		echo -e "\e$RED El archivo $FILE no existe \e$NOCOLOR"
	fi	
done


for color in 0 1 2 3 4 5 6 7; do
	echo -e "\e[0;3$color patata frita\e[0m"
done
