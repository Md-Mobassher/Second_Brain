### Connect to PostgreSQL:

- To connect to PostgreSQL as the `postgres` user:

```shell
psql -U postgres -d postgres
```

You will be prompted to enter the password for the "postgres" user.

```SQL Shell (psql)
psql -U postgres -h localhost
```

### List Databases:

- To see list all databases:

```
\l
```

### Connected Databases:

```
\conninfo
```

### Connect to a Specific Database:

- To switch to a specific database:

```
\c your_database_name
```

Replace `your_database_name` with the actual name of the database.

---

### Create a new Database:

- To create a new database:

```
create database new_database;
```

or

```
CREATE DATABASE test;
```

Replace `new_database` with the actual name of the database.

#### Update Database:

```
alter database tes rename to ph;
```

#### Delete Database:

```
drop database ph;
```

#### Schema Databases:

```
\dn
```

#### Clear

```
\cls
```

---

#### See all user

```
\du
```

#### Create user

```
create user user_name with login encrypted password '123456'
```

#### Create role

```
create role role_name with login encrypted password '123456'
```

### List Tables:

- To list all tables in the current database:

```
\dt
```

### List Tables in a Specific Schema:

- To list all tables in a specific schema:

```
\dt your_schema_name.*
```

Replace `your_schema_name` with the actual name of the schema.

### Show Table Structure:

- To show the structure of a table:

```
\d your_table_name
```

Replace `your_table_name` with the actual name of the table.

### Execute SQL Query:

- To execute a SQL query:

```
SELECT * FROM your_table_name;
```

Replace `your_table_name` with the actual name of the table.

### Exit PostgreSQL:

- To exit the PostgreSQL shell:

```
\q
```

## SQL- Structured Query Language

Declarative Language :

SQL Commands

    DDL :
    - CREATE
    - DROP
    - ALTER
    - TRUNCATE

    DML:
    - INSERT
    - UPDATE
    - DELETE

    DCL:
    - GRANT
    - REVOKE

    TCL:
    - COMMIT
    - ROLLBACK
    - SAVEPOINT

    DQL:
    - SELECT

---

#### Data Types

- Boolean - (true, false, null)
- Numbers - ()
- Date/Time
- Character
- UUID
- Binary
- Json
- Array
- XML

#### Number

Here are the details for the specified PostgreSQL data types:

1. **int:**

   - Alias: integer
   - Storage Size: 4 bytes
   - Range: -2,147,483,648 to 2,147,483,647

2. **bigint:**

   - Storage Size: 8 bytes
   - Range: -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807

3. **smallint:**

   - Storage Size: 2 bytes
   - Range: -32,768 to 32,767

4. **float4 (Single Precision):**

   - Alias: real
   - Storage Size: 4 bytes
   - Range: ~6 decimal digits of precision

5. **float8 (Double Precision):**

   - Alias: double precision
   - Storage Size: 8 bytes
   - Range: ~15 decimal digits of precision

6. **numeric (Arbitrary Precision):**

   - Alias: decimal
   - Storage Size: Variable (depends on precision and scale)
   - Range: Arbitrary precision and scale

7. **serial:**

   - Alias: serial4 (for integer), bigserial (for bigint)
   - Auto-incrementing integer with default values

#### Character

1. **char(n):**

   - Fixed-length character string.
   - Storage Size: n bytes.
   - Trailing spaces are padded.
   - Example: `char(10)` will store a string of exactly 10 characters.

2. **varchar(n):**

   - Variable-length character string.
   - Storage Size: Length of the string plus 1 byte.
   - No trailing spaces are added.
   - Example: `varchar(255)` can store up to 255 characters.

3. **text:**
   - Variable-length character string with no specified maximum length.
   - Storage Size: Length of the string plus 1 byte.
   - Suitable for storing large amounts of text.

#### Date

1. **date:**
   - Stores date values.
   - Storage Size: 4 bytes.
   - Example: `2022-02-26`.
2. **time:**
   - Stores time of day values.
   - Storage Size: 8 bytes.
   - Example: `14:30:00`.
3. **timestamp:**
   - Stores both date and time values.
   - Storage Size: 8 bytes.
   - Example: `2022-02-26 14:30:00`.
4. **timestamptz:**
   - Stores both date and time values, adjusted for the time zone.
   - Storage Size: 8 bytes.
   - Example: `2022-02-26 14:30:00+00`.
5. **interval:**
   - Represents a time duration.
   - Storage Size: 12 bytes.
   - Example: `INTERVAL '1 day 3 hours'`.

