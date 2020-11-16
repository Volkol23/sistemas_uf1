#!/bin/bash

echo "COMPROBADOR DE EXISTENCIA DE ARCHIVOS V1.0"
echo "------------------------------------------"
echo ""
echo "Indica el nombre de archivo a comprobar: "

read ARCHIVO

if [ -e $ARCHIVO ]; then
	cowsay "El archivo existe"
else
	echo "El archivo no existe"
fi
