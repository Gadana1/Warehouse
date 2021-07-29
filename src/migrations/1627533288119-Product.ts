import {MigrationInterface, QueryRunner} from "typeorm";

export class Product1627533288119 implements MigrationInterface {
    name = 'Product1627533288119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `warehouse` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `address` text NULL, `city` varchar(100) NULL, `province` varchar(100) NULL, `country` varchar(100) NULL, `countryCode` varchar(10) NULL, `postCode` varchar(10) NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `warehouse_products` (`id` int NOT NULL AUTO_INCREMENT, `barcode` varchar(100) NOT NULL, `mfgAt` datetime NULL COMMENT 'Manufactured date of product', `expAt` datetime NULL COMMENT 'Expiry date of product', `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `warehouseId` int NULL, `productId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `product` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `description` text NULL, `active` tinyint NOT NULL DEFAULT 0, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `warehouse_products` ADD CONSTRAINT `FK_cacfb485dd2cb813e52cd43815d` FOREIGN KEY (`warehouseId`) REFERENCES `warehouse`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `warehouse_products` ADD CONSTRAINT `FK_0f7f3dea02ab939646325ece974` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `warehouse_products` DROP FOREIGN KEY `FK_0f7f3dea02ab939646325ece974`");
        await queryRunner.query("ALTER TABLE `warehouse_products` DROP FOREIGN KEY `FK_cacfb485dd2cb813e52cd43815d`");
        await queryRunner.query("DROP TABLE `product`");
        await queryRunner.query("DROP TABLE `warehouse_products`");
        await queryRunner.query("DROP TABLE `warehouse`");
    }

}
