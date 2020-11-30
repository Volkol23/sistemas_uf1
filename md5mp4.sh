#!/bin/bash

echo "Ejercicio de bulces MD5"

for FILE in `ls *.mp4`; do
	echo "---------------------"
	VIDEO=`file $FILE | grep -i media`
	if [ "$VIDEO" != "" ];then
		#md5sum $FILE
		FORMATFILE=`echo $FILE | cut "." -f 1`	
		ffmpeg -i $FILE  $FORMATFILE.mkv
	fi
done
