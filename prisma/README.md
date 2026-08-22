# Dayflow Database

This directory contains the Prisma schema and database migrations for Dayflow.

## Setup

1. Start PostgreSQL using Docker Compose:
   ```bash
   docker-compose up -d postgres
   ```

2. Configure your environment variables:
   Ensure `.env` contains the correct database URL:
   ```text
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/dayflow?schema=public
   ```

3. Run Prisma formatting and validation:
   ```bash
   npx prisma format
   npx prisma validate
   ```

4. Create and run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Seed the database with development data:
   ```bash
   npx prisma db seed
   ```

6. Explore the database:
   ```bash
   npx prisma studio
   ```
