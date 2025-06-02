/*
  Warnings:

  - The `sendTime` column on the `tracking_data` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tracking_data" DROP COLUMN "sendTime",
ADD COLUMN     "sendTime" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX "tracking_data_id_sendTime_idx" ON "tracking_data"("id", "sendTime");
