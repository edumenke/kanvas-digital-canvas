
import React from "react";
import { motion } from "framer-motion";

type SplashFloatProps = {
  className?: string;
  style?: React.CSSProperties;
};

const floatingVariants = {
  animate: {
    y: [0, -14, 0, 12, 0],
    x: [0, 6, -10, 3, 0],
    rotate: [0, 4, -2, 2, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  }
};

const SplashFloat: React.FC<SplashFloatProps> = ({ className = "", style = {} }) => (
  <motion.img
    src="/lovable-uploads/e04de6ee-7ef1-4d03-becf-264b5fcf4b2c.png"
    alt="Splash decorativo"
    aria-hidden="true"
    className={`pointer-events-none absolute select-none opacity-35 blur-[1px] drop-shadow-md ${className}`}
    style={style}
    variants={floatingVariants}
    animate="animate"
    initial={false}
    draggable={false}
  />
);

export default SplashFloat;
