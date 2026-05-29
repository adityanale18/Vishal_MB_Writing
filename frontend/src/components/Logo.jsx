function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle background */}
      <circle cx="22" cy="22" r="22" fill="#FFD700" />
      {/* Letter V */}
      <text
        x="22"
        y="29"
        textAnchor="middle"
        fontSize="22"
        fontWeight="900"
        fontFamily="Georgia, serif"
        fill="#0a0a0a"
      >V</text>
      {/* Small pen nib at bottom right */}
      <polygon points="36,34 40,44 44,36" fill="#0a0a0a" opacity="0.15" />
    </svg>
  );
}

export default Logo;
