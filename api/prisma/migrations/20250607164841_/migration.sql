-- DropIndex
DROP INDEX "tracking_data_id_sendTime_idx";

-- CreateIndex
CREATE INDEX "tracking_data_id_sendTime_appName_userName_userUuid_idx" ON "tracking_data"("id", "sendTime", "appName", "userName", "userUuid");
