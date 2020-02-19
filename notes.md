# Joins

```SQL
SELECT Orders.OrderID, Orders.CustomerID, Shippers.ShipperID, Shippers.ShipperName, Customers.CustomerName, Orders.OrderDate, Shippers.Phone
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Customers.customerID
INNER JOIN Shippers
ON Orders.ShipperID = Shippers.ShipperID

SELECT Orders.OrderID, Products.ProductName, OrderDetails.Quantity, Products.Price, ROUND(OrderDetails.Quantity * Products.Price) AS Total 
FROM OrderDetails
INNER JOIN Orders ON OrderDetails.OrderID = Orders.OrderID
INNER JOIN Products ON OrderDetails.ProductID = Products.ProductID

```