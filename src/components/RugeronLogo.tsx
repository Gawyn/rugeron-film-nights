import { Film } from "lucide-react";

export const RugeronLogo = ({ size = 60 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* Outer film reel ring */}
        <div 
          className="border-4 border-primary rounded-full flex items-center justify-center shadow-pink-glow"
          style={{ width: size, height: size }}
        >
          {/* Inner film holes pattern */}
          <div className="absolute inset-2 rounded-full border-2 border-secondary">
            {/* Film holes */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-accent rounded-full shadow-golden-glow"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-${size * 0.3}px)`
                }}
              />
            ))}
          </div>
          
          {/* Center film icon */}
          <Film 
            size={size * 0.4} 
            className="text-accent drop-shadow-lg" 
            strokeWidth={2.5}
          />
        </div>
        
        {/* Rotating glow effect */}
        <div 
          className="absolute inset-0 rounded-full animate-spin opacity-20"
          style={{
            background: 'conic-gradient(from 0deg, transparent, hsl(var(--primary)), transparent, hsl(var(--accent)), transparent)',
            animationDuration: '8s'
          }}
        />
      </div>
    </div>
  );
};