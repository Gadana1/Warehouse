
export enum Permission {

  Admin = "*:*",

  // User
  AdminUser = "User:*",
  UserReadAll = "User:Read-All",
  UserReadOne = "User:Read-One",
  UserCreateOne = "User:Create-One",
  UserCreateMany = "User:Create-Many",
  UserUpdateOne = "User:Update-One",
  UserReplaceOne = "User:Replace-One",
  UserDeleteOne = "User:Delete-One",
  UserRecoverOne = "User:Recover-One",
  UserAddRole = "User:Add-Role",
  UserRemoveRole = "User:Remove-Role",
  UserActivateOne = "User:Activate-One",
  UserSuspendOne = "User:Suspend-One",

  // Role
  AdminRole = "Role:*",
  RoleReadAll = "Role:Read-All",
  RoleReadOne = "Role:Read-One",
  RoleCreateOne = "Role:Create-One",
  RoleCreateMany = "Role:Create-Many",
  RoleUpdateOne = "Role:Update-One",
  RoleReplaceOne = "Role:Replace-One",
  RoleDeleteOne = "Role:Delete-One",
  RoleRecoverOne = "Role:Recover-One",
  RoleReadAllPermission = "Role:Read-All-Permission",
  RoleAddPermission = "Role:Add-Permission",
  RoleRemovePermission = "Role:Remove-Permission",

  // Product
  AdminProduct = "Product:*",
  ProductReadAll = "Product:Read-All",
  ProductReadOne = "Product:Read-One",
  ProductCreateOne = "Product:Create-One",
  ProductCreateMany = "Product:Create-Many",
  ProductUpdateOne = "Product:Update-One",
  ProductReplaceOne = "Product:Replace-One",
  ProductDeleteOne = "Product:Delete-One",
  ProductRecoverOne = "Product:Recover-One",

  // Warehouse
  AdminWarehouse = "Warehouse:*",
  WarehouseReadAll = "Warehouse:Read-All",
  WarehouseReadOne = "Warehouse:Read-One",
  WarehouseCreateOne = "Warehouse:Create-One",
  WarehouseCreateMany = "Warehouse:Create-Many",
  WarehouseUpdateOne = "Warehouse:Update-One",
  WarehouseReplaceOne = "Warehouse:Replace-One",
  WarehouseDeleteOne = "Warehouse:Delete-One",
  WarehouseRecoverOne = "Warehouse:Recover-One",

  // Warehouse Product
  AdminWarehouseProduct = "WarehouseProduct:*",
  WarehouseProductReadAll = "WarehouseProduct:Read-All",
  WarehouseProductReadOne = "WarehouseProduct:Read-One",
  WarehouseProductCreateOne = "WarehouseProduct:Create-One",
  WarehouseProductCreateMany = "WarehouseProduct:Create-Many",
  WarehouseProductUpdateOne = "WarehouseProduct:Update-One",
  WarehouseProductReplaceOne = "WarehouseProduct:Replace-One",
  WarehouseProductDeleteOne = "WarehouseProduct:Delete-One",
  WarehouseProductRecoverOne = "WarehouseProduct:Recover-One",
  
}
