/*
  Warnings:

  - You are about to drop the column `create_at` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Itinerary` DROP COLUMN `create_at`,
    DROP COLUMN `update_at`,
    ADD COLUMN `created_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL;
