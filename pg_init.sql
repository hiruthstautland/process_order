-- Paste in the following to create type -------------
CREATE TYPE "type-order_status" AS enum
( 
  'new',
  'in-process',
  'rejected',
  'packed',
  'delivered'
);
-- Paste in the following to create type -------------
CREATE TYPE"type-rejected_reason" AS enum
(
   'Varene er ikke tilgjengelig',
   'Varene er skadet',
   'Har ikke tid',
   'Annet'
);
-- Paste in the following to create a function --------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER 
AS $$
   BEGIN
      NEW.status_changed_at = NOW();
   RETURN NEW;
   END;
$$ 
LANGUAGE 
   plpgsql;

-- Table for "active" orders ----
CREATE TABLE orders
(
   chain_id VARCHAR(5) NOT NULL,
   store_id VARCHAR(10) NOT NULL,
   order_number VARCHAR UNIQUE NOT NULL,
   customer_name VARCHAR,
   customer_phone VARCHAR(12),
   file_name VARCHAR,
   test_mode VARCHAR(1),
   order_lines JSON,

   order_status "type-order_status" default 'new',
   rejected_reason "type-rejected_reason",
   created_in_app_at TIMESTAMPTZ DEFAULT NOW(),
   status_changed_at TIMESTAMPTZ DEFAULT NOW(),
   process_finished_at DATE,

   PRIMARY KEY(order_number)
);
--- Table for finished orders ----
CREATE TABLE orders_process_finished
(
   chain_id VARCHAR(5) NOT NULL,
   store_id VARCHAR(10),
   order_number VARCHAR unique NOT NULL,
   file_name VARCHAR,
   test_mode VARCHAR(1),
   order_lines JSON,

   order_status "type-order_status",
   rejected_reason "type-rejected_reason",
   created_in_app_at TIMESTAMPTZ DEFAULT NOW(),
   status_changed_at TIMESTAMPTZ DEFAULT NOW(),

   PRIMARY KEY (order_number)
);
--- Paste in the following to connect trigger to table ---------
CREATE TRIGGER 
   set_timestamp
BEFORE
UPDATE ON 
   orders
FOR EACH ROW
EXECUTE PROCEDURE 
   trigger_set_timestamp();
--  butikk tabell
CREATE TABLE stores
(
   id SERIAL PRIMARY KEY,
   storeaccount VARCHAR NOT NULL UNIQUE NOT NULL,
   chain_name VARCHAR NOT NULL,
   chain_id VARCHAR,
   store_id VARCHAR UNIQUE NOT NULL
);
--  kontoene må legges inn
INSERT INTO 
   stores(storeaccount, chain_name, chain_id, store_id)
VALUES
   ('store_1_bogstadveien', 'chain_1', '10', '604'),
   ('store_2_bogstadveien', 'chain_2', '10', '607');


   -- Trigger that deletes rows from table orders 
   -- if created_in_app timestamp is older than 120 minute -> (created_in_app_at < NOW() - INTERVAL '120 minute').
   -- and order_status is rejected or delivered

-- CREATE OR REPLACE FUNCTION
--    delete_old_rows() 
-- RETURNS TRIGGER 
-- AS $$
--    BEGIN
--       DELETE FROM 
--          orders 
--       WHERE order_status = 'rejected'
--       OR order_status = 'delivered'
--       AND created_in_app_at < NOW() - INTERVAL '120 minute';
--       RETURN NEW;
--    END;
-- $$
-- LANGUAGE
--    plpgsql;

-- CREATE TRIGGER 
--    delete_old_rows_trigger
--    AFTER INSERT ON 
--       orders
--    EXECUTE PROCEDURE
--       delete_old_rows(); 
