
import React, { ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Componente ScrollReveal
 * 
 * Envolve outro componente/elemento (filho) e revela-o suavemente (com animação)
 * quando ele aparece na área visível (viewport) durante a rolagem da página.
 * 
 * Props:
 * - children: elemento(s) React a serem animados.
 * - className: classes Tailwind/customizadas extras (opcional).
 * - delay: atraso (em segundos) para começar a animação (opcional).
 * 
 * Como usar:
 * <ScrollReveal>
 *   <h2>Sua seção</h2>
 * </ScrollReveal>
 */
type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const ScrollReveal = ({ children, className = "", delay = 0 }: Props) => {
  // Referência para o elemento DOM que será observado
  const ref = React.useRef<HTMLDivElement>(null);

  // useInView detectar se o elemento está visível na tela (só uma vez: once: true)
  // O parâmetro margin ajuda a acionar a animação um pouco antes do elemento entrar totalmente em view.
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      // Estado inicial: oculto, um pouco deslocado para baixo
      initial={{ opacity: 0, y: 40 }}
      // Quando visível: aparece suavemente e sobe para a posição final
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      // Customiza duração e atraso da animação
      transition={{ duration: 0.9, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
