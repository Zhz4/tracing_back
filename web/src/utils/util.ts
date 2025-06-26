import { toast } from "sonner";

async function CopyText(textToCopy: string) {
  try {
    // 检查是否支持现代 Clipboard API
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("复制成功");
      return;
    }

    // 降级方案：使用传统的方法
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    // 尝试使用 execCommand 复制
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);

    if (successful) {
      toast.success("复制成功");
    } else {
      toast.error("复制失败，请手动复制");
    }
  } catch (error) {
    console.error("复制失败:", error);
    toast.error("复制失败，请手动复制");
  }
}

export default CopyText;
