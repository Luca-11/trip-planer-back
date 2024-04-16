/*
  Warnings:

  - You are about to alter the column `iaResponse` on the `Itinerary` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `Itinerary` MODIFY `iaResponse` JSON NULL;
