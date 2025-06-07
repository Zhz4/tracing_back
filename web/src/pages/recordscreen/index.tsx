import React, {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import { unzip } from "@/utils/record";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";
import { useQueryClient } from "@tanstack/react-query";
import { MonitorDataResponse } from "@/api/monitor";

const RecordscreenPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const playerRef = useRef<rrwebPlayer | null>(null);
  const queryClient = useQueryClient();
  const rowId = searchParams.get("rowId");
  const [isPlayerInitialized, setIsPlayerInitialized] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);

  // 从 React Query 缓存中获取录屏数据
  const getRecordscreenDataFromCache = useCallback(() => {
    if (!rowId) return null;
    const cacheData = queryClient.getQueriesData({
      queryKey: ["monitorData"],
      exact: false,
    });
    // 遍历缓存查找对应的数据
    for (const [, data] of cacheData) {
      const monitorData = data as MonitorDataResponse;
      if (monitorData?.records) {
        const targetRow = monitorData.records.find((row) => row.id === rowId);
        if (targetRow?.eventInfo) {
          // 找到第一个有录屏数据的事件
          const targetEvent = targetRow.eventInfo.find(
            (event) => event.recordscreen
          );
          if (targetEvent?.recordscreen) {
            return targetEvent.recordscreen;
          }
        }
      }
    }
    return null; // 如果缓存中没找到，返回 null
  }, [rowId, queryClient]);

  const recordscreenData = getRecordscreenDataFromCache();

  // 清理播放器的函数
  const cleanupPlayer = useCallback(() => {
    if (playerRef.current) {
      try {
        // 获取播放器的 replayer 实例
        const replayer = playerRef.current.getReplayer?.();
        if (replayer) {
          // 停止播放
          replayer.pause();
        }
        // 清空引用
        playerRef.current = null;
      } catch (error) {
        console.warn("清理播放器时出错:", error);
        playerRef.current = null;
      }
    }
    // 清理 DOM
    const target = document.getElementById("recordscreen-player");
    if (target) {
      target.innerHTML = "";
    }
    setIsPlayerInitialized(false);
  }, []);

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
          const unzippedData = unzip(recordscreenData);
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
  }, [recordscreenData, isPlayerInitialized, initializePlayer]);

  // 组件卸载时的清理（仅在真正卸载时执行）
  useEffect(() => {
    return () => {
      // 添加延迟清理，避免 KeepAlive 切换时误清理
      const cleanup = () => {
        if (!document.getElementById("recordscreen-player")) {
          // 只有当 DOM 不存在时才真正清理（说明组件被卸载了）
          cleanupPlayer();
        }
      };
      cleanup();
      // setTimeout(cleanup, 100);
    };
  }, [cleanupPlayer]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">错误录屏回放</h1>
      </div>
      {recordscreenData ? (
        <div
          id="recordscreen-player"
          className={
            isPlayerInitialized
              ? ""
              : "min-h-[400px] flex items-center justify-center text-gray-500"
          }
        >
          {!isPlayerInitialized && <div>正在加载录屏回放...</div>}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          <p>没有找到录屏数据</p>
        </div>
      )}
    </div>
  );
};

export default RecordscreenPage;
