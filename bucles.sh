#!/bin/bash

echo "Ejercicio de bulces"

for FILE in `ls *.mp4`; do
	md5sum $FILE
done
