#!/bin/bash

echo "Ejercicio de bulces MD5"

EXTENSION="mp3"

for FILE in `ls *.mp4`; do
	echo "---------------------"
	VIDEO=`file $FILE | grep -i media`
	if [ "$VIDEO" != "" ];then
		#md5sum $FILE
		echo "Convirtiendo $FILE a $EXTENSION"
		sleep 4
		FORMATFILE=`echo $FILE | cut "." -f 1`	

		ffmpeg -i $FILE  $FORMATFILE.$EXTENSION
	fi
done
