import React, { useEffect, useRef, useLayoutEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { unzip } from "@/utils/record";
import rrwebPlayer from "rrweb-player";
import { Button } from "@/components/ui/button";
import "rrweb-player/dist/style.css";
import { ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { MonitorDataResponse } from "@/api/monitor";

const RecordscreenPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const playerRef = useRef<rrwebPlayer | null>(null);
  const queryClient = useQueryClient();
  const rowId = searchParams.get("rowId");

  // 从 React Query 缓存中获取录屏数据
  const getRecordscreenDataFromCache = () => {
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
  };
  const recordscreenData = getRecordscreenDataFromCache();

  // 清理播放器的函数
  const cleanupPlayer = () => {
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
  };

  useLayoutEffect(() => {
    if (recordscreenData) {
      const timer = setTimeout(() => {
        try {
          const target = document.getElementById("recordscreen-player");
          if (target) {
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
          }
        } catch (error) {
          console.error("录屏回放失败", error);
        }
      }, 100);
      return () => {
        clearTimeout(timer);
        cleanupPlayer();
      };
    }
  }, [recordscreenData]);

  // 组件卸载时的清理
  useEffect(() => {
    return () => {
      cleanupPlayer();
    };
  }, []);

  // 页面可见性变化时的处理
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && playerRef.current) {
        try {
          const replayer = playerRef.current.getReplayer?.();
          if (replayer) {
            replayer.pause();
          }
        } catch (error) {
          console.warn("暂停播放器时出错:", error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleGoBack = () => {
    // 返回前先清理播放器
    cleanupPlayer();
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleGoBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          返回
        </Button>
        <h1 className="text-2xl font-bold">错误录屏回放</h1>
      </div>
      {recordscreenData ? (
        <div id="recordscreen-player" />
      ) : (
        <div className="text-center text-gray-500 py-20">
          <p>没有找到录屏数据</p>
        </div>
      )}
    </div>
  );
};

export default RecordscreenPage;
