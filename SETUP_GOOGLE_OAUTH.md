# Setting Up Google OAuth with Supabase

## Step 1: Configure Google OAuth in Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. If prompted, configure the OAuth consent screen first:
   - Choose **External** user type
   - Fill in the required information (App name, User support email, Developer contact)
   - Add your email to test users if needed
   - Save and continue through the scopes and test users screens
6. Back in Credentials, create OAuth client ID:
   - Application type: **Web application**
   - Name: `Star Auto Sales Admin`
   - **Authorized redirect URIs**: Add these two URIs:
     ```
     https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
     http://localhost:3000/auth/callback
     ```
     Replace `[YOUR-PROJECT-ID]` with your actual Supabase project ID
7. Click **Create**
8. Copy the **Client ID** and **Client Secret**

## Step 2: Configure Google Provider in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **Google** in the list and click on it
4. Enable the Google provider
5. Enter your **Client ID** and **Client Secret** from Google Cloud Console
6. In **Redirect URL**, you should see:
   ```
   https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
   ```
   Copy this exact URL - you'll need it for Google Cloud Console
7. Click **Save**

## Step 3: Add Redirect URI to Google Cloud Console

1. Go back to Google Cloud Console → **APIs & Services** → **Credentials**
2. Click on your OAuth 2.0 Client ID
3. Under **Authorized redirect URIs**, make sure you have:
   ```
   https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback
   ```
   (Replace with your actual Supabase project ID)
4. Click **Save**

## Step 4: Verify Your App's Redirect URL in Supabase

1. In Supabase Dashboard → **Authentication** → **URL Configuration**
2. Under **Redirect URLs**, add your app's callback URL:
   ```
   http://localhost:3000/auth/callback
   ```
   (For production, add your production URL: `https://yourdomain.com/auth/callback`)
3. Click **Save**

## Important Notes

- The redirect flow works like this:
  1. User clicks "Sign in with Google"
  2. Redirects to Google OAuth
  3. Google redirects to: `https://[project].supabase.co/auth/v1/callback`
  4. Supabase processes the auth and redirects to: `http://localhost:3000/auth/callback`
  5. Your app handles the callback and redirects to `/admin`

- Make sure both redirect URIs are configured:
  - **Google Cloud Console**: Must have the Supabase callback URL
  - **Supabase Dashboard**: Must have your app's callback URL

## Troubleshooting

If you get "redirect_uri_mismatch" error:
1. Double-check the redirect URI in Google Cloud Console matches exactly: `https://[YOUR-PROJECT-ID].supabase.co/auth/v1/callback`
2. Make sure there are no trailing slashes or extra characters
3. Verify your Supabase project ID is correct
4. Wait a few minutes after making changes (Google caches redirect URIs)

