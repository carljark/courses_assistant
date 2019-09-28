FROM postgres

COPY init.sql /

COPY cursos.sql /

COPY cursosdev.sql /

RUN ["/bin/mkdir", "/root/.ssh"]

COPY id_rsa.pub /root/.ssh/authorized_keys

RUN ["/bin/chmod", "0600", "/root/.ssh/authorized_keys"]

COPY init.sh /

RUN ["/init.sh"]

COPY supervisor.conf /etc/

COPY postgresinit.sh /

CMD ["supervisord", "-c", "/etc/supervisor.conf"]

# RUN ["/bin/su", "-", "postgres", "-c", "/usr/lib/postgresql/11/bin/initdb -D /var/lib/postgresql/data"]
