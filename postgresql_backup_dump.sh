export PGDATABASE=stadium_tickets_db
export PGPORT=3307
export PGUSER=postgres
export PGPASSWORD

read -sp "Enter password for user '${PGUSER}': " PGPASSWORD

echo
echo "======= STARTING MAIN DB EXPORT ======="

echo
echo "--- Exporting (FULL) for MAIN database ---"
echo
echo "Dumping (SQL)"
pg_dump --encoding=UTF8 --schema=public > "backups/${PGDATABASE}.sql"
echo "Dumping (ARCHIVE)"
pg_dump --encoding=UTF8 --schema=public -Fc -Z 9 > "backups/${PGDATABASE}.dump"

echo
echo "--- Exporting (SCHEMA ONLY) for MAIN database ---"
echo
echo "Dumping (SQL)"
pg_dump --encoding=UTF8 --schema=public --schema-only > "backups/${PGDATABASE}_schema.sql" # -s also works the same
echo "Dumping (ARCHIVE)"
pg_dump --encoding=UTF8 --schema=public --schema-only -Fc -Z 9 > "backups/${PGDATABASE}_schema.dump"

echo
echo "--- Exporting (DATA ONLY) for MAIN database ---"
echo
echo "Dumping (SQL)"
pg_dump --encoding=UTF8 --schema=public --data-only > "backups/${PGDATABASE}_data.sql" # -d also works the same
echo "Dumping (ARCHIVE)"
pg_dump --encoding=UTF8 --schema=public --data-only -Fc -Z 9 > "backups/${PGDATABASE}_data.dump"

echo
echo "========== EXPORT COMPLETE =========="
echo
echo "Press any key to exit..."
read 