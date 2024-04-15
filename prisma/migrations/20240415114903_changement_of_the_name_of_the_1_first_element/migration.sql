/*
  Warnings:

  - You are about to drop the column `RequestText` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `Pompt` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Itinerary` DROP COLUMN `RequestText`,
    ADD COLUMN `Pompt` VARCHAR(191) NOT NULL;
