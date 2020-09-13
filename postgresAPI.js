require('dotenv').config();

const Pool = require('pg').Pool;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// post data in orders table in postgres
async function createOrder(orderObject) {
  const {
    chain_id,
    store_id,
    order_number,
    customer,
    phone,
    file_name,
    test_mode,
    order_lines,
  } = orderObject;

  console.log(orderObject.order_number);

  const { rows } = await pool.query(
    `
  insert into
    orders
  (chain_id,
    store_id,
    order_number,
    customer_name,
    customer_phone,
    file_name,
    test_mode,
    order_lines
    )
    values
	    ($1, $2, $3, $4, $5, $6, $7, $8)
    returning
    *
    `,
    [
      chain_id,
      store_id,
      order_number,
      customer,
      phone,
      file_name,
      test_mode,
      JSON.stringify(order_lines),
    ]
  );
  console.log(rows[0]);
  return rows[0];
}
// get store
async function getStoreAccount(storeName) {
  try {
    const data = await pool.query(
      `
    		select
        		*
    		from
        		stores
      		where
        		storeaccount = $1
    		;`,
      [storeName]
    );

    if (data.length === '') {
      return `No pick-up orders in database`;
    } else {
      return data.rows[0];
    }
  } catch (error) {
    return `getStoreAccount-error: ${error.message}`;
  }
}
// get all orders from postgres
async function getAllOrders(storeaccount) {
  const { chain_id, store_id } = storeaccount;
  try {
    const data = await pool.query(
      `
   			select
   		    	*
   		  	from
   		    	orders
   		  	where
   		    	chain_id = $1
   		  	AND
   		    	store_id = $2
   		  	order by
   		   		orders.created_in_app_at desc;
   		`,
      [chain_id, store_id]
    );

    if (data.length === '') {
      return `No such store name in table stores, database`;
    } else {
      return data.rows;
    }
  } catch (error) {
    console.log(`getAllOrders-error: ${error.message}`);
    return false;
  }
}

// get one order based on order number
async function getOrder(ordernumber) {
  try {
    const data = await pool.query(
      `
      	select 
        	*
      	from
      		orders
      	where 
        	order_number = $1
        `,
      [ordernumber]
    );

    if (data.length === ``) {
      console.log(`No order with that order number`);
      return `No order with that order number`;
    } else {
      return data.rows[0];
    }
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return error;
  }
}

// update status on one order
async function updateOrderStatus(ordernumber, orderstatus) {
  let queryText;
  let queryValues;

  if (orderstatus === 'delivered') {
    queryText = `
    update 
    orders
  set
  order_status = $2,
  customer_name = $3,
  customer_phone = $4
  where
    order_number = $1
  returning
    *
    `;
    queryValues = [ordernumber, orderstatus, '', ''];
  } else {
    queryText = `
    update 
    orders
    set
	  order_status = $2
    where
    order_number = $1
    returning
    *
    `;

    queryValues = [ordernumber, orderstatus];
  }

  const { rows } = await pool.query(queryText, queryValues);
  return rows[0];
}
// update status on one rejected order
async function updateRejectedOrderStatus(ordernumber, orderstatus, reason) {
  const queryText = `
    update 
      orders
    set
	  order_status = $2,
	  rejected_reason = $3,
	  customer_name = $4,
	  customer_phone = $5
    where
      order_number = $1
    returning
      *
  `;
  const queryValues = [ordernumber, orderstatus, reason, '', ''];

  const { rows } = await pool.query(queryText, queryValues);

  return rows[0];
}

// create order history table
async function createOrderHistory(postedOrder, order_status, rejected_reason) {
  const {
    chain_id,
    store_id,
    order_number,
    file_name,
    test_mode,
    order_lines,
  } = postedOrder;

  const { rows } = await pool.query(
    `
  insert into
    orders_process_finished
  (chain_id,
    store_id,
    order_number,
    file_name,
    test_mode,
    order_lines, 
    order_status, 
    rejected_reason
    )
    values
	    ($1, $2, $3, $4, $5, $6, $7, $8)
    returning
    *
    `,
    [
      chain_id,
      store_id,
      order_number,
      file_name,
      test_mode,
      JSON.stringify(order_lines),
      order_status,
      rejected_reason,
    ]
  );
  return rows[0];
}

module.exports = {
  createOrder,
  getStoreAccount,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updateRejectedOrderStatus,
  createOrderHistory,
};
