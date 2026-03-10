# Supabase Connection & Table Creation - Quick Start

## Summary of Changes Made

I've updated your project to use Supabase as the primary database solution. Here's what was configured:

### Files Created/Updated:

- ✅ `src/lib/supabase.js` - Main Supabase client (uses Service Role Key for server operations)
- ✅ `src/utils/supabase/server.js` - Server-side Supabase client with SSR support
- ✅ `src/utils/supabase/client.js` - Browser-side Supabase client
- ✅ `src/lib/schema.sql` - SQL schema for all 35+ tables
- ✅ `src/app/api/data/route.js` - Updated API route to use Supabase instead of Sequelize
- ✅ `SUPABASE_SETUP.md` - Detailed setup guide
- ✅ `.env.example` - Environment variables template

## Quick Setup (3 Steps)

### Step 1: Configure Environment Variables

Update your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Get these values from: https://app.supabase.com → Your Project → Settings → API

### Step 2: Create Tables in Supabase

**Option A - Manual (Recommended):**

1. Go to Supabase Dashboard → SQL Editor
2. Create New Query
3. Copy contents of `src/lib/schema.sql`
4. Run the query

**Option B - Automated:**

```bash
npm run migrate
```

### Step 3: Test Connection

```bash
npm run dev
```

Test with this request:

```javascript
fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "get_all_homes" }),
})
  .then((r) => r.json())
  .then(console.log);
```

## API Usage Examples

### Save Data

```javascript
const response = await fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "save_home",
    payload: { title: "School Home", content: "<h1>Welcome</h1>" },
  }),
});
const result = await response.json();
console.log(result); // { status: 200, message: '...', data: {...} }
```

### Get Data

```javascript
const response = await fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "get_all_homes" }),
});
const result = await response.json();
console.log(result.data); // Array of records
```

### Delete Data

```javascript
const response = await fetch("/api/data", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "delete_home_data",
    id: "uuid-here",
  }),
});
```

## Available Actions

### Home

- `save_home`
- `get_all_homes`
- `delete_home_data`

### History

- `save_history`
- `get_all_history_data`
- `delete_history_data`

### Navbar & Footer

- `save_navbar`
- `get_all_navbar`
- `save_navbar_data` (same)
- `get_navbar_data` (same)
- `save_footer`
- `get_all_footer_data`

### Notice

- `save_notice`
- `get_all_notice`
- `get_all_notice_data`
- `save_notice_data`

Plus similar patterns for:

- `vision_mission`, `principal_message`, `infrastructure`, `curriculum`
- `primaryschool`, `middleschool`, `seniorschool`, `pre_primary_school`
- `admission`, `application_form`, `fees`, `fee_structure`
- `sports`, `arts`, `music`, `clubs`, `competitions`, `events`
- `school_timings`, `school_calendar`, `transport`, `canteen`
- `house_system`, `student_council`, `gallery`, `forms`, `syllabus`
- `policies`, `contact_us`, `higher_education`, `virtual_tour`
- `alumni`, `career`, `achievements`

## Notes

- All data is stored in JSONB format (flexible schema)
- Each table has `id`, `data`, `created_at`, `updated_at` columns
- UUID primary keys are auto-generated
- Timestamps are auto-managed
- Service Role Key used in API (server-side only - secure)
- Anon Key used in client components (public - limited access)

## Troubleshooting

**Q: Tables don't exist?**
A: Run Step 2 above to create tables via SQL Editor

**Q: Connection error?**
A: Check environment variables are set correctly in `.env.local`

**Q: "Missing Supabase environment variables"?**
A: Ensure `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are in `.env.local`

See `SUPABASE_SETUP.md` for detailed troubleshooting.
