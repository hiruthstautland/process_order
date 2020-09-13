# Process Orders (Distributed Warehouse) - POC App
The application will receive orders where pick-up in store have been selected at check-out and the selected store have the order available in store.
The order will be displayed under the new (default) tab, the personell has 2 hours to pick it before the order is automatically rejected by the store, and sent to the main storage. 

## Dependecies
npm install 

## Creating environment
add .env file with PORT = 3000

## Run application
npm start - for development use nodemon and develop

### Run development server in browser
npm run nodemon
npm run develop -> y

## Auth
Login with auth0 is currently disabled for presentations

You should now get an error view saying that the database seems to be down.

## Conenction to PostgresSQL
1. Install postgres
2. Create database, and paste in all from the pg_init.sql file found in root.
    - make sure the values are the same as in the .env file.
    Example: 
        DATABASE_URL = "postgres://USER:PASSWORD@localhost:PORT/DATABASE_NAME"

    Actuall:
```.env
DATABASE_URL = "postgres://me:password@localhost:5432/distributed_warehouse"
```

## Postman
Use for example postman to post, put and get request from server.
<https://www.getpostman.com/>

## Add mock-orders into the database
POST a request to <http://localhost:3000/api/orders/> with JSON body. Mock order from test environment can be found in extra.

It auth is enabled, make sure to paste the current token in the Authorization tab.

For each order added in DB a new unique ordernumber must be created:
```json
"order_number": "..."
```

The application should now be up and running
