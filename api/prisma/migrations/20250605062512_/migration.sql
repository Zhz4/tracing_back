/*
  Warnings:

  - You are about to drop the column `eventInfo` on the `tracking_data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tracking_data" DROP COLUMN "eventInfo";

-- CreateTable
CREATE TABLE "event_info" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "triggerTime" BIGINT NOT NULL,
    "sendTime" BIGINT NOT NULL,
    "triggerPageUrl" TEXT NOT NULL,
    "title" TEXT,
    "params" JSONB,
    "elementPath" TEXT,
    "x" INTEGER,
    "y" INTEGER,
    "errMessage" TEXT,
    "errStack" TEXT,
    "line" INTEGER,
    "col" INTEGER,
    "recordscreen" TEXT,
    "referer" TEXT,
    "action" TEXT,
    "durationTime" BIGINT,
    "requestUrl" TEXT,
    "requestMethod" TEXT,
    "requestType" TEXT,
    "responseStatus" INTEGER,
    "duration" BIGINT,
    "appcache" BIGINT,
    "dom" BIGINT,
    "dns" BIGINT,
    "firstbyte" BIGINT,
    "fmp" BIGINT,
    "loadon" BIGINT,
    "ready" BIGINT,
    "res" BIGINT,
    "ssllink" BIGINT,
    "tcp" BIGINT,
    "trans" BIGINT,
    "ttfb" BIGINT,
    "tti" BIGINT,
    "redirect" BIGINT,
    "unloadTime" BIGINT,
    "initiatorType" TEXT,
    "transferSize" BIGINT,
    "encodedBodySize" BIGINT,
    "decodedBodySize" BIGINT,
    "redirectStart" BIGINT,
    "redirectEnd" BIGINT,
    "startTime" BIGINT,
    "fetchStart" BIGINT,
    "domainLookupStart" BIGINT,
    "domainLookupEnd" BIGINT,
    "connectStart" BIGINT,
    "connectEnd" BIGINT,
    "requestStart" BIGINT,
    "responseStart" BIGINT,
    "responseEnd" BIGINT,
    "trackingDataId" TEXT,

    CONSTRAINT "event_info_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_info" ADD CONSTRAINT "event_info_trackingDataId_fkey" FOREIGN KEY ("trackingDataId") REFERENCES "tracking_data"("id") ON DELETE SET NULL ON UPDATE CASCADE;
