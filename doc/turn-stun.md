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
https://test.webrtc.org/?turnURI=turn%3A104.131.31.167%3A3478
