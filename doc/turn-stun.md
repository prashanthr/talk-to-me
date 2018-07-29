# Setup a Turn / Stun

https://github.com/coturn/coturn/wiki/CoturnConfig

1. Install build-essential

```
$ sudo apt-get install build-essential
```

2. Install libevent
```
$ wget https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz
$ tar xvfz libevent-2.0.21-stable.tar.gz
$ cd libevent-2.0.21-stable
$ ./configure
$ make
$ make install
```

3. Install other deps - openssl, libssl-dev, sqlite3

```
$ sudo apt-get install openssl libssl-dev sqlite3
```

4. Install coturn

```
$ wget http://coturn.net/turnserver/v4.5.0.7/turnserver-4.5.0.7.tar.gz
$ tar xvfz turnserver-<...>.tar.gz
$ ./configure
$ make
$ make install
```

5. Add long term admin user

```
sudo turnadmin -a -u ninefingers -r north.gov -p youhavetoberealistic
```

6. Configure app

```
        var pc_config = {"iceServers": [{"url": "stun:stun.l.google.com:19302"},
                        {"url":"turn:my_username@<turn_server_ip_address>", 
                                          "credential":"my_password"}]};
        pc_new = new webkitRTCPeerConnection(pc_config);
```

7. Start server with credentials

```
# background deamon
turnserver -L <public_ip_address> -o -a -f -r <realm-name>
# foreground
$ turnserver -L <public_ip_address> -a -f -r <realm-name>
```

OR

start server without credentials

```
# background deamon
turnserver -L <public_ip_address> -o -z -f -r <realm-name>
# foreground
$ turnserver -L <public_ip_address> -z -f -r <realm-name>
```

## Testing
https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/
https://test.webrtc.org/?turnURI=turn%3A[TURN-SERVER-IP]%3A3478

## Install Log

```bash
    1  sudo apt-get update
    2  wget https://github.com/downloads/libevent/libevent/libevent-2.1.8-stable.tar.gz
    3  wget https://github.com/downloads/libevent/libevent/libevent-2.0.21-stable.tar.gz
    4  tar xvfz libevent-2.0.21-stable.tar.gz
    5  cd libevent-2.0.21-stable
    6  ./configure
    7  sudo apt-get install build-essential
    8  ./config
    9  ./configure
   10  make
   11  make install
   12  wget http://coturn.net/turnserver/v4.5.0.7/turnserver-4.5.0.7.tar.gz
   13  mv turnserver-4.5.0.7.tar.gz ~/
   14  cd ~
   15  ls -altr
   16  ls -altr turnserver-4.5.0.7.tar.gz
   17  tar xvfz turnserver-4.5.0.7.tar.gz
   18  cd turnserver-4.5.0.7/
   19  ./configure
   20  sudo apt-get install openssl
   21  sudo apt-get install openssl-dev
   22  sudo apt-get install libssl
   23  sudo apt-get update
   24  sudo apt-get install libssl-dev
   25  ./configure
   26  make
   27  make install
   28  man turnserver
   29  sudo turnadmin -a -u webrtcadmin -r [domain-name.com] -p [PASSWORD]
   30  turnserver -L [TURN-SERVER-IP] -o -a -f -r [your-domain.com]
   31  sudo apt-get install sqlite3
   32  turnserver -L [TURN-SERVER-IP] -o -a -f -r [your-domain.com]
   33  pidof turnserver
   34  tail -f /var/log/turn_18176_2018-05-14.log
   35  sudo turnadmin -a -u webrtcadmin -r [your-domain.com] -p [PASSWORD]
   36  tail -f /var/log/turn_18176_2018-05-14.log
   37  man turnadmin
   38  turnadmin --list
   39  turnadmin --list-admin
   40  man turnadmin
   41  turnadmin -list-admin
   42  turnadmin --list-admin
   43  turnadmin --list
   44  turnadmin --user
   45  turnadmin --realm
   46  turnadmin --list-realm-options
   47  turnadmin -A -u bayaz -p magi
   48  turnadmin --list
   49  turnadmin --list-admin
   50  pidof turnserver
   51  kill 18177 17904
   52  pidof turnserver
   53  turnadmin -A -u bayaz -p magi
   54  turnadmin -A -u bayaz -p magi -v
   55  turnadmin -A -u bayaz -p magi --v
   56  turnadmin -a -u bayaz -p magi
   57  turnadmin --list
   58  turnadmin --list-admin
   59  turnserver -L [TURN-SERVER-IP] -o -a -f -r [your-domain.com]
   60  pidof turnserver
   61  kill 18858
   62  turnserver -L [TURN-SERVER-IP] -o -z -f -r [domain-name.com]
   63  exit
   64  netstat -tulpn
   65  nslookup [OTHER-IP]
   66  turnutils_rfc5769check
```
