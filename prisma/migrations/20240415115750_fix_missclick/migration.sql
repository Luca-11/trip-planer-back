/*
  Warnings:

  - You are about to drop the column `IAResponse` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `Pompt` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `SubmissionDateTime` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `datetime` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iaResponse` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Itinerary` DROP COLUMN `IAResponse`,
    DROP COLUMN `Pompt`,
    DROP COLUMN `SubmissionDateTime`,
    ADD COLUMN `datetime` DATETIME(3) NOT NULL,
    ADD COLUMN `iaResponse` VARCHAR(191) NOT NULL,
    ADD COLUMN `prompt` VARCHAR(191) NOT NULL;
