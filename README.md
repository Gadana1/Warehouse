# Warehouse Management System
Managing product inventory requires adding products to a product catalog and adding warehouses to store the products. A system administrator controls access rights for users.


## System Specification
 
- **Web Server** - Nodejs (NestJs Framework) - using Typescript
NestJs is a very opinionated framework, and it helps keep everything organized. Each feature is organized into a separate Module which makes it easier to debug and modify.
 
- **Database Server** - MYSQL 8+
For a Warehouse Management system, data integrity is essential. In addition to that, flexibility and speed for querying large amounts of data is also vital. Hence, a RDBMS like MYSQL would be preferable

- Docker Supported
 
 
## Database ERD
![Image or Database ERD]
(https://github.com/Gadana1/Warehouse/blob/develop/docs/Warehouse%20Erd.jpg)
 

## Features

### Auth
- Register as a user: Account can only be used after activation by an Admin. Admin will also need to assign a Role to the new User
- Login: Upon success, a JWT Access Token will be dispensed, which can then be used to access protected APIs
 
### Users Management
- Create Single User
- Create Multiple Users
- View Single User
- View All Users (Paginated)
- Update and Replace Single User
- Delete Single User
- Recover Deleted User
- Suspend User
- Activate User
- Add Role to User
- Remove Role from User
- Get Current User Info
 
### Roles & Access Management
- Create Single Role
- Create Multiple Roles
- View Single Roles
- View All Roles (Paginated)
- Update and Replace Single Role
- Delete Single Role
- Recover Deleted Role
- Add Permission to Role
- Remove Permission from Role
- View All Permissions
 
### Product Management
- Create Single Product
- Create Multiple Products
- View Single Product
- View All Products (Paginated)
- Update and Replace Single Product
- Delete Single Product
- Recover Deleted Product
 
### Warehouse Management
- Create Single Warehouse
- Create Multiple Warehouses
- View Single Warehouse
- View All Warehouses (Paginated)
- Update and Replace Single Warehouse
- Delete Single Warehouse
- Recover Deleted Warehouse
 
### Warehouse Product Management
This is used for stocking and un-stocking products.
It considers the fact one product can have multiple units in different warehouse
and each of the units have unique information such as `barcode`, `Mfg Date`, `Expiry Date` etc.
- Create Single Warehouse
- Create Multiple Warehouses
- View Single Warehouse
- View All Warehouses (Paginated)
- Update and Replace Single Warehouse
- Delete Single Warehouse
- Recover Deleted Warehouse
 
 
## Security
 
- **JWT Tokens** -  All `/api` endpoints are secured by JWT Tokens which can only be gotten via the Login API
 
- **RBAC** - Every `/api` endpoint is protected by Permissions. Users have Roles, and Roles have Permissions.
Hence, to access a protected endpoint, you need to do so with a user account with a Role that has granted the needed Permission.

Permissions are in the format `Feature:Access`.
e.g `User:Read-All` Grants access to view all Users.

Permissions also support wildcards.
e.g `Product:*` Grants access to all User features
and `*:*` is an Administrator Permission and grants access to everything
 
- **Throttling** - All Endpoints are throttled to reduce chances of DDOS attacks - with a default of 100 requests every minute. Login and Registration endpoints however, have a default of 3 requests per minute.
 
 
## Installation
 
```bash
# install packages
$ npm install
 
# create env file
$ cp .env.example .env
```
- Set the environment variable `DEFAULT_ADMIN_EMAIL` in the '.env' file. e.g `DEFAULT_ADMIN_EMAIL="blah@blah.com"`
- Set the environment variable `DEFAULT_ADMIN_PASSWORD` in the '.env' file. e.g `DEFAULT_ADMIN_PASSWORD="blah12345!"`
 
- Set the environment variable `JWT_SECRET_KEY` in the '.env' file. Random key of about 512 bits or 64 bytes
 
- Set Database Credentials in `.env` file.
 
 
## Running the app
 
```bash
# with docker - development
$ docker-compose up
 
# without docker - development
$ npm run start
 
# without docker - watch mode
$ npm run start:dev
 
# production mode
$ npm run start:prod
```
 
## Default Endpoint
- http://localhost:8080
 
 
## Documentation
- Uses Swagger.
- Go to http://localhost:8080/docs
 
 
## Test *(Pending development of test cases)*
 
```bash
# unit tests
$ npm run test
 
# e2e tests
$ npm run test:e2e
 
# test coverage
$ npm run test:cov
```
