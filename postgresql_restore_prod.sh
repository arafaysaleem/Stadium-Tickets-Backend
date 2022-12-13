export PGDATABASE=stadium_tickets_db
export PGPORT=5432
export PGUSER=postgres
export PGPASSWORD

read -sp "Enter password for user '${PGUSER}': " PGPASSWORD

echo
echo "======= STARTING DB RESTORE ======="

pg_restore -h stadium-tickets-db.postgres.database.azure.com stadium_tickets_db_data.dump

echo
echo "========== RESTORE COMPLETE =========="
echo
echo "Press any key to exit..."
read 