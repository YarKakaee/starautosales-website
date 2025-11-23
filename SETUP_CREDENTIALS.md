# How to Add Supabase Credentials

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Project Name**: `starautosales-v6` (or any name you prefer)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose the closest region to you
5. Click "Create new project"
6. Wait for the project to be set up (takes 1-2 minutes)

## Step 2: Get Your Supabase Credentials

Once your project is ready:

1. In your Supabase dashboard, go to **Settings** (gear icon in the left sidebar)
2. Click on **API** in the settings menu
3. You'll see:
   - **Project URL** - This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** - This is your `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal" to see it)

## Step 3: Create .env.local File

1. In your project root directory (`starautosales-v6`), create a file named `.env.local`
2. Copy the following template and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjE2MjM5MDIyfQ.your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2MTYyMzkwMjJ9.your-service-role-key-here
```

## Step 4: Run the Database Migration

1. In your Supabase dashboard, go to **SQL Editor** (in the left sidebar)
2. Click "New query"
3. Open the file `supabase/migrations/001_initial_schema.sql` from your project
4. Copy the entire contents of that file
5. Paste it into the SQL Editor
6. Click "Run" (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

## Step 5: Verify Setup

1. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```
2. The app should now be able to connect to Supabase!

## Important Notes

- **Never commit `.env.local` to git** - It's already in `.gitignore`
- **Keep your `SUPABASE_SERVICE_ROLE_KEY` secret** - It has admin access
- The `NEXT_PUBLIC_` prefix means those variables are exposed to the browser (safe for anon key)
- The service role key should ONLY be used server-side

## Troubleshooting

If you get errors:
- Make sure all three environment variables are set
- Check that the URLs and keys are copied correctly (no extra spaces)
- Verify the migration ran successfully in Supabase
- Check the Supabase dashboard logs for any errors

