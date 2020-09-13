import { getExpiryFromOrderDate } from "./getExpiryFromOrderDate";
import { getDayFromOrderDate } from "./getExpiryFromOrderDate";

test("order in store opening hours during weekday (mon-fri) should have expiry 2 hours after order time (1)", () => {
  let orderTime = "2020-01-15T11:00:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-15T13:00:37.961Z");
});

test("order in store opening hours should have expiry 2 hours after order time (1)", () => {
  let orderTime = "2020-01-15T11:14:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-15T13:14:37.961Z");
});

test("order before store opening hours during weekday (mon-fri) should have expiry 12:00 the same day (1)", () => {
  let orderTime = "2020-01-15T08:14:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-15T11:00:37.961Z");
});

test("order in store after opening hours during weekday (mon-fri) should have expiry 12:00 the next day (1)", () => {
  let orderTime = "2020-01-15T20:14:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-16T11:00:37.961Z");
});

test("order in store before opening hours Saturday should have expiry 12:00 the same day (1)", () => {
  let orderTime = "2020-01-18T07:14:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-18T11:00:37.961Z");
});

test("order in store after opening hours Saturday should have expiry 12:00 next Monday (1)", () => {
  let orderTime = "2020-01-18T21:20:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-20T11:00:37.961Z");
});

test("order in store after opening hours Saturday should have expiry 12:00 next Monday (1)", () => {
  let orderTime = "2020-01-25T18:00:00.001Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-27T11:00:00.001Z");
});

test("order in store during opening hours Saturday should have expiry 2 hours after order time (1)", () => {
  let orderTime = "2020-01-18T12:00:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-18T14:00:37.961Z");
});

test("order in store during Sunday should have expiry 12:00 next Monday (1)", () => {
  let orderTime = "2020-01-19T21:20:37.961Z";
  let expireTime = getExpiryFromOrderDate(orderTime);
  expect(expireTime).toBe("2020-01-20T11:00:37.961Z");
});

test("order on Friday should return weekday (1)", () => {
  let orderTime = "2020-01-24T21:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Weekday");
});

test("order on Tuesday should return weekday (2)", () => {
  let orderTime = "2020-01-28T21:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Weekday");
});

test("order on Wednesday should return weekday (3)", () => {
  let orderTime = "2020-01-29T21:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Weekday");
});

test("order on Thursday should return weekday (4)", () => {
  let orderTime = "2020-01-23T21:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Weekday");
});

test("order on Monday should return weekday (5)", () => {
  let orderTime = "2020-01-27T11:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Weekday");
});

test("order on Saturday should return Saturday (1)", () => {
  let orderTime = "2020-01-25T11:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Saturday");
});

test("order on Sunday should return Sunday (1)", () => {
  let orderTime = "2020-01-26T11:20:37.961Z";
  let day = getDayFromOrderDate(orderTime);
  expect(day).toBe("Sunday");
});
