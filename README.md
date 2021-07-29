# Warehouse
Managing product inventory requires adding products to a product catalog and adding warehouses to store the products. A system administrator control access rights for users.

## Description

### Features
- Add product
- Add warehouse
- Stock
- Unstock
- List product
- List warehouses
- List warehouse
- Delete product
- Delete Warehouse
- Manage users
- Manage roles & permissions
- View audit logs

### User Stories
- As a user I can register.
- As an admin i can approve registration, reject, suspend, and delete users.
- As a user I can login in only after approval and do the following on a product:
- Add product
- List products
- Add warehouse
- List warehouse
- List warehouses
- Delete product
- Delete warehouse
- As a user I can logout from the system
- As an admin i can login to manage users
- As an admin i can manage roles & permissions
- As an admin i can view audit logs

## Installation

```bash
# install pakages
$ npm install

# create env file
$ cp .env.example .env
```
- Set environment variable `DEFAULT_ADMIN_EMAIL` in `.env` file. e.g `DEFAULT_ADMIN_EMAIL="blah@blah.com"`
- Set environment variable `DEFAULT_ADMIN_PASSWORD` in `.env` file. e.g `DEFAULT_ADMIN_PASSWORD="blah12345!"`

- Set environment variable `JWT_SECRET_KEY` in `.env` file. Random key of attlist 512 bits or 64 bytes

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

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
