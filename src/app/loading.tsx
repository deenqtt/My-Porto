export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xs space-y-4">
        {/* System Terminal Look */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest animate-pulse">
            Initializing Telemetry...
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 w-full bg-[#1f2937] rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 rounded-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
        
        <div className="flex justify-between text-[10px] font-mono text-gray-600">
          <span>CONNECTING_API</span>
          <span className="animate-pulse">LOAD_SYS_V2</span>
        </div>
      </div>
    </div>
  );
}
