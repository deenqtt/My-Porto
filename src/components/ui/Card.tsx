import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export default function Card({ children, className = '', glow = false }: CardProps) {
  return (
    <div
      className={`
        bg-[#161616] border border-[#1f2937] rounded-xl p-6
        transition-all duration-300
        ${glow ? 'card-glow' : 'hover:border-[#06b6d422]'}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
