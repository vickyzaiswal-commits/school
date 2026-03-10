# Supabase Setup Guide

This guide explains how to connect your Next.js application to Supabase and create all the required tables.

## Prerequisites

- A Supabase account (free at https://supabase.com)
- Supabase project created
- Environment variables configured

## Step 1: Set Up Environment Variables

Create or update your `.env.local` file with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres
```

**Where to find these values:**

1. Go to https://app.supabase.com
2. Select your project
3. Click "Settings" → "API"
4. Copy the values:
   - `NEXT_PUBLIC_SUPABASE_URL` = Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY` = Service Role Key

## Step 2: Create Database Tables

### Option A: Manual SQL Execution (Recommended for first setup)

1. Go to your Supabase dashboard: https://app.supabase.com
2. Select your project
3. Click **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy the entire contents from `src/lib/schema.sql`
6. Paste into the SQL editor
7. Click **Run**

All tables will be created automatically.

### Option B: Automated Script

If the RPC method is enabled:

```bash
npm run migrate
```

This will execute `src/lib/schema.sql` automatically.

## Step 3: Verify Connection

Test your Supabase connection by checking the API response:

```bash
npm run dev
```

Visit `http://localhost:3000/api/data` with a POST request:

```javascript
// Example: Get home data
fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "get_all_homes" }),
})
  .then((r) => r.json())
  .then(console.log);
```

## API Endpoints

All endpoints use `POST /api/data` with the following actions:

### Home Data

- `save_home` - Save home information
- `get_all_homes` - Retrieve all home data
- `delete_home_data` - Delete home data

Similar patterns for other entities:

- History: `save_history`, `get_all_history_data`, `delete_history_data`
- Navbar: `save_navbar`, `get_all_navbar`, `delete_navbar`
- Notice: `save_notice`, `get_all_notice`, `delete_notice`
- And more...

### Example Request

```javascript
// Save data
const response = await fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "save_home",
    payload: { title: "Welcome", description: "To our school" },
  }),
});

const result = await response.json();
console.log(result);
```

## Table Schema

All tables follow this structure:

- `id` (UUID) - Primary key
- `data` (JSONB) - Flexible JSON data storage
- `created_at` (Timestamp) - Auto-generated
- `updated_at` (Timestamp) - Auto-updated

Store any data structure in the `data` column as JSON.

## Troubleshooting

### Missing Environment Variables

Error: "Missing Supabase environment variables"

- Solution: Check `.env.local` has all required variables

### Connection Refused

- Verify DATABASE_URL is correct
- Check your Supabase project is active
- Ensure your IP is not blocked (Supabase allows all by default)

### Tables Not Found

- Run through Step 2 again to create tables
- Verify table names match those in `src/lib/schema.sql`

### RPC Error

- The `exec` RPC may not be available
- Use manual SQL execution instead (Option A)

## File References

- **Supabase Client Setup**: `src/lib/supabase.js`
- **Server-side Supabase**: `src/utils/supabase/server.js`
- **Client-side Supabase**: `src/utils/supabase/client.js`
- **Database Schema**: `src/lib/schema.sql`
- **Migration Script**: `src/lib/scripts/createTables.js`
- **API Route**: `src/app/api/data/route.js`
