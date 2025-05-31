/*
  Warnings:

  - You are about to drop the column `action` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `clickX` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `clickY` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `connectEnd` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `connectStart` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `decodedBodySize` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `dom` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `domainLookupEnd` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `domainLookupStart` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `elementSelector` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `elementText` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `encodedBodySize` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `errorColumn` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `errorFilename` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `errorLine` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `errorMessage` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `errorStack` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `eventSendTime` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `eventType` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `fetchStart` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `firstbyte` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `initiatorType` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `loadon` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `ready` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `referer` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `requestStart` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `requestUrl` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `res` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `responseEnd` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `responseStart` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `ssllink` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `trans` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `transferSize` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `triggerPageUrl` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `triggerTime` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `ttfb` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `tti` on the `tracking_data` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `tracking_data` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tracking_data_createdAt_idx";

-- DropIndex
DROP INDEX "tracking_data_eventType_idx";

-- DropIndex
DROP INDEX "tracking_data_sessionId_idx";

-- DropIndex
DROP INDEX "tracking_data_triggerTime_idx";

-- DropIndex
DROP INDEX "tracking_data_userUuid_idx";

-- AlterTable
ALTER TABLE "tracking_data" DROP COLUMN "action",
DROP COLUMN "clickX",
DROP COLUMN "clickY",
DROP COLUMN "connectEnd",
DROP COLUMN "connectStart",
DROP COLUMN "createdAt",
DROP COLUMN "decodedBodySize",
DROP COLUMN "dom",
DROP COLUMN "domainLookupEnd",
DROP COLUMN "domainLookupStart",
DROP COLUMN "duration",
DROP COLUMN "elementSelector",
DROP COLUMN "elementText",
DROP COLUMN "encodedBodySize",
DROP COLUMN "errorColumn",
DROP COLUMN "errorFilename",
DROP COLUMN "errorLine",
DROP COLUMN "errorMessage",
DROP COLUMN "errorStack",
DROP COLUMN "eventId",
DROP COLUMN "eventSendTime",
DROP COLUMN "eventType",
DROP COLUMN "fetchStart",
DROP COLUMN "firstbyte",
DROP COLUMN "initiatorType",
DROP COLUMN "loadon",
DROP COLUMN "ready",
DROP COLUMN "referer",
DROP COLUMN "requestStart",
DROP COLUMN "requestUrl",
DROP COLUMN "res",
DROP COLUMN "responseEnd",
DROP COLUMN "responseStart",
DROP COLUMN "ssllink",
DROP COLUMN "startTime",
DROP COLUMN "title",
DROP COLUMN "trans",
DROP COLUMN "transferSize",
DROP COLUMN "triggerPageUrl",
DROP COLUMN "triggerTime",
DROP COLUMN "ttfb",
DROP COLUMN "tti",
DROP COLUMN "updatedAt",
ADD COLUMN     "eventInfo" JSONB;

-- CreateIndex
CREATE INDEX "tracking_data_id_sendTime_idx" ON "tracking_data"("id", "sendTime");
