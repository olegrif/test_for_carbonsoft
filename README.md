# test_for_carbonsoft
Результат тестового задания для CarbonSoft

Клиент daemon под линукс реализован на bash (проверено на Ubuntu 18.04)

Сервер реализован на Django, база данных - SQLite.

Инструкция по установке приложения django test_for_carbonsoft

1. Создать каталог проектов в /home/olegrif:
mkdir projects
2. Войти в него:
cd projects
3. Установить git:
sudo apt-get install git
4. Создать ключ ssh:
ssh-keygen -o
6. Записать публичный ключ в аккакунт Github.com:
Добавить содеримого публичного ключа в Deploy keys.
8. Скопировать код проекта в каталог projects:
git clone https://github.com/olegrif/test_for_carbonsoft.git
7. Установка python 3.8.
sudo apt-get update
sudo apt-get install python3.8
Проверка установки:
python3 --version
8. Установить pip3:
sudo apt -y install python3-pip
9. Создать virtual environments в каталоге projects:
sudo apt install python3-venv
python3 -m venv ~/projects/venv
Запустить виртуальную среду:
source ~/.virtual/bin/activate
10. Установить пакет django.
cd /test_for_carbonsoft
pip3 install -r requirements.txt
11. Запустить веб-сервер:
python manage.py runserver 8081
12. Зайти на страницу http://127.0.0.1/8081.

Инструкция по установке и запуску демона (без рутовых прав)

cd projects

mkdir client

sudo apt install curl

wget - https://raw.githubusercontent.com/olegrif/test_for_carbonsoft/master/client/make_daemon.sh

wget - https://raw.githubusercontent.com/olegrif/test_for_carbonsoft/master/client/send.sh

chmod +x make_daemon.sh

chmod +x send.sh

sh make_daemon.sh