#### UUID

- Stores 128-bit universally unique identifiers.
- Storage Size: 16 bytes.
- Example: `550e8400-e29b-41d4-a716-446655440000`.

---

## Postgres using Valentina studio

### Create table

```
CREATE TABLE table_name (
	column1 datatype constrain,
	column2 datatype constrain,
	column3 datatype constrain,
)
```

#### Column constrain

```
-- Creating a table with various column constraints
CREATE TABLE example_table (
    -- Primary key constraint
    id serial PRIMARY KEY,

    -- Unique constraint
    username varchar(255) UNIQUE,

    -- Not null constraint
    email varchar(255) NOT NULL,

    -- Check constraint to ensure age is greater than or equal to 18
    age int CHECK (age >= 18),

    -- Foreign key constraint referencing another table (users)
    user_id int REFERENCES users(user_id)
);

```

---

## Alter

### 1. **ALTER TABLE:**

- Used to modify an existing table, such as adding, modifying, or dropping columns or constraints.

**Example: Add a new column to a table:**

```
ALTER TABLE your_table
ADD COLUMN new_column varchar(255);
```

**Example: Modify the data type of an existing column:**

```
ALTER TABLE your_table
ALTER COLUMN existing_column TYPE new_data_type;
```

**Example: Drop a column from a table:**

```
ALTER TABLE your_table
DROP COLUMN column_to_drop;
```

### 2. **ALTER DATABASE:**

- Used to modify the attributes of an existing database.

**Example: Change the owner of a database:**

```
ALTER DATABASE your_database
OWNER TO new_owner;
```

**Example: Rename a database:**

```
ALTER DATABASE old_name
RENAME TO new_name;
```

### 3. **ALTER SCHEMA:**

- Used to modify the attributes of an existing schema within a database.

**Example: Change the owner of a schema:**

```
ALTER SCHEMA your_schema
OWNER TO new_owner;
```

### 4. **ALTER INDEX:**

- Used to modify the attributes of an existing index.

**Example: Rename an index:**

```
ALTER INDEX old_name
RENAME TO new_name;
```

### 5. **ALTER VIEW:**

- Used to modify the definition of an existing view.

**Example: Rename a view:**

```
ALTER VIEW old_name
RENAME TO new_name;
```

### 6. **ALTER ROLE:**

- Used to modify the attributes of a database role.

**Example: Change the password of a role:**

```
ALTER ROLE role_name
WITH PASSWORD 'new_password';
```

### 7. **ALTER FUNCTION and ALTER PROCEDURE:**

- Used to modify the attributes of an existing function or stored procedure.

**Example: Change the owner of a function:**

```
ALTER FUNCTION your_function()
OWNER TO new_owner;
```

1. **DROP:**

   - The `DROP` statement is used to remove an entire table, including its structure (columns, constraints, indexes, etc.).
   - It not only removes the data but also deletes the table itself.
   - Once a table is dropped, it is no longer available in the database, and you might need to recreate it if needed.
   - Be cautious when using `DROP` as it permanently removes the table and its data.

   **Example: Drop a table**

```
DROP TABLE your_table;
```

2. **TRUNCATE:**

   - The `TRUNCATE` statement is used to remove all rows from a table, but it keeps the table structure intact.
   - It is faster than `DELETE` for removing all rows because it does not generate individual row delete statements; instead, it deallocates the data pages.
   - The `TRUNCATE` operation is generally non-transactional, meaning you cannot roll back its effects.
   - It is useful when you want to quickly remove all data from a table but keep the table structure for future use.

   **Example: Truncate a table**

```
TRUNCATE TABLE your_table;
```

**Summary:**

- `DROP` removes the entire table and its structure.
- `TRUNCATE` removes all rows from a table but keeps the table structure.
- Use `DROP` when you want to get rid of the table entirely.
- Use `TRUNCATE` when you want to remove all data from the table but keep the table structure for future use.

---

## SELECT

The `SELECT` statement is one of the most fundamental and widely used SQL commands. It is used to retrieve data from one or more tables in a database.

