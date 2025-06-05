import { EventTypeEnum, EventIdEnum, EventNames } from "@/constants";

/**
 * 获取事件名称
 * @param eventType 事件类型
 * @param eventId 事件ID
 * @returns 事件名称
 */
export type EventNameValues = (typeof EventNames)[keyof typeof EventNames];
export const getEventName = (
  eventType: `${EventTypeEnum}`,
  eventId: string
): EventNameValues => {
  // 检查eventId是否属于预定义的枚举值
  const predefinedEventIds = Object.values(EventIdEnum) as string[];
  let eventCategory: string;
  if (predefinedEventIds.includes(eventId)) {
    eventCategory = eventId;
  } else {
    eventCategory = "pageId";
  }
  const key = `${eventCategory}-${eventType}` as keyof typeof EventNames;
  return EventNames[key] || "未知事件";
};
