import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface GmnSearchSimulatorProps {
    className?: string
    cycleInterval?: number
}

type Phase = 'search' | 'results' | 'profile'

const PHASES: Phase[] = ['search', 'results', 'profile']

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -10, scale: 0.95 },
}

const SearchPhase = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 p-6 overflow-hidden"
    >
        <motion.div variants={itemVariants} className="w-32 h-10 mb-8">
            <svg viewBox="0 0 272 92" className="w-full h-full">
                <path fill="#ffffff" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#ffffff" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#ffffff" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                <path fill="#ffffff" d="M225 3v65h-9.5V3h9.5z"/>
                <path fill="#ffffff" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                <path fill="#ffffff" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
            </svg>
        </motion.div>

        <motion.div 
            variants={itemVariants} 
            className="w-full max-w-sm bg-zinc-800 border border-white/10 rounded-full px-5 py-3 flex items-center gap-3 shadow-lg"
        >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="flex items-center gap-0.5 overflow-hidden flex-1">
                <motion.div 
                    className="text-gray-300 text-sm font-medium whitespace-nowrap"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    dentista em são paulo
                </motion.div>
                <motion.div
                    className="w-0.5 h-5 bg-blue-500 shrink-0"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex gap-3 mt-6">
            <div className="px-4 py-2 bg-zinc-800 text-gray-400 text-xs rounded-full border border-white/5">Pesquisa Google</div>
            <div className="px-4 py-2 bg-zinc-800 text-gray-400 text-xs rounded-full border border-white/5">Estou com sorte</div>
        </motion.div>
    </motion.div>
)

const ResultsPhase = () => (
    <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
        className="absolute inset-0 flex flex-col bg-zinc-900 p-4 overflow-hidden"
    >
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 pb-3 border-b border-white/5">
            <div className="w-20 h-6 bg-zinc-800 rounded" />
            <div className="flex-1 bg-zinc-800 rounded-full px-3 py-2 text-xs text-gray-400">
                dentista em são paulo
            </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-xs text-gray-500 mb-3">
            Cerca de 1.240.000 resultados
        </motion.div>

        <div className="space-y-3">
            <motion.div 
                variants={itemVariants}
                className="p-3 rounded-lg border border-white/5 opacity-50"
            >
                <div className="w-3/4 h-3 bg-zinc-800 rounded mb-2" />
                <div className="w-1/2 h-2 bg-zinc-800 rounded" />
            </motion.div>

            <motion.div 
                variants={itemVariants}
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: -10,
                    transition: { delay: 1, duration: 0.5 }
                }}
                className="p-3 rounded-lg border-2 border-blue-500 bg-blue-900/10 relative"
            >
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    #1
                </div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">S</div>
                    <span className="text-blue-400 text-sm font-medium">Seu Negócio</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                    {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-400 ml-1">5.0 (127)</span>
                </div>
                <div className="text-xs text-gray-500">São Paulo, SP · Aberto agora</div>
            </motion.div>

            <motion.div 
                variants={itemVariants}
                className="p-3 rounded-lg border border-white/5 opacity-50"
            >
                <div className="w-2/3 h-3 bg-zinc-800 rounded mb-2" />
                <div className="w-1/3 h-2 bg-zinc-800 rounded" />
            </motion.div>
        </div>
    </motion.div>
)

const ProfilePhase = () => {
    const [filledStars, setFilledStars] = useState(0)
    const [showReview, setShowReview] = useState(false)
    const [reviewText, setReviewText] = useState("")

    useEffect(() => {
        const starTimer = setInterval(() => {
            setFilledStars(prev => {
                if (prev < 5) return prev + 1
                return prev
            })
        }, 300)

        const reviewTimer = setTimeout(() => {
            setShowReview(true)
        }, 2000)

        const textTimer = setTimeout(() => {
            const text = "Excelente atendimento!"
            let i = 0
            const typeInterval = setInterval(() => {
                if (i <= text.length) {
                    setReviewText(text.slice(0, i))
                    i++
                } else {
                    clearInterval(typeInterval)
                }
            }, 80)
        }, 2500)

        return () => {
            clearInterval(starTimer)
            clearTimeout(reviewTimer)
            clearTimeout(textTimer)
        }
    }, [])

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="absolute inset-0 flex bg-zinc-900 overflow-hidden"
        >
            <motion.div variants={itemVariants} className="w-1/2 bg-zinc-800 p-4 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                    <div>
                        <div className="text-white font-bold text-sm">Seu Negócio</div>
                        <div className="text-gray-400 text-xs">São Paulo, SP</div>
                    </div>
                </div>

                <div className="flex gap-1 mb-3">
                    {[1,2,3,4,5].map(i => (
                        <motion.svg 
                            key={i} 
                            className={`w-5 h-5 ${i <= filledStars ? 'text-yellow-400' : 'text-gray-600'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            initial={{ scale: 1 }}
                            animate={i <= filledStars ? { scale: [1, 1.3, 1] } : {}}
                            transition={{ duration: 0.3 }}
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </motion.svg>
                    ))}
                    <span className="text-gray-400 text-xs ml-1">5.0</span>
                </div>

                <AnimatePresence>
                    {showReview && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-700 rounded-lg p-3 flex-1"
                        >
                            <div className="text-xs text-gray-400 mb-2">Sua avaliação</div>
                            <div className="text-white text-sm min-h-[40px]">
                                {reviewText}
                                <motion.span 
                                    className="inline-block w-0.5 h-4 bg-blue-500 ml-0.5"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                />
                            </div>
                            {reviewText.length >= 20 && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-3 bg-blue-500 text-white text-xs font-bold py-2 px-4 rounded-full text-center"
                                >
                                    Publicar
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <motion.div variants={itemVariants} className="w-1/2 bg-zinc-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                </div>
                <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full" style={{
                        backgroundImage: 'linear-gradient(to right, #374151 1px, transparent 1px), linear-gradient(to bottom, #374151 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }} />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function GmnSearchSimulator({ cycleInterval = 5000, className = "" }: GmnSearchSimulatorProps) {
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
                {currentPhase === 'search' && <SearchPhase key="search" />}
                {currentPhase === 'results' && <ResultsPhase key="results" />}
                {currentPhase === 'profile' && <ProfilePhase key="profile" />}
            </AnimatePresence>
        </div>
    )
}
