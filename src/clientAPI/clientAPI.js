const API_URL = '/api';

export async function getAllOrdersDB(storeName) {
  try {
    const response = await fetch(`${API_URL}/${storeName}`, {
      method: 'GET',
    });
    const data = await response.json();
    if (data.msg) {
      console.log('getAllOrdersDB-error:', data.msg);
      return false;
    }
    return data;
  } catch (error) {
    console.log(error);
    return `Klarte ikke å hente ordre!`;
  }
}

export async function getOrderByOrderNumber(ordernumber) {
  try {
    const data = await fetch(`${API_URL}/orderstatus/${ordernumber}`, {
      method: 'GET',
    });
    const order = await data.json();
    return order;
  } catch (error) {
    console.log(`Error: ${error}`);
    return `Klarte ikke å hente denne ordren!`;
  }
}

export async function updateOrderStatus(ordernumber, order_status) {
  try {
    const result = await fetch(`${API_URL}/${ordernumber}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_status }),
    });
    return await result.json();
  } catch (error) {
    console.log(`wasn't able to update order status. ${error}`);
    return `Klarte ikke å oppdatere ordre!`;
  }
}

export async function updateRejectedOrderStatus(
  ordernumber,
  order_status,
  rejected_reason
) {
  try {
    const result = await fetch(`${API_URL}/${ordernumber}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order_status, rejected_reason }),
    });
    return await result.json();
  } catch (error) {
    console.log(`wasn't able to update order status-${error}`);
    return `Klarte ikke å oppdatere ordre!`;
  }
}
