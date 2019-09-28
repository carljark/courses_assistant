#!/bin/bash
su postgres -c "usr/lib/postgresql/11/bin/initdb -D /var/lib/postgresql/data"
echo "host all all 172.28.0.0/16 trust" >> /var/lib/postgresql/data/pg_hba.conf
su postgres -c "usr/lib/postgresql/11/bin/pg_ctl -D /var/lib/postgresql/data start"
psql -U postgres < /init.sql
psql -U mastergodoy cursos < /cursos.sql
psql -U mastergodoy cursosdev < /cursosdev.sql