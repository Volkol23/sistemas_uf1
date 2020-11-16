#!/bin/bash

echo "Ejercicio de bulces"


for FILE in `ls`; do
	if [ -e $FILE ];then
		echo "El archivo $FILE existe"
	else
		echo "El archivo $FILE no existe"
	fi	
done
