
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L14.09 8.26L20.35 10.35L14.09 12.44L12 18.7L9.91 12.44L3.65 10.35L9.91 8.26L12 2Z" />
    <path d="M3.65 10.35L2 12L3.65 13.65L5.3 12L3.65 10.35Z" />
    <path d="M20.35 10.35L22 12L20.35 13.65L18.7 12L20.35 10.35Z" />
    <path d="M9.91 8.26L8.26 3.65L6.61 8.26L2 9.91L6.61 11.56L8.26 16.21L9.91 11.56L14.56 9.91L9.91 8.26Z" />
    <path d="M14.09 15.74L15.74 20.35L17.39 15.74L22 14.09L17.39 12.44L15.74 7.83L14.09 12.44L9.44 14.09L14.09 15.74Z" />
  </svg>
);
