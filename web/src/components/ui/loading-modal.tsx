import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// 区域内的加载覆盖层组件
interface LoadingOverlayProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  className?: string;
  showModal?: boolean; // 是否显示模态框，false 时只显示遮罩和图标
  children?: React.ReactNode; // 被覆盖的内容
}

export function LoadingOverlay({
  isOpen,
  title = "加载中...",
  className,
  showModal = true,
  children,
}: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-10 flex items-center justify-center"
          >
            {/* 背景遮罩 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-xs rounded-md"
            />

            {showModal ? (
              /* 带模态框的加载 */
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  duration: 0.3,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  {/* 加载图标 */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="flex items-center justify-center"
                  >
                    <Loader2 className="h-6 w-6 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* 只有图标的简单加载 */
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 flex flex-col items-center space-y-2"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex items-center justify-center"
                >
                  <Loader2 className="h-8 w-8 text-primary" />
                </motion.div>
                {title && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm font-medium text-foreground"
                  >
                    {title}
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
