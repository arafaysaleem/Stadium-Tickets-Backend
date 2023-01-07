export PGDATABASE=stadium_tickets_db
export PGPORT=5432
export PGUSER=postgres
export PGPASSWORD

read -sp "Enter password for user '${PGUSER}': " PGPASSWORD

echo
echo "======= STARTING DB RESTORE ======="

psql -h stadium-tickets-db.postgres.database.azure.com -1 -f "backups/stadium_tickets_db_data.sql"

echo
echo "========== RESTORE COMPLETE =========="
echo
echo "Press any key to exit..."
read 