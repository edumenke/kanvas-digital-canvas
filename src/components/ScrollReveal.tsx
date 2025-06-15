
import React, { ReactNode } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const ScrollReveal = ({ children, className = "", delay = 0 }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
