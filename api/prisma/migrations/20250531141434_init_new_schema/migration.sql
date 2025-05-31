-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL DEFAULT '',
    "sdkUserUuid" TEXT NOT NULL DEFAULT '',
    "deviceId" TEXT NOT NULL DEFAULT '',
    "platform" TEXT NOT NULL DEFAULT '',
    "vendor" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL DEFAULT '',
    "pageId" TEXT NOT NULL DEFAULT '',
    "appName" TEXT NOT NULL DEFAULT '',
    "appCode" TEXT NOT NULL DEFAULT '',
    "sdkVersion" TEXT NOT NULL DEFAULT '',
    "ip" TEXT NOT NULL DEFAULT '',
    "clientHeight" INTEGER NOT NULL DEFAULT 0,
    "clientWidth" INTEGER NOT NULL DEFAULT 0,
    "colorDepth" INTEGER NOT NULL DEFAULT 0,
    "pixelDepth" INTEGER NOT NULL DEFAULT 0,
    "screenWidth" INTEGER NOT NULL DEFAULT 0,
    "screenHeight" INTEGER NOT NULL DEFAULT 0,
    "sendTime" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "ext" JSONB,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL DEFAULT '',
    "eventType" TEXT NOT NULL DEFAULT '',
    "triggerPageUrl" TEXT,
    "triggerTime" BIGINT,
    "sendTime" BIGINT,
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
    "sessionId" TEXT NOT NULL,
    "extraData" JSONB,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userUuid_key" ON "users"("userUuid");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionId_key" ON "sessions"("sessionId");

-- CreateIndex
CREATE INDEX "events_eventType_idx" ON "events"("eventType");

-- CreateIndex
CREATE INDEX "events_triggerTime_idx" ON "events"("triggerTime");

-- CreateIndex
CREATE INDEX "events_sessionId_idx" ON "events"("sessionId");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
