import { toast } from "sonner";

async function CopyText(textToCopy: string) {
  await navigator.clipboard.writeText(textToCopy);
  toast.success("复制成功");
}

export default CopyText;
