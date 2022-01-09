#make daemon

chmod +x send.sh
nohup ./send.sh 0<&- &>/dev/null &