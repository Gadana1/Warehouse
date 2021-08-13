import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1627526458294 implements MigrationInterface {
  name = 'User1627526458294';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `email` varchar(100) NOT NULL, `password` varchar(256) NULL, `active` tinyint NOT NULL DEFAULT 0, `suspendedAt` datetime NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `role` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `deletedAt` datetime(6) NULL, `permissions` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `user_roles` (`userId` int NOT NULL, `roleId` int NOT NULL, INDEX `IDX_472b25323af01488f1f66a06b6` (`userId`), INDEX `IDX_86033897c009fcca8b6505d6be` (`roleId`), PRIMARY KEY (`userId`, `roleId`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `user_roles` ADD CONSTRAINT `FK_472b25323af01488f1f66a06b67` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE `user_roles` ADD CONSTRAINT `FK_86033897c009fcca8b6505d6be2` FOREIGN KEY (`roleId`) REFERENCES `role`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_86033897c009fcca8b6505d6be2`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_roles` DROP FOREIGN KEY `FK_472b25323af01488f1f66a06b67`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_86033897c009fcca8b6505d6be` ON `user_roles`',
    );
    await queryRunner.query(
      'DROP INDEX `IDX_472b25323af01488f1f66a06b6` ON `user_roles`',
    );
    await queryRunner.query('DROP TABLE `user_roles`');
    await queryRunner.query('DROP TABLE `role`');
    await queryRunner.query(
      'DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`',
    );
    await queryRunner.query('DROP TABLE `user`');
  }
}
