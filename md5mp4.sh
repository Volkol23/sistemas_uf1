#!/bin/bash

echo "Ejercicio de bulces MD5"

for FILE in `ls *.mp4`; do
	md5sum $FILE
done
