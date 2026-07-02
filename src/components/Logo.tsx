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
        <rect width="100" height="100" fill="black" />
        <text
          x="12"
          y="65"
          fill="white"
          fontSize="46"
          fontWeight="900"
          fontFamily="'Oswald', 'Impact', 'Arial Narrow', sans-serif"
          letterSpacing="-1"
        >
          M
        </text>
        {/* Straight J stem for icon-only */}
        <rect
          x="47.5"
          y="15"
          width="5"
          height="70"
          fill="white"
        />
        <text
          x="56"
          y="65"
          fill="white"
          fontSize="46"
          fontWeight="900"
          fontFamily="'Oswald', 'Impact', 'Arial Narrow', sans-serif"
          letterSpacing="-1"
        >
          A
        </text>
      </svg>
    );
  }

  return (
    <div className={`flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 250 85"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto"
      >
        {/* MAN text block with exact width constraints */}
        <text
          x="10"
          y="50"
          fill="white"
          fontSize="44"
          fontWeight="900"
          fontFamily="'Oswald', 'Impact', 'Arial Narrow', sans-serif"
          textLength="110"
          lengthAdjust="spacing"
        >
          MAN
        </text>

        {/* Straight J stem aligned with letter heights and descending below baseline */}
        <rect
          x="122.5"
          y="18"
          width="5"
          height="42"
          fill="white"
        />

        {/* ART text block with exact width constraints */}
        <text
          x="130"
          y="50"
          fill="white"
          fontSize="44"
          fontWeight="900"
          fontFamily="'Oswald', 'Impact', 'Arial Narrow', sans-serif"
          textLength="110"
          lengthAdjust="spacing"
        >
          ART
        </text>

        {/* PRODUCTION subtext perfectly aligned with outer boundaries of MANJART */}
        <text
          x="10"
          y="74"
          fill="white"
          fontSize="10"
          fontWeight="500"
          fontFamily="'Montserrat', 'Arial', sans-serif"
          textLength="230"
          lengthAdjust="spacing"
        >
          PRODUCTION
        </text>
      </svg>
    </div>
  );
}
