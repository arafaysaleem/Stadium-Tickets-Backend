export PGDATABASE=stadium_tickets_db
export PGPORT=3307
export PGUSER=postgres
export PGPASSWORD

read -sp "Enter password for user '${PGUSER}': " PGPASSWORD

echo
echo "======= STARTING DB RESTORE ======="

psql -h localhost -1 -f "backups/stadium_tickets_db_data.sql"

echo
echo "========== RESTORE COMPLETE =========="
echo
echo "Press any key to exit..."
read 