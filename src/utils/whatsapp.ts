const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER || "5512983173077"

export function getWhatsAppLink(message: string): string {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const whatsappMessages = {
    contato: "Olá! Gostaria de mais informações sobre os serviços.",
    diagnostico: "Olá! Quero fazer um diagnóstico rápido do meu negócio.",
    landingPage: {
        hero: "Olá! Quero pedir um diagnóstico rápido para minha landing page.",
        pricing: "Olá! Tenho interesse em uma landing page para meu negócio."
    },
    gmn: {
        hero: "Olá! Quero um diagnóstico do meu Google Meu Negócio.",
        cta: "Olá! Tenho interesse em otimizar meu Google Meu Negócio."
    },
    resgate: {
        hero: "Olá! Preciso de ajuda para consertar/melhorar meu site.",
        plans: {
            basico: "Olá! Quero o plano Básico de Resgate de Site.",
            completo: "Olá! Quero o plano Completo de Resgate de Site.",
            premium: "Olá! Quero o plano Premium de Resgate de Site."
        }
    },
    portal: {
        hero: "Olá! Quero transformar meu negócio com infraestrutura digital.",
        landingCard: "Olá! Tenho interesse em Landing Pages de Alta Conversão.",
        gmnCard: "Olá! Quero otimizar meu Google Meu Negócio.",
        resgateCard: "Olá! Preciso resgatar/modernizar meu site."
    }
} as const
