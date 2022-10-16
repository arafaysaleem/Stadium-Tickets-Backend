export PGDATABASE=stadium_tickets_db
DBUSER=postgres
export PGPASSWORD

read -sp "Enter password for user '${DBUSER}': " PGPASSWORD

echo
echo "======= STARTING MAIN DB EXPORT ======="

echo
echo "Dumping (FULL SQL) for MAIN database"
pg_dump --username=$DBUSER --port=3307 --encoding=UTF8 > "backups/${PGDATABASE}.sql"

echo
echo "Dumping (SCHEMA ONLY) for MAIN database"
pg_dump --username=$DBUSER --port=3307 --encoding=UTF8 --schema-only > "backups/${PGDATABASE}_schema.sql" # -s also works the same

echo
echo "Dumping (DATA ONLY) for MAIN database"
pg_dump --username=$DBUSER --port=3307 --encoding=UTF8 --data-only > "backups/${PGDATABASE}_data.sql" # -d also works the same

echo
echo "========== EXPORT COMPLETE =========="
echo
echo "Press any key to exit..."
read 