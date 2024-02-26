# Database Basics Hand Note

#### What is a Database?

A database is a structured collection of related data that represents real-world entities, organized for efficient retrieval, storage, and management.

#### Data and Information

- **Data:** Facts that can be recorded.
- **Information:** Processed and organized data providing meaningful context, insight, or knowledge.

---

## DBMS - (Database Management System)

### Storing Data using File System

- Unstructured data (multiple formats: .txt, .mp4, etc.)
- Data redundancy
- Data inconsistency
- No concurrency protocol
- Security issues
- Access complications

### SQL (Structured Query Language)

---

### Types of Databases

1. Relational
2. Document
3. Key-Value

Examples: MySQL, SQLite, SQL Server, MongoDB, Amazon DynamoDB, Redis

---

### Database Models

1. Hierarchical
2. Network
3. Relational
4. Document
5. Key-Value

---

### Table/Relation Components

- Rows/Tuples/Records
- Columns/Attributes
- Constraints/Domains
- Degree (collection of columns)
- Cardinality (collection of rows)

### Keys

A key in a relational database is a field or a combination of fields that uniquely identifies a record in a table.

- **Super Key:**

  - Attribute or set of attribute by which we can identify each row uniquely
  - Could be a single attribute or a set of attributes
  - Could have null values in the set
  - It actually a superset(e.g., {u_id}, {u_id, email}, {name, email}).

- **Candidate Key:**
  - A minimal super key with no proper subset being a super key (e.g., {u_id}, {name, gender}).
  - Also called Minimal Super Key
  - Potential Primary Key: from the candidate keys, one is chosen as the primary key. However all candidate keys are potential choices for primary key.
- **Primary Key:**

  - From the candidate keys, one key is chosen as the primary key for the table. The Primary key is a specific candidate key that is selected as the main identifier for the records in that table
  - Should be unique, not null and stable (e.g., {u_id}).

- **Alternate Key:**

  - Candidate keys not chosen as the primary key (e.g., {name, gender}).

- **Composite Key:**
  - More than one key combined (e.g., {name, gender}).
- **Foreign Key:** Connects to another table.

---

### Database Design

#### SDLC (Software Development Life Cycle)

1. Planning
2. Analysis
3. System Design (Database Design)
4. Building
5. Testing
6. Deployment

#### Purpose of Database Design

Structured organization for efficient data management and retrieval.

#### Techniques to Design Database

1. Top-Down (0 to work)
2. Bottom-Up (redesign/reshape)
3. Hybrid Approaches (Both 1 & 2)

---

### Entity-Relationship (ER) Diagram

A visual representation in database design illustrating relationships between entities. It shows how different entities relate through various relationships like one-to-one, one-to-many, many-to-many.

#### Top-Down Steps:

- Step-1: Determining Entities
- Step-2: Determining Attributes for Each Entities
- Step-3: Relationships Among Entities
- Step-4: Solving Many to Many

1. **Determining Entities:**

   - Place, person, or thing
   - Properties or attributes
   - Unique identity
   - Singular name
   - Contains more than one instance of data

2. **Determining Attributes for Each Entity:**

   - Related to the entity
   - Atomic
   - Has keys

3. **Relationships Among Entities:**
   - Rectangular Box: Entity
   - Round Shape: Attribute
   - Diamond Shape: Relationship among entities
   - Attribute Underline: Key

#### Cardinality

Relationship cardinality in databases specifies how many instances of one entity are associated with how many instances of another entity.

1. **One-to-One (1:1):**

   - In a one-to-one relationship, each record in one table is related to only one record in another table, and vice versa.
   - Example: Consider two tables - "Person" and "Passport." Each person can have only one passport, and each passport is linked to only one person. This is a one-to-one relationship.

1. **One-to-Many (1:N or 1:\*):**
   - In a one-to-many relationship, a record in one table can be related to multiple records in another table, but each record in the second table is related to only one record in the first table.
   - Example: Consider two tables - "Department" and "Employee." Each department can have many employees, but each employee works in only one department. This is a one-to-many relationship.
1. \*_Many-to-One (N:1 or _:1):
   - This is essentially the reverse of the one-to-many relationship. Many records in one table can be related to a single record in another table.
   - Example: In the "Employee" and "Manager" scenario, many employees can have the same manager, but each manager is assigned to manage only one group of employees. This is a many-to-one relationship.
1. **Many-to-Many (N:N or _:_):**
   - In a many-to-many relationship, records in one table can be related to multiple records in another table, and vice versa.
   - Example: Consider two tables - "Student" and "Course." A student can enroll in multiple courses, and a course can have multiple students. This is a many-to-many relationship. To represent this in a relational database, a junction table or associative entity is often used.

#### ER Diagram Tools

- Lucid Chart
- Draw.io

---

#### Anomalies in Databases

Anomalies in databases refer to inconsistencies or unexpected issues can occur during data manipulation or retrieval

- Three main types of anomalies:
  - Update Anomalies
  - Delete Anomalies
  - Insert Anomalies

#### Normalization

Normalizaton is a technique which we use to remove anomalies from table

1. **Functional Dependency:** Functional dependency is simple terms means that the value of one attribute (or set of attributes) uniquely determines the value of another attributes in a database table
   - t1.x = t2.x
   - t1.y = t2.y
2. **Normal Forms:** A series of guidelines that help to ensure that the design of a database is efficient, organized, and free form data anomalies.

   - **1NF - Rules:**

     - Atomic values
     - Unique column name
     - Positional dependency of data
     - Determine primary key

   - **2NF - Rules:**
     - Must be in 1NF
     - Must not contain any non-prime/non-key attributer that is functionally dependent on a proper subset of any candidate key of the relation
   - **3NF - Rules:**
     - Must be in 2NF
     - Must not contain transitive dependency
