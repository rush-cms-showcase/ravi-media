const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER || "5512983173077"

export function getWhatsAppLink(message: string): string {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const whatsappMessages = {
    landingPage: "Olá! Tenho interesse em uma landing page para meu negócio.",
    diagnostico: "Olá! Quero fazer um diagnóstico rápido do meu negócio.",
    contato: "Olá! Gostaria de mais informações sobre os serviços.",
    googleMeuNegocio: "Olá! Tenho interesse em otimizar meu Google Meu Negócio.",
    resgateSite: "Olá! Preciso de ajuda para melhorar meu site.",
} as const
