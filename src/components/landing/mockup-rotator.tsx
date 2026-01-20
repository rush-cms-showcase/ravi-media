import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MockupRotatorProps {
    className?: string;
    cycleInterval?: number;
}

type VariantType = 'standard' | 'vsl' | 'lead' | 'portfolio' | 'ecommerce';

const VARIANTS: VariantType[] = ['standard', 'vsl', 'lead', 'portfolio', 'ecommerce'];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
};

const MockupHeader = () => (
    <motion.div variants={itemVariants} className="w-full flex justify-between items-center mb-6">
        <div className="w-8 h-8 bg-zinc-700 rounded-full" />
        <div className="hidden sm:flex gap-2">
            <div className="w-12 h-2 bg-zinc-800 rounded" />
            <div className="w-12 h-2 bg-zinc-800 rounded" />
        </div>
        <div className="w-20 h-8 bg-primary/20 rounded" />
    </motion.div>
);

const StandardVariant = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 p-6 overflow-hidden"
    >
        <MockupHeader />

        {/* Hero Text */}
        <motion.div variants={itemVariants} className="w-3/4 h-8 bg-zinc-700 rounded mb-3" />
        <motion.div variants={itemVariants} className="w-1/2 h-4 bg-zinc-800 rounded mb-8" />

        {/* Feature Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 w-full">
            {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-zinc-800/50 rounded-lg p-2 flex flex-col gap-2 border border-white/5">
                    <div className="w-8 h-8 bg-zinc-700 rounded-full" />
                    <div className="w-full h-2 bg-zinc-700/50 rounded" />
                    <div className="w-2/3 h-2 bg-zinc-700/50 rounded" />
                </div>
            ))}
        </motion.div>
    </motion.div>
);

const VslVariant = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col items-center pt-6 px-8 bg-zinc-900 overflow-hidden"
    >
        <MockupHeader />

        <motion.div variants={itemVariants} className="w-full h-6 bg-amber-500/20 rounded mb-2" />
        <motion.div variants={itemVariants} className="w-2/3 h-4 bg-zinc-700 rounded mb-6" />

        <motion.div variants={itemVariants} className="w-full aspect-video bg-zinc-800 rounded-lg border border-white/10 flex items-center justify-center relative shadow-xl">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
            </div>
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-red-500" />
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="w-full h-12 bg-green-500 rounded-lg mt-6 shadow-lg shadow-green-500/20" />
    </motion.div>
);

const LeadVariant = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col bg-zinc-900 overflow-hidden"
    >
        <div className="w-full p-4 border-b border-white/5 flex justify-between">
            <motion.div variants={itemVariants} className="w-6 h-6 bg-zinc-700 rounded-full" />
            <motion.div variants={itemVariants} className="w-16 h-6 bg-zinc-800 rounded" />
        </div>

        <div className="flex flex-1 w-full">
            <div className="w-1/2 p-6 flex flex-col justify-center space-y-4 border-r border-white/5 bg-zinc-800/30">
                <motion.div variants={itemVariants} className="w-10 h-10 bg-blue-500/20 rounded-lg mb-2" />
                <motion.div variants={itemVariants} className="w-full h-6 bg-zinc-700 rounded" />
                <motion.div variants={itemVariants} className="w-3/4 h-3 bg-zinc-800 rounded" />
                <motion.div variants={itemVariants} className="w-3/4 h-3 bg-zinc-800 rounded" />
                <motion.div variants={itemVariants} className="w-full h-3 bg-zinc-800 rounded" />
            </div>

            {/* Right: Form */}
            <div className="w-1/2 p-6 flex flex-col justify-center space-y-3 bg-zinc-900">
                <motion.div variants={itemVariants} className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Inscreva-se</motion.div>
                <motion.div variants={itemVariants} className="w-full h-8 bg-zinc-800 rounded border border-white/10" />
                <motion.div variants={itemVariants} className="w-full h-8 bg-zinc-800 rounded border border-white/10" />
                <motion.div variants={itemVariants} className="w-full h-10 bg-primary rounded mt-2 shadow-lg shadow-primary/20" />
                <motion.div variants={itemVariants} className="w-full flex justify-center mt-2">
                    <div className="w-1/2 h-2 bg-zinc-800 rounded" />
                </motion.div>
            </div>
        </div>
    </motion.div>
);

const PortfolioVariant = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col items-center bg-zinc-900 p-6 overflow-hidden"
    >
        <MockupHeader />

        <motion.div variants={itemVariants} className="w-1/2 h-6 bg-zinc-700 rounded mb-6" />

        <div className="grid grid-cols-2 gap-4 w-full h-full">
            <motion.div variants={itemVariants} className="w-full h-32 bg-purple-500/20 rounded-lg border border-purple-500/20" />
            <motion.div variants={itemVariants} className="w-full h-32 bg-blue-500/20 rounded-lg border border-blue-500/20" />
            <motion.div variants={itemVariants} className="w-full h-32 bg-pink-500/20 rounded-lg border border-pink-500/20" />
            <motion.div variants={itemVariants} className="w-full h-32 bg-emerald-500/20 rounded-lg border border-emerald-500/20" />
        </div>
    </motion.div>
);

const EcommerceVariant = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col bg-zinc-900 overflow-hidden"
    >
        <MockupHeader />

        <div className="flex w-full h-full p-6 pt-0 gap-6 items-center">
            <motion.div variants={itemVariants} className="w-1/2 aspect-square bg-zinc-800 rounded-xl border border-white/5 relative flex items-center justify-center">
                <div className="w-16 h-16 bg-zinc-700 rounded-full" />
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/5" />
            </motion.div>

            <div className="w-1/2 flex flex-col space-y-3">
                <motion.div variants={itemVariants} className="w-20 h-4 bg-primary/20 text-primary text-[10px] flex items-center justify-center rounded-full">NOVIDADE</motion.div>
                <motion.div variants={itemVariants} className="w-full h-8 bg-zinc-700 rounded" />
                <motion.div variants={itemVariants} className="w-1/3 h-6 bg-zinc-800 rounded" />
                <motion.div variants={itemVariants} className="w-full h-20 bg-zinc-800/50 rounded mt-2" />
                <motion.div variants={itemVariants} className="w-full h-10 bg-primary rounded mt-4" />
            </div>
        </div>
    </motion.div>
);

export default function MockupRotator({ cycleInterval = 4000, className = "" }: MockupRotatorProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % VARIANTS.length);
        }, cycleInterval);
        return () => clearInterval(timer);
    }, [cycleInterval]);

    const currentVariant = VARIANTS[index];

    return (
        <div className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}>
            <AnimatePresence mode="wait">
                {currentVariant === 'standard' && <StandardVariant key="standard" />}
                {currentVariant === 'vsl' && <VslVariant key="vsl" />}
                {currentVariant === 'lead' && <LeadVariant key="lead" />}
                {currentVariant === 'portfolio' && <PortfolioVariant key="portfolio" />}
                {currentVariant === 'ecommerce' && <EcommerceVariant key="ecommerce" />}
            </AnimatePresence>
        </div>
    );
}
