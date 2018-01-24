
```
mkdir ~/letsencrypt-backup
cp -r /etc/letsencrypt/ ~/letsencrypt-backup/
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
sudo certbot --authenticator webroot --installer nginx
```

```
1. domain - talktome.space
2. webroot - /var/www/current/build
```