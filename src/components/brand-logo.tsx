import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-6", className)}
    >
      {/* 4-pointed sparkle star */}
      <path
        d="M10 3C10.5 7.5 13.5 10.5 18 11C13.5 11.5 10.5 14.5 10 19C9.5 14.5 6.5 11.5 2 11C6.5 10.5 9.5 7.5 10 3Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Small plus sign */}
      <line
        x1="18"
        y1="3"
        x2="18"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="5"
        x2="20"
        y2="5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
