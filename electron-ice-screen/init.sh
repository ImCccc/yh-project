workDir=/home/infore/icescreen/
autoStartDir=/home/infore/.config/autostart/
minioUrl=https://minio.smzx.inrobot.cloud/smzx/appelectron/

if [ ! -d "${workDir}" ];then
    mkdir -p ${workDir}
else
    echo "file exist "${workDir}
    if [ "${1}" = "delete" ]; then
        echo "delete all cache an config"
        rm -rf ${workDir}
        mkdir -p ${workDir}
    else
       echo "only delete exec file"
        rm -f  ${workDir}/icescreen-client.AppImage
        rm -f  ${workDir}/start.sh
        rm -f  ${workDir}/icescreen.desktop
    fi
fi

if [ ! -d "${autoStartDir}" ];then
  mkdir -p ${autoStartDir}
else
  echo "file exist "${autoStartDir}
  execFile=${autoStartDir}/icescreen.desktop
  rm -f  ${execFile}
fi

current=`date "+%Y-%m-%d %H:%M:%S"`
timeStamp=`date -d "$current" +%s` 
#download file
url=${minioUrl}icescreen-client.AppImage?time=${timeStamp}
echo  "start download "${url}
status_code=`curl -o ${workDir}icescreen-client.AppImage -w "%{http_code}" "${url}"`
echo ${status_code}
if [ ${status_code} -eq 200 ]; then
    echo "download success "${minioUrl}/icescreen-client.AppImage
else
    echo "download fail "${minioUrl}/icescreen-client.AppImage "status_code "${status_code}
    exit 0
fi


url=${minioUrl}start.sh?time=${timeStamp}
echo  "start download "${url}
status_code=`curl -o ${workDir}start.sh -w "%{http_code}" "${url}"`
echo ${status_code}
if [ ${status_code} -eq 200 ]; then
    echo "download success "${minioUrl}/start.sh
else
    echo "download fail "${minioUrl}/start.sh "status_code "${status_code}
    exit 0
fi

url=${minioUrl}icescreen.desktop?time=${timeStamp}
echo  "start download "${url}
status_code=`curl -o ${workDir}icescreen.desktop -w "%{http_code}" "${url}"`
echo ${status_code}
if [ ${status_code} -eq 200 ]; then
    echo "download success "${minioUrl}/icescreen.desktop
else
    echo "download fail "${minioUrl}/icescreen.desktop "status_code "${status_code}
    exit 0
fi

chmod +x ${workDir}icescreen-client.AppImage
cp ${workDir}icescreen.desktop ${autoStartDir}