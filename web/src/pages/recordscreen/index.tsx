import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { EventError, EventRoute, EventRequest } from "@/types";
import { useSearchParams } from "react-router-dom";
import { unzip } from "@/utils/record";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import { useQuery } from "@tanstack/react-query";
import { getRecordscreenDataByEventId, getEventById } from "@/api/monitor";
import { getEventName } from "@/utils/checkEventAll";
import { EventStatusEnum } from "@/constants";
import EventRequestPage from "@/pages/monitorData/components/events/Event-request";
import EventErrorPage from "@/pages/monitorData/components/events/Event-error";
import MonitorDataProvider from "@/pages/monitorData/context/monitor-data-context";

// 加载动画组件
const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
    <p className="text-muted-foreground text-lg">正在加载录屏数据...</p>
  </div>
);

// 播放器加载组件
const PlayerLoading: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-pulse flex space-x-1">
      <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
      <div
        className="w-3 h-3 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.1s" }}
      ></div>
      <div
        className="w-3 h-3 bg-primary rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
    </div>
    <p className="text-muted-foreground">正在初始化录屏回放...</p>
  </div>
);

const RecordscreenPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const playerRef = useRef<rrwebPlayer | null>(null);
  const rowId = searchParams.get("rowId");
  const errorId = searchParams.get("currentRowId");
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);

  const {
    data: recordscreenData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recordscreen", rowId],
    queryFn: () => getRecordscreenDataByEventId(rowId as string),
    enabled: !!rowId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const { data: eventData } = useQuery({
    queryKey: ["event", errorId],
    queryFn: () => getEventById(errorId as string),
    enabled: !!errorId,
  });
  // 渲染事件组件的函数
  const renderEventComponent = (
    item: EventError | EventRoute | EventRequest
  ) => {
    const eventName = getEventName(item.eventType, item.eventId);
    switch (eventName) {
      case EventStatusEnum.代码错误:
      case EventStatusEnum.控制台错误:
        return <EventErrorPage event={item as EventError} isScreen={true} />;

      case EventStatusEnum.请求事件:
      case EventStatusEnum.请求失败:
        return (
          <EventRequestPage event={item as EventRequest} isScreen={true} />
        );
      default:
        return null;
    }
  };

  // 清理播放器的函数
  // const cleanupPlayer = useCallback(() => {
  //   if (playerRef.current) {
  //     try {
  //       // 获取播放器的 replayer 实例
  //       const replayer = playerRef.current.getReplayer?.();
  //       if (replayer) {
  //         // 停止播放
  //         replayer.pause();
  //       }
  //       // 清空引用
  //       playerRef.current = null;
  //     } catch (error) {
  //       console.warn("清理播放器时出错:", error);
  //       playerRef.current = null;
  //     }
  //   }
  //   // 清理 DOM
  //   const target = document.getElementById("recordscreen-player");
  //   if (target) {
  //     target.innerHTML = "";
  //   }
  //   setIsPlayerInitialized(false);
  // }, []);

  // 初始化播放器的函数
  const initializePlayer = useCallback(() => {
    if (!recordscreenData || isPlayerInitialized || playerRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        const target = document.getElementById("recordscreen-player");
        if (target && !playerRef.current) {
          // 解压录屏数据
          const unzippedData = unzip(recordscreenData.recordscreen);
          // 创建新的播放器实例
          const player = new rrwebPlayer({
            target: target,
            props: {
              events: Array.isArray(unzippedData) ? unzippedData : [],
              width: target.clientWidth || 600,
              height: target.clientHeight || 500,
              UNSAFE_replayCanvas: true,
            },
          });
          playerRef.current = player;
          setIsPlayerInitialized(true);
        }
      } catch (error) {
        console.error("录屏回放失败", error);
        setIsPlayerInitialized(false);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [recordscreenData, isPlayerInitialized]);

  // 只在有录屏数据且播放器未初始化时创建播放器
  useLayoutEffect(() => {
    if (recordscreenData && !isPlayerInitialized && isPageVisible) {
      const cleanup = initializePlayer();
      return cleanup;
    }
  }, [recordscreenData, isPlayerInitialized, isPageVisible, initializePlayer]);

  // 页面可见性变化时的处理
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsPageVisible(isVisible);

      if (playerRef.current) {
        try {
          const replayer = playerRef.current.getReplayer?.();
          if (replayer) {
            if (isVisible) {
              // 页面可见时，如果播放器存在但没有初始化标记，重新设置状态
              if (!isPlayerInitialized) {
                setIsPlayerInitialized(true);
              }
            } else {
              // 页面隐藏时暂停播放
              replayer.pause();
            }
          }
        } catch (error) {
          console.warn("处理页面可见性变化时出错:", error);
        }
      } else if (isVisible && recordscreenData && !isPlayerInitialized) {
        // 如果页面变为可见且有数据但播放器未初始化，则初始化播放器
        initializePlayer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlayerInitialized, initializePlayer]);

  // 组件卸载时的清理（仅在真正卸载时执行）
  // useEffect(() => {
  //   return () => {
  //     // 添加延迟清理，避免 KeepAlive 切换时误清理
  //     const cleanup = () => {
  //       if (!document.getElementById("recordscreen-player")) {
  //         // 只有当 DOM 不存在时才真正清理（说明组件被卸载了）
  //         cleanupPlayer();
  //       }
  //     };
  //     cleanup();
  //     // setTimeout(cleanup, 100);
  //   };
  // }, [cleanupPlayer]);

  return (
    <div className="container mx-auto p-6">
      {eventData?.map((item, index) => (
        <div key={`${item.eventId}-${index}`}>
          <MonitorDataProvider>
            {renderEventComponent(item)}
          </MonitorDataProvider>
        </div>
      ))}
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-foreground">错误录屏回放</h1>
      </div>

      {/* 数据加载状态 */}
      {isLoading && (
        <div className="min-h-[400px] flex items-center justify-center bg-card rounded-lg border">
          <LoadingSpinner />
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="text-center text-destructive py-20 bg-card rounded-lg border">
          <div className="space-y-2">
            <p className="text-lg font-medium">加载录屏数据失败</p>
            <p className="text-muted-foreground">请稍后重试</p>
          </div>
        </div>
      )}

      {/* 有数据但无录屏内容 */}
      {!isLoading &&
        !error &&
        recordscreenData &&
        !recordscreenData.recordscreen && (
          <div className="text-center text-muted-foreground py-20 bg-card rounded-lg border">
            <div className="space-y-2">
              <p className="text-lg">没有找到录屏数据</p>
              <p className="text-sm">此事件可能没有录屏信息</p>
            </div>
          </div>
        )}

      {/* 录屏播放器 */}
      {!isLoading &&
        !error &&
        recordscreenData &&
        recordscreenData.recordscreen && (
          <div
            id="recordscreen-player"
            className={
              isPlayerInitialized
                ? "min-h-[400px] bg-card border rounded-lg shadow-sm"
                : "min-h-[400px] flex items-center justify-center bg-card border rounded-lg shadow-sm"
            }
          >
            {!isPlayerInitialized && <PlayerLoading />}
          </div>
        )}

      {/* 没有rowId参数 */}
      {!rowId && (
        <div className="text-center text-muted-foreground py-20 bg-card rounded-lg border">
          <div className="space-y-2">
            <p className="text-lg">缺少必要的参数</p>
            <p className="text-sm">请提供有效的rowId参数</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordscreenPage;
