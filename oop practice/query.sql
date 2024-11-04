SELECT e.employee_name, d.department_name FROM employees e INNER JOIN departments d ON e.department_id = d.id WHERE e.department_id = d.id;

SELECT e.employee_name, d.department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id WHERE d.department_name = "no department";

SELECT e.employee_name, d.department_name FROM employees e RIGHT JOIN departments d ON e.department_id = d.id;

SELECT e1.name, e1.manager_id FROM employee AS e1, employee AS e2 WHERE e1.manager_id = e2.id;

SELECT e.id, e.enrollment, s.name, c.course_name FROM enrollment e INNER JOIN student s ON e.student_id = s.id INNER JOIN course c ON e.course_id = c.id;

CREATE TABLE orders(
    order_id int,
    product_id int, 
    quantity int,
    order_date int,
    PRIMARY KEY(order_id, product_id)
);

CREATE TABLE shipment(
    id int,
    order_id int,
    product_id int,
    shipment_date date,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id, product_id)REFERENCES orders (order_id, product_id)
);

SELECT order_id, SUM(quantity) AS Total_quantity FROM orders GROUP BY order_id;

SELECT product_id, COUNT(sale_amount) AS Total_sale FROM sales GROUP BY product_id;

SELECT product_id, SUM(sale_amount) AS Total_sale FROM sales GROUP BY product_id;

SELECT product_id, AVG(sale_amount) AS Total_sale FROM sales GROUP BY product_id;

SELECT product_id, SUM(sale_amount) AS Total_sale, COUNT(sale_amount) AS number_of_sale, AVG(sale_amount) AS average_sale_amount FROM sales GROUP BY product_id;

SELECT product_id, min(sale_amount) AS minimum_sale, MAX(sale_amount) AS maximum_sale FROM sales;

SELECT product_id, sale_amount FROM sales WHERE sale_amount > 3500;

SELECT product_id, SUM(sale_amount) AS total_sale FROM sales GROUP by product_id HAVING SUM(sale_amount > 3500);

SELECT product_id, SUM(sale_amount) AS Total_sale FROM sales WHERE sale_amount > 3500 GROUP BY product_id HAVING SUM(sale_amount> 3000);

SELECT * FROM current_customer UNION SELECT * FROM past_customer;

SELECT * FROM current_customer UNION ALL SELECT * FROM past_customer;

SELECT * FROM current_customer INNER JOIN past_customer ON current_customer.name = past_customer.name;

SELECT * FROM `past_customer` WHERE id NOT IN (SELECT id FROM current_customer) UNION SELECT * FROM `current_customer` WHERE id NOT IN (SELECT id FROM past_customer);