interface BadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'purple' | 'green' | 'yellow' | 'gray';
  size?: 'sm' | 'md';
}

const variantClasses = {
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  gray: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({ children, variant = 'cyan', size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center border rounded-full font-medium
        ${variantClasses[variant]} ${sizeClasses[size]}
      `}
    >
      {children}
    </span>
  );
}
