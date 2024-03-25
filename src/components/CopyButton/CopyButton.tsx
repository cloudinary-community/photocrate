"use client";

import { useState, useEffect } from 'react';
import { Check, Copy, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  className?: string;
  text: string;
}

const CopyButton = ({ className, text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if ( !copied ) return;
    
  }, [copied])

  async function handleOnCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch(e) {
      setError(true);
    }
    
    // Reset UI after 4 seconds

    setTimeout(() => {
      setCopied(false);
      setError(false);
    }, 2000)
  }

  return (
    <Button
      className={cn(
        'inline-flex gap-2 transition-none',
        className,
        error && 'bg-red-500',
        copied && 'bg-green-500',
      )}
      onClick={handleOnCopy}
    >
      {error && !copied && (
        <X className="w-4 h-4" />
      )}
      {!error && !copied && (
        <Copy className="w-4 h-4" />
      )}
      {copied && (
        <Check className="w-4 h-4" />
      )}
      Copy
    </Button>
  )
}

export default CopyButton;