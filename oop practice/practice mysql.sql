SELECT * FROM `student` WHERE salary = (SELECT MAX(salary) FROM student WHERE department = student.department);

SELECT * from employee e CROSS JOIN manager m ON e.manager_id = m.id;

SELECT SUM(salary) AS salary, name, department FROM student GROUP BY department;

SELECT name, email FROM student WHERE email IN(SELECT email FROM student GROUP BY email HAVING COUNT(email)>1);

SELECT *
FROM Employees
WHERE join_date >= DATE_SUB(CURRENT_DATE, INTERVAL 6 MONTH)


SELECT *
FROM Customers
WHERE customer_id NOT IN (
SELECT customer_id
FROM Orders
)

UPDATE Products
SET stock = stock - (
  SELECT SUM(quantity)
  FROM Orders
  WHERE Orders.product_id = Products.product_id
)


DELETE FROM Products
WHERE product_id NOT IN (
  SELECT product_id
  FROM Sales
  WHERE sale_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
)


SELECT *
FROM Orders
WHERE total_cost > 1000


SELECT e.employee_name, e.salary, (SELECT COUNT(*) FROM employees e2 WHERE e2.salary > e.salary ) + 1 AS rank FROM employees e ORDER BY e.department_id, e.salary;