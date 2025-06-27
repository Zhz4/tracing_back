import { toast } from "sonner";

async function CopyText(textToCopy: string) {
  try {
    if (
      window.isSecureContext && // 检查 HTTPS
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("复制成功");
    } else {
      console.warn("不是安全上下文，使用降级方式");
      fallbackCopyText(textToCopy);
    }
  } catch (e) {
    console.error("Clipboard API 失败，使用降级方式", e);
    fallbackCopyText(textToCopy);
  }
}

// 永远使用降级方案，不推荐，只做兼容
function fallbackCopyText(textToCopy: string) {
  const textArea = document.createElement("textarea");
  textArea.value = textToCopy;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    toast[successful ? "success" : "error"](
      successful ? "复制成功" : "复制失败"
    );
  } catch (e) {
    console.error("Clipboard API 失败，使用降级方式", e);
    toast.error("复制失败，请手动复制");
  }

  document.body.removeChild(textArea);
}

export default CopyText;