```
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

### 1. **SELECT Clause:**

- Specifies the columns to be retrieved in the result set.

**Example:**

```
SELECT first_name, last_name FROM employees;
```

### 2. \*\*DISTINCT Clause:

- Removes duplicate rows from the result set.
  **Example:**

```
SELECT DISTINCT department_id FROM employees;
```

### 3. **FROM Clause:**

- Specifies the table from which to retrieve data.

**Example:**

```
SELECT product_name, price FROM products;
```

### 4. **WHERE Clause:**

- Filters rows based on a specified condition.

**Example:**

```
SELECT * FROM orders WHERE order_status = 'Shipped';
```

### 5. **ORDER BY Clause:**

- Sorts the result set by one or more columns.

**Example:**

```
SELECT product_name, price FROM products ORDER BY price DESC;
```

### 6. **LIMIT Clause:**

- Limits the number of rows in the result set.

**Example:**

```
SELECT * FROM customers LIMIT 10;
```

### 7. **OFFSET Clause:**

- Skips a specified number of rows in the result set.

**Example:**

```
SELECT * FROM customers OFFSET 10;
```

### 8. **GROUP BY Clause:**

- Groups rows based on specified columns and allows the use of aggregate functions.

**Example:**

```
SELECT department_id, AVG(salary) FROM employees GROUP BY department_id;
```

### 9. **HAVING Clause:**

- Filters groups based on aggregate conditions in the `GROUP BY` clause.

**Example:**

```
SELECT department_id, AVG(salary) FROM employees GROUP BY department_id HAVING AVG(salary) > 50000;
```

### 10. **JOIN Clause:**

- Combines rows from two or more tables based on a related column.

**Example:**

```
SELECT employees.first_name, employees.last_name, departments.department_name FROM employees INNER JOIN departments ON employees.department_id = departments.department_id;
```

### 11. **UNION Clause:**

- Combines the result sets of two or more `SELECT` statements.

**Example:**

```
SELECT first_name, last_name FROM employees UNION SELECT first_name, last_name FROM temporary_employees;
```

### 12. **CASE Clause:**

- Performs conditional logic within the `SELECT` statement.

**Example:**

```
SELECT product_name,        CASE            WHEN price > 100 THEN 'Expensive'            ELSE 'Affordable'        END AS price_category FROM products;
```

---

# Function

### 1. Scalar Function

A scalar function operates on individual values, usually one or more input parameters, and returns a single value. Scalar functions are used for computations or transformations at the row level.
UPPER(), LOWER(), CONCAT(), LENGTH()

#### - Mathematical Scalar Function:

-- Example: Absolute Value

```
SELECT ABS(-10) AS absolute_value; -- Result: 10
```

#### - String Scalar Function:

-- Example: Concatenation

```
SELECT CONCAT('Hello', ' ', 'World') AS greeting; -- Result: Hello World
```

#### - Date and Time Scalar Function:

-- Example: Current Date

```
SELECT CURRENT_DATE AS current_date; -- Result: Current date
```

#### - Conditional Scalar Function:

```
-- Example: CASE Statement
SELECT
    CASE
        WHEN age < 18 THEN 'Minor'
        WHEN age >= 18 AND age < 65 THEN 'Adult'
        ELSE 'Senior'
    END AS age_group
FROM persons;
```

#### - Custom Scalar Function

-- Custom scalar function (e.g., square function)

```
CREATE FUNCTION calculate_square(input_number INTEGER)
RETURNS INTEGER AS
$$
BEGIN
    RETURN input_number * input_number;
END;
$$
LANGUAGE plpgsql;

-- Using the custom scalar function
SELECT calculate_square(5) AS square_result; -- Result: 25

```

### 2. Aggregate Function

AVG(), MAX(), MIN(), SUM(), COUNT()

#### - Mathematical Aggregate Function:

-- Example: Average Salary

```
SELECT AVG(salary) AS average_salary FROM employees;
```

#### - String Aggregate Function:

-- Example: Concatenate Names

```
SELECT department_id, STRING_AGG(employee_name, ', ') AS employee_names FROM employees GROUP BY department_id;
```

#### - Date and Time Aggregate Function:

-- Example: Latest Order Date

```
SELECT MAX(order_date) AS latest_order_date FROM orders;
```

#### - Conditional Aggregate Function:

-- Example: Count of Shipped Orders

```
SELECT COUNT(*) AS shipped_order_count FROM orders WHERE order_status = 'Shipped';
```

### User-Defined Scalar Function:

#### User-Defined Mathematical Scalar Function:

-- Example: Custom Scalar Function to Calculate Square

```
CREATE FUNCTION calculate_square(input_number INTEGER)
RETURNS INTEGER AS
$$
DECLARE
    result INTEGER;
BEGIN
    result := input_number * input_number;
    RETURN result;
END;
$$
LANGUAGE plpgsql;

-- Usage
SELECT calculate_square(5) AS square_result; -- Result: 25

```
