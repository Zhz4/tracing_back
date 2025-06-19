-- 生成用户物化视图
CREATE MATERIALIZED VIEW tracking_users AS
SELECT DISTINCT "userUuid", "userName"
FROM tracking_data
WHERE 
  "userUuid" IS NOT NULL AND "userUuid" <> '' AND
  "userName" IS NOT NULL AND "userName" <> '';