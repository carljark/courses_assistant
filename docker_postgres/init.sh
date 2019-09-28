#!/bin/bash
apt-get update
apt-get install -y openssh-server supervisor
mkdir /var/run/sshd
chmod 0755 /var/run/sshd
