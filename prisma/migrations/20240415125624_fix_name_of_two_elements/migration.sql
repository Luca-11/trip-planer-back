/*
  Warnings:

  - You are about to drop the column `datetime` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `create_at` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `update_at` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Itinerary` DROP COLUMN `datetime`,
    ADD COLUMN `create_at` DATETIME(3) NOT NULL,
    ADD COLUMN `update_at` DATETIME(3) NOT NULL;
