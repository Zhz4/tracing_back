import { cn } from "@/lib/utils";
import { routes } from "@/router";
import { matchedRoute } from "@/utils/route/treeTopx";
import { X } from "lucide-react";
import { RouteObject, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { INIT_TABS_ROUTE_PATH, MAX_TABS_COUNT } from "@/constants";
import { toast } from "sonner";
import { useCounterStore } from "@/stores/tab";

const searchRoutesName = (tree: RouteObject[], routePath: string) => {
  const matchedRouteResult = matchedRoute(tree, routePath);
  return matchedRouteResult?.handle?.title || routePath.split("?")[0];
};

const Tabs = () => {
  const navigate = useNavigate();
  const { tabList, removeTab } = useCounterStore();
  const nodes = tabList.map((tab) => ({
    cacheKey: tab.path,
    name: tab.name,
  }));
  const active = useLocation().pathname + useLocation().search;

  const handleDestroy = (cacheKey: string) => {
    if (cacheKey === active) {
      const currentIndex = nodes.findIndex(
        (node) => node.cacheKey === cacheKey
      );
      if (nodes.length === 1) {
        if (cacheKey === INIT_TABS_ROUTE_PATH) {
          removeTab({
            path: cacheKey,
            name: searchRoutesName(routes, cacheKey),
          });
          return;
        } else {
          navigate(INIT_TABS_ROUTE_PATH);
        }
      } else {
        let targetIndex;
        if (currentIndex < nodes.length - 1) {
          targetIndex = currentIndex + 1;
        } else {
          targetIndex = currentIndex - 1;
        }
        const targetNode = nodes[targetIndex];
        if (targetNode) {
          navigate(targetNode.cacheKey);
        } else {
          if (cacheKey !== INIT_TABS_ROUTE_PATH) {
            navigate(INIT_TABS_ROUTE_PATH);
          }
        }
      }
    }

    setTimeout(() => {
      removeTab({ path: cacheKey, name: searchRoutesName(routes, cacheKey) });
    }, 0);
  };

  const handleTabClick = (cacheKey: string) => {
    // 标签数量大于MAX_TABS_COUNT时，不进行跳转
    if (nodes.length >= MAX_TABS_COUNT) {
      toast.error("标签页数量超过最大限制");
      return;
    }
    if (cacheKey !== active) {
      navigate(cacheKey);
    }
  };

  return (
    <div className="w-full h-12 bg-background border-b border-border flex items-center px-4 gap-1 overflow-x-auto scrollbar-hide">
      <AnimatePresence mode="popLayout">
        {nodes.map((node) => (
          <motion.div
            key={node.cacheKey}
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "group relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer select-none whitespace-nowrap",
              "border border-transparent",
              node.cacheKey === active
                ? "bg-primary text-primary-foreground shadow-sm border-primary/20"
                : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:text-foreground/90"
            )}
            onClick={() => handleTabClick(node.cacheKey)}
          >
            <span className="flex items-center gap-2">
              <div className="truncate max-w-32">
                {searchRoutesName(routes, node.cacheKey)}
              </div>
              <button
                className={cn(
                  "flex items-center justify-center w-4 h-4 rounded-full transition-all duration-200",
                  "hover:bg-destructive/15 hover:text-destructive/80",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
                  node.cacheKey === active
                    ? "text-primary-foreground/70 hover:text-destructive/90 hover:bg-destructive/20"
                    : "text-muted-foreground/70"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDestroy(node.cacheKey);
                }}
                aria-label={`关闭 ${searchRoutesName(
                  routes,
                  node.cacheKey
                )} 标签页`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>

            {/* 活跃标签页底部指示器 */}
            <AnimatePresence>
              {node.cacheKey === active && (
                <motion.div
                  className="absolute bottom-0 left-1/2 bg-primary rounded-full"
                  initial={{ width: 0, x: "-50%" }}
                  animate={{ width: 32, x: "-50%" }}
                  exit={{ width: 0, x: "-50%" }}
                  transition={{ duration: 0.2 }}
                  style={{ height: 2 }}
                  layoutId="activeIndicator"
                />
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 渐变遮罩，用于指示可滚动内容 */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Tabs;
