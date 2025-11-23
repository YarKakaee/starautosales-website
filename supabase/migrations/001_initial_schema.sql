-- Create cars table
CREATE TABLE IF NOT EXISTS cars (
  listing_id INTEGER PRIMARY KEY DEFAULT floor(random() * 90000000) + 10000000,
  stock_id SERIAL,
  make VARCHAR(255) NOT NULL,
  model VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  year INTEGER NOT NULL,
  transmission VARCHAR(50) NOT NULL,
  mileage INTEGER NOT NULL,
  e_color VARCHAR(100),
  i_color VARCHAR(100),
  body VARCHAR(50) NOT NULL,
  fuel VARCHAR(50),
  seats INTEGER,
  doors INTEGER,
  engine VARCHAR(255),
  vin VARCHAR(100),
  safety VARCHAR(50) DEFAULT 'Certified',
  image1 TEXT,
  image2 TEXT,
  image3 TEXT,
  image4 TEXT,
  image5 TEXT,
  image6 TEXT,
  image7 TEXT,
  image8 TEXT,
  image9 TEXT,
  image10 TEXT,
  financing_available BOOLEAN DEFAULT false,
  sold BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on stock_id for faster queries
CREATE INDEX IF NOT EXISTS idx_cars_stock_id ON cars(stock_id DESC);

-- Create index on sold status
CREATE INDEX IF NOT EXISTS idx_cars_sold ON cars(sold);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON cars
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert (for admin)
CREATE POLICY "Allow authenticated insert" ON cars
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy to allow authenticated users to update (for admin)
CREATE POLICY "Allow authenticated update" ON cars
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy to allow authenticated users to delete (for admin)
CREATE POLICY "Allow authenticated delete" ON cars
  FOR DELETE
  TO authenticated
  USING (true);

