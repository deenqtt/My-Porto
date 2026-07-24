export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f0ede6] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-[#bf5030] animate-pulse" />
          <span className="text-[10px] font-mono text-[#bf5030] uppercase tracking-widest animate-pulse">
            initializing telemetry...
          </span>
        </div>

        <div className="h-1 w-full bg-[#1a1410]/10 rounded-full overflow-hidden">
          <div className="h-full bg-[#bf5030] rounded-full w-1/3 animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>

        <div className="flex justify-between text-[10px] font-mono text-[#7a6e64]">
          <span>connecting_api</span>
          <span className="animate-pulse">load_sys_v2</span>
        </div>
      </div>
    </div>
  );
}
