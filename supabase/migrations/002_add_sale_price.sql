-- Add sale_price column for discounted pricing
-- NULL means no sale is active; a value means the car is on sale at that price
ALTER TABLE cars ADD COLUMN sale_price INTEGER DEFAULT NULL;
