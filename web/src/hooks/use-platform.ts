import { useState, useEffect } from "react"

export type Platform = "windows" | "mac" | "linux" | "unknown"

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>("unknown")

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const platform = navigator.platform.toLowerCase()

    if (platform.includes("win") || userAgent.includes("windows")) {
      setPlatform("windows")
    } else if (
      platform.includes("mac") || 
      userAgent.includes("mac") || 
      userAgent.includes("darwin")
    ) {
      setPlatform("mac")
    } else if (platform.includes("linux") || userAgent.includes("linux")) {
      setPlatform("linux")
    } else {
      setPlatform("unknown")
    }
  }, [])

  return platform
}

export function useIsWindows() {
  const platform = usePlatform()
  return platform === "windows"
}

export function useIsMac() {
  const platform = usePlatform()
  return platform === "mac"
} 