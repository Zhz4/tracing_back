import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { Badge } from "@/components/ui/badge";
import { EventError, EventRequest } from "@/types";
import dayjs from "dayjs";

interface MycomponentProps {
  event: EventError | EventRequest;
}
const ErrorInfo = ({ event }: MycomponentProps) => {
  const isRequest = "requestUrl" in event;
  const [showFullParams, setShowFullParams] = useState(false);

  const renderField = (
    label: string,
    value: string | number | object,
    isJson = false
  ) => {
    if (!value) return null;
    const stringValue = isJson ? JSON.stringify(value, null, 2) : String(value);
    const shouldTruncate =
      isJson && !showFullParams && stringValue.length > 300;
    const displayValue = shouldTruncate
      ? stringValue.slice(0, 300) + "..."
      : stringValue;

    return (
      <div
        className={`flex ${isJson ? "flex-col" : "justify-between"} gap-1 py-1 border-b text-sm `}
      >
        <span className="text-destructive font-medium">{label}</span>
        {isJson ? (
          <div className="relative">
            <pre className="whitespace-pre-wrap break-all bg-muted p-2 rounded max-h-[300px] overflow-auto text-foreground">
              {displayValue}
            </pre>
            {/* {shouldTruncate && (
              <button
                className="absolute bottom-1 right-2 text-xs text-muted-foreground underline"
                onClick={() => setShowFullParams(true)}
              >
                展开全部
              </button>
            )} */}
            {stringValue.length > 300 && (
              <button
                className="absolute bottom-1 right-2 text-xs text-muted-foreground underline"
                onClick={() => setShowFullParams(!showFullParams)}
              >
                {showFullParams ? "收起" : "展开全部"}
              </button>
            )}
          </div>
        ) : (
          <span className="break-all text-right max-w-[60%] text-destructive">
            {displayValue}
          </span>
        )}
      </div>
    );
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="mb-4 border border-red-400 dark:border-destructive rounded-md bg-red-50 dark:bg-red-900/20"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-4 py-2 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 text-left">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-destructive">
              {isRequest ? "请求失败" : "错误信息"}
            </span>
            <span className="text-xs text-foreground bg-muted rounded-md p-1">
              {event.triggerPageUrl}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-4">
          {renderField("事件ID", event.eventId)}
          {renderField("事件类型", event.eventType)}
          {renderField(
            "触发时间",
            dayjs(Number(event.triggerTime)).format("YYYY-MM-DD HH:mm:ss")
          )}
          {renderField(
            "发送时间",
            dayjs(Number(event.sendTime)).format("YYYY-MM-DD HH:mm:ss")
          )}
          {renderField("页面地址", event.triggerPageUrl)}

          {!isRequest && (
            <>
              {renderField(
                "错误信息",
                JSON.stringify(JSON.parse(event.errMessage || ""), null, 2)
              )}
              {renderField("错误堆栈", event.errStack || "")}
              {renderField("行号", event.line || "")}
              {renderField("列号", event.col || "")}
            </>
          )}

          {isRequest && (
            <>
              {renderField("请求地址", event.requestUrl || "")}
              {renderField("请求方式", event.requestMethod || "")}
              {renderField("请求类型", event.requestType || "")}
              {renderField("响应状态", event.responseStatus || "")}
              {renderField(
                "错误信息",
                JSON.stringify(JSON.parse(event.errMessage || ""), null, 2)
              )}
            </>
          )}

          {/* {renderField("附加参数", JSON.stringify(event.params || {}, null, 2))}
           */}
          {renderField("附加参数", event.params, true)}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ErrorInfo;
