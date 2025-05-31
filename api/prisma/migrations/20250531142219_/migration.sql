/*
  Warnings:

  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_userId_fkey";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "tracking_data" (
    "id" TEXT NOT NULL,
    "clientHeight" INTEGER NOT NULL DEFAULT 0,
    "clientWidth" INTEGER NOT NULL DEFAULT 0,
    "colorDepth" INTEGER NOT NULL DEFAULT 0,
    "pixelDepth" INTEGER NOT NULL DEFAULT 0,
    "deviceId" TEXT NOT NULL DEFAULT '',
    "screenWidth" INTEGER NOT NULL DEFAULT 0,
    "screenHeight" INTEGER NOT NULL DEFAULT 0,
    "vendor" TEXT NOT NULL DEFAULT '',
    "platform" TEXT NOT NULL DEFAULT '',
    "userUuid" TEXT NOT NULL DEFAULT '',
    "sdkUserUuid" TEXT NOT NULL DEFAULT '',
    "ext" JSONB,
    "appName" TEXT NOT NULL DEFAULT '',
    "appCode" TEXT NOT NULL DEFAULT '',
    "pageId" TEXT NOT NULL DEFAULT '',
    "sessionId" TEXT NOT NULL DEFAULT '',
    "sdkVersion" TEXT NOT NULL DEFAULT '',
    "ip" TEXT NOT NULL DEFAULT '',
    "sendTime" BIGINT NOT NULL DEFAULT 0,
    "eventType" TEXT DEFAULT '',
    "eventId" TEXT DEFAULT '',
    "triggerPageUrl" TEXT,
    "triggerTime" BIGINT,
    "eventSendTime" BIGINT,
    "referer" TEXT,
    "title" TEXT,
    "action" TEXT,
    "tti" DOUBLE PRECISION,
    "ready" DOUBLE PRECISION,
    "loadon" DOUBLE PRECISION,
    "firstbyte" DOUBLE PRECISION,
    "ttfb" DOUBLE PRECISION,
    "trans" DOUBLE PRECISION,
    "dom" DOUBLE PRECISION,
    "res" DOUBLE PRECISION,
    "ssllink" DOUBLE PRECISION,
    "initiatorType" TEXT,
    "transferSize" INTEGER,
    "encodedBodySize" INTEGER,
    "decodedBodySize" INTEGER,
    "duration" DOUBLE PRECISION,
    "startTime" DOUBLE PRECISION,
    "fetchStart" DOUBLE PRECISION,
    "domainLookupStart" DOUBLE PRECISION,
    "domainLookupEnd" DOUBLE PRECISION,
    "connectStart" DOUBLE PRECISION,
    "connectEnd" DOUBLE PRECISION,
    "requestStart" DOUBLE PRECISION,
    "responseStart" DOUBLE PRECISION,
    "responseEnd" DOUBLE PRECISION,
    "requestUrl" TEXT,
    "errorMessage" TEXT,
    "errorStack" TEXT,
    "errorLine" INTEGER,
    "errorColumn" INTEGER,
    "errorFilename" TEXT,
    "elementSelector" TEXT,
    "elementText" TEXT,
    "clickX" INTEGER,
    "clickY" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracking_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "tracking_data_eventType_idx" ON "tracking_data"("eventType");

-- CreateIndex
CREATE INDEX "tracking_data_sessionId_idx" ON "tracking_data"("sessionId");

-- CreateIndex
CREATE INDEX "tracking_data_userUuid_idx" ON "tracking_data"("userUuid");

-- CreateIndex
CREATE INDEX "tracking_data_triggerTime_idx" ON "tracking_data"("triggerTime");

-- CreateIndex
CREATE INDEX "tracking_data_createdAt_idx" ON "tracking_data"("createdAt");
