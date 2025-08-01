docker run --name my_postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=<your-password> \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 \
  -d postgres

sudo apt update
sudo apt install postgresql-client

# Set Password
psql -h localhost -p 5432 -U postgres -d mydb