-- 生成用户物化视图
CREATE MATERIALIZED VIEW tracking_users AS
SELECT DISTINCT "userUuid", "userName"
FROM tracking_data;
