# Supabase Setup Guide

This project uses Supabase as the database and backend service.

## Initial Setup

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and API keys

2. **Set Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon/public key
     - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (keep this secret!)

3. **Run Database Migration**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Run the migration

## Database Schema

The `cars` table includes:
- `listing_id`: Primary key (auto-generated random number)
- `stock_id`: Auto-incrementing ID
- All car details (make, model, price, year, etc.)
- Image URLs (image1 through image10)
- `financing_available`: Boolean flag
- `sold`: Boolean flag
- Timestamps (created_at, updated_at)

## API Routes

All API routes are located in `app/api/`:
- `GET /api/getAllCars` - Get all cars
- `GET /api/findNewArrivals` - Get 4 newest cars
- `GET /api/findLastCar` - Get the most recent car
- `POST /api/createCar` - Create a new car (admin only)
- `PATCH /api/[listingId]` - Update a car (admin only)
- `DELETE /api/[listingId]` - Delete a car (admin only)

## Row Level Security (RLS)

The database uses Row Level Security:
- Public read access is enabled for all users
- Write operations require authentication (to be implemented)

## Next Steps

1. Set up Supabase Authentication for admin access
2. Update the API routes to use Supabase Auth instead of NextAuth
3. Configure image storage in Supabase Storage (if needed)

