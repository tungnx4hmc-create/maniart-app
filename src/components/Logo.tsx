import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export default function Logo({ className = "h-9", iconOnly = false }: LogoProps) {
  if (iconOnly) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect width="100" height="100" rx="16" fill="black" />
        {/* M Path */}
        <path
          d="M 12,20 H 21 L 28,65 L 35,20 H 44 V 80 H 37 V 40 L 28,80 L 19,40 V 80 H 12 Z"
          fill="white"
        />
        {/* Straight J-bar / separator line */}
        <rect
          x="48"
          y="15"
          width="4"
          height="70"
          fill="white"
        />
        {/* A Path */}
        <path
          d="M 56,80 L 66,20 H 74 L 84,80 H 76 L 73.5,58 H 66.5 L 64,80 H 56 Z M 70,36 L 67,50 H 73 Z"
          fill="white"
        />
      </svg>
    );
  }

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 202 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* MANJART Vector Letterforms */}
        {/* M */}
        <path
          d="M 0,0 H 9 L 16,55 L 23,0 H 32 V 80 H 25 V 30 L 16,80 L 7,30 V 80 H 0 Z"
          fill="white"
        />
        
        {/* A */}
        <path
          d="M 36,80 L 46,0 H 54 L 64,80 H 56 L 53.5,55 H 46.5 L 44,80 H 36 Z M 50,20 L 47,45 H 53 Z"
          fill="white"
        />
        
        {/* N */}
        <path
          d="M 68,0 H 77 L 88,63 V 0 H 96 V 80 H 87 L 76,17 V 80 H 68 Z"
          fill="white"
        />
        
        {/* J (Vertical bar aligning perfectly at the top, descending below bottom) */}
        <path
          d="M 99,0 H 107 V 100 H 99 Z"
          fill="white"
        />
        
        {/* A */}
        <path
          d="M 110,80 L 120,0 H 128 L 138,80 H 130 L 127.5,55 H 120.5 L 118,80 H 110 Z M 124,20 L 121,45 H 127 Z"
          fill="white"
        />
        
        {/* R */}
        <path
          d="M 142,0 H 162 C 167,0 170,3 170,9 V 29 C 170,35 167,38 162,38 H 158 L 170,80 H 161 L 151,38 V 80 H 142 Z M 150,9 H 161 C 163,9 164,10 164,12 V 26 C 164,28 163,29 161,29 H 150 Z"
          fill="white"
        />
        
        {/* T */}
        <path
          d="M 174,0 H 202 V 8 H 192 V 80 H 184 V 8 H 174 Z"
          fill="white"
        />

        {/* PRODUCTION wide-spaced subtext perfectly aligned to boundaries */}
        <text
          x="0"
          y="123"
          fill="white"
          fontSize="15"
          fontWeight="600"
          fontFamily="'Montserrat', 'Arial', sans-serif"
          textLength="202"
          lengthAdjust="spacing"
        >
          PRODUCTION
        </text>
      </svg>
    </div>
  );
}
