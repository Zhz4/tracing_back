-- DropIndex
DROP INDEX "tracking_data_id_sendTime_appName_userName_userUuid_idx";

-- CreateIndex
CREATE INDEX "event_info_eventType_idx" ON "event_info"("eventType");

-- CreateIndex
CREATE INDEX "event_info_eventId_idx" ON "event_info"("eventId");

-- CreateIndex
CREATE INDEX "event_info_eventType_eventId_idx" ON "event_info"("eventType", "eventId");

-- CreateIndex
CREATE INDEX "event_info_trackingDataId_eventType_idx" ON "event_info"("trackingDataId", "eventType");

-- CreateIndex
CREATE INDEX "tracking_data_sendTime_idx" ON "tracking_data"("sendTime" DESC);

-- CreateIndex
CREATE INDEX "tracking_data_appName_userName_idx" ON "tracking_data"("appName", "userName");

-- CreateIndex
CREATE INDEX "tracking_data_userName_idx" ON "tracking_data"("userName");

-- CreateIndex
CREATE INDEX "tracking_data_appName_idx" ON "tracking_data"("appName");

-- CreateIndex
CREATE INDEX "tracking_data_userUuid_idx" ON "tracking_data"("userUuid");
