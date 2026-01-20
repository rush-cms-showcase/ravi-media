import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DashboardSimulatorProps {
    className?: string;
}

const StatCard = ({ title, icon: Icon, children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="bg-zinc-800/50 border border-white/5 rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden group h-full"
    >
        <div className="flex items-center justify-between text-gray-400 text-xs uppercase tracking-wider font-medium">
            <span>{title}</span>
            <Icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </div>
        {children}
    </motion.div>
);

const TrafficChart = () => {
    // Simulated chart data points
    const points = [20, 45, 30, 60, 55, 85, 95];
    const width = 100;
    const height = 40;
    const pathD = `M0,${height} ` + points.map((p, i) => 
        `L${(i / (points.length - 1)) * width},${height - (p / 100) * height}`
    ).join(" ");

    return (
        <div className="flex-1 flex flex-col justify-end">
            <div className="flex items-end gap-1 mb-2">
                <span className="text-3xl font-bold text-white tracking-tight">3.4k</span>
                <span className="text-xs text-green-500 font-bold mb-1.5 flex items-center">
                    <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +24%
                </span>
            </div>
            <div className="h-10 w-full relative">
                 <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
                    {/* Gradient Defs */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    
                    {/* Area fill */}
                    <motion.path 
                        d={`${pathD} L${width},${height} L0,${height} Z`} 
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 1, pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    
                    {/* Line stroke */}
                    <motion.path 
                        d={pathD} 
                        fill="none" 
                        stroke="#3b82f6" 
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                 </svg>
            </div>
        </div>
    );
};

const SpeedGauge = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setScore(prev => {
                    if (prev >= 98) {
                        clearInterval(interval);
                        return 98;
                    }
                    return prev + 2;
                });
            }, 30);
            return () => clearInterval(interval);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col gap-3">
             <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#374151" strokeWidth="6" fill="transparent" />
                        <motion.circle 
                            cx="32" cy="32" r="28" 
                            stroke="#22c55e" 
                            strokeWidth="6" 
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 28}
                            strokeDashoffset={2 * Math.PI * 28 * (1 - score / 100)}
                            strokeLinecap="round"
                            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - score / 100) }}
                            transition={{ duration: 0.5 }} // Smooth updates from state
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <span className="text-xl font-bold text-white">{score}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <span className="text-gray-300">LCP: 0.8s</span>
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <span className="text-gray-300">CLS: 0</span>
                    </div>
                     <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <span className="text-gray-300">TBT: 40ms</span>
                    </div>
                </div>
             </div>
        </div>
    );
};

const LeadsList = () => {
    const [messages, setMessages] = useState<number[]>([1]);

    useEffect(() => {
        // Generate more intervals for more messages over a longer period
        const intervals = Array.from({ length: 5 }, (_, i) => 1000 + (i * 1200));
        let timeouts: NodeJS.Timeout[] = [];

        intervals.forEach((ms, index) => {
            const timeout = setTimeout(() => {
                setMessages(prev => [index + 2, ...prev].slice(0, 6));
            }, ms);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="flex flex-col gap-2 flex-1 h-full min-h-0 overflow-hidden relative">
            <AnimatePresence mode="popLayout">
                {messages.map((id) => (
                    <motion.div
                        layout
                        key={id}
                        initial={{ opacity: 0, x: 20, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="bg-zinc-800 rounded p-2 flex items-center gap-3 border border-white/5 shrink-0"
                    >
                         <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                            LE
                         </div>
                         <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start">
                                 <div className="text-xs text-white font-medium truncate">Lead Recente #{id}</div>
                                 <div className="text-[10px] text-gray-500">Agora</div>
                             </div>
                             <div className="text-[10px] text-gray-400 truncate">Olá, gostaria de um orçamento...</div>
                         </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default function DashboardSimulator({ className = "" }: DashboardSimulatorProps) {
    return (
        <div className={`relative w-full h-full bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ${className}`}>
            {/* Top Bar */}
            <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-zinc-900/50 backdrop-blur-sm z-10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="h-6 w-32 bg-zinc-800 rounded-full flex items-center justify-center border border-white/5">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                    <span className="text-[10px] text-gray-400 font-mono">LIVE PREVIEW</span>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 h-full overflow-hidden">
                {/* Left Column: Stats + Performance */}
                <div className="flex flex-col gap-4">
                    <StatCard title="Visitas Mensais" icon={props => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    )} delay={0.2}>
                       <TrafficChart />
                    </StatCard>

                    <StatCard title="Performance Core Vitals" icon={props => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    )} delay={0.6}>
                       <SpeedGauge />
                    </StatCard>
                </div>

                 {/* Right Column: Leads (Full Height) */}
                <div className="h-full">
                    <StatCard title="Novas Mensagens" icon={props => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    )} delay={0.4}>
                       <LeadsList />
                    </StatCard>
                </div>
            </div>
            
            {/* Background Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />
        </div>
    );
}
