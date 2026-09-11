"use client";

import { useState } from "react";
import Button from "@/app/components/Button";

export default function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(`https://${link}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — nothing else to do here.
    }
  }

  return (
    <Button variant="primary" className="w-full" onClick={handleClick}>
      {copied ? "Link copiado!" : "Copiar link"}
    </Button>
  );
}
