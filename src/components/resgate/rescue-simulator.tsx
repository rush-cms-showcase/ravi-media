import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RescueSimulatorProps {
    className?: string
    cycleInterval?: number
}

type Phase = 'broken' | 'scanning' | 'fixed'

const PHASES: Phase[] = ['broken', 'scanning', 'fixed']

const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
    exit: { opacity: 0 }
}

const BrokenPhase = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 bg-zinc-900 p-4 overflow-hidden flex flex-col"
    >
        {/* Header - Broken */}
        <div className="flex justify-between items-center mb-8 opacity-50">
            <div className="w-8 h-8 bg-red-900/50 rounded-full animate-pulse" />
            <div className="flex gap-2">
                <div className="w-16 h-2 bg-red-900/50 rounded rotate-2" />
                <div className="w-16 h-2 bg-red-900/50 rounded -rotate-1" />
            </div>
        </div>

        {/* Content - Messy */}
        <div className="relative flex-1">
            <div className="absolute top-0 left-0 w-2/3 h-32 bg-zinc-800 rounded-lg rotate-1 blur-[1px]" />
            <div className="absolute top-10 right-0 w-1/2 h-24 bg-red-900/20 rounded-lg -rotate-2 border-2 border-red-500/20 border-dashed flex items-center justify-center">
                <span className="text-red-500 text-xs font-mono">Image Broken</span>
            </div>
            
            <div className="absolute top-40 left-4 w-full h-4 bg-zinc-800 rounded" />
            <div className="absolute top-48 left-0 w-3/4 h-4 bg-zinc-800 rounded rotate-1" />
            <div className="absolute top-56 left-8 w-1/2 h-4 bg-zinc-800 rounded -rotate-1" />

            {/* Loading Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-red-500 font-bold text-xs">Carregando...</span>
                </div>
            </div>

            {/* Warning Badges */}
            <div className="absolute bottom-4 left-4 bg-red-500 text-white text-[10px] px-2 py-1 rounded font-bold animate-bounce">
                 ! LENTO
            </div>
            <div className="absolute bottom-12 right-4 bg-yellow-500 text-black text-[10px] px-2 py-1 rounded font-bold">
                 AWS Error
            </div>
        </div>
    </motion.div>
)

const ScanningPhase = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 bg-zinc-900 overflow-hidden flex flex-col items-center justify-center font-mono"
    >
        <div className="w-full max-w-[80%] space-y-2">
            <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }} 
                transition={{ duration: 0.5 }}
                className="h-1 bg-green-500 rounded-full mb-4"
            />
            
            <div className="text-xs text-green-400 space-y-1">
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.2 }}
                >
                    &gt; Optimizing images... OK
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 0.6 }}
                >
                    &gt; Minifying assets... OK
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.0 }}
                >
                    &gt; Fixing layout shifts... OK
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1.4 }}
                >
                    &gt; Caching enabled... OK
                </motion.div>
            </div>
        </div>

        {/* Scanner Line */}
        <motion.div 
            className="absolute top-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)]"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
    </motion.div>
)

const FixedPhase = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 bg-zinc-900 p-6 overflow-hidden flex flex-col"
    >
        {/* Header - Clean */}
        <div className="flex justify-between items-center mb-8">
            <div className="w-8 h-8 bg-zinc-800 rounded-full" />
            <div className="flex gap-4">
                <div className="w-16 h-2 bg-zinc-800 rounded" />
                <div className="w-16 h-2 bg-zinc-800 rounded" />
                <div className="w-20 h-8 bg-green-500 rounded -mt-2 opacity-20" />
            </div>
        </div>

        {/* Content - Clean Grid */}
        <div className="grid grid-cols-2 gap-4 flex-1">
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-1 bg-zinc-800 rounded-lg h-32" 
            />
            <div className="space-y-3">
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full h-4 bg-zinc-800 rounded" 
                />
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="w-3/4 h-4 bg-zinc-800 rounded" 
                />
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="w-full h-8 bg-green-500 rounded mt-4" 
                />
            </div>
        </div>

        {/* Success Indicator */}
        <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.8 }}
            className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            100/100
        </motion.div>
    </motion.div>
)

export default function RescueSimulator({ cycleInterval = 4000, className = "" }: RescueSimulatorProps) {
    const [phaseIndex, setPhaseIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setPhaseIndex(prev => (prev + 1) % PHASES.length)
        }, cycleInterval)
        return () => clearInterval(timer)
    }, [cycleInterval])

    const currentPhase = PHASES[phaseIndex]

    return (
        <div className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}>
            <AnimatePresence mode="wait">
                {currentPhase === 'broken' && <BrokenPhase key="broken" />}
                {currentPhase === 'scanning' && <ScanningPhase key="scanning" />}
                {currentPhase === 'fixed' && <FixedPhase key="fixed" />}
            </AnimatePresence>
        </div>
    )
}
