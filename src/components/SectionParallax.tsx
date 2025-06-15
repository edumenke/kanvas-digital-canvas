
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import EditableImage from "./EditableImage";
import ScrollReveal from "./ScrollReveal";

type Props = {
  id: string;
  defaultImg: string;
  cmsImgKey: string;
  bgOpacity?: number;
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
};

const SectionParallax = ({
  id,
  defaultImg,
  cmsImgKey,
  bgOpacity = 0.24,
  children,
  className = "",
  reverse = false
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full py-24 md:py-36 flex ${reverse ? "flex-row-reverse" : "flex-row"} items-center justify-center bg-background overflow-hidden ${className}`}
      style={{ minHeight: "400px" }}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(rgba(16,21,29,${bgOpacity}),rgba(16,21,29,${bgOpacity})),url('${defaultImg}') center/cover no-repeat`,
          filter: "brightness(0.95) blur(0.5px)"
        }}
      >
        {/* Imagem editável (invisível) para CMS */}
        <EditableImage
          cmsKey={cmsImgKey}
          defaultUrl={defaultImg}
          alt="Background"
          className="hidden"
        />
      </div>
      <motion.div
        className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-24"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1 }}
      >
        {/* 
          Modificação: envolver o primeiro filho (título) com ScrollReveal.
          Assumimos que o primeiro filho é o bloco de textos, e o título é o primeiro filho 
        */}
        {React.Children.map(children, (child, i) => {
          if (
            React.isValidElement(child) &&
            i === 0 &&
            React.Children.count(child.props.children) >= 1
          ) {
            // Envolve o título com ScrollReveal
            const childChildren = React.Children.toArray(child.props.children);
            const title = childChildren[0];
            const rest = childChildren.slice(1);

            return React.cloneElement(child, {}, [
              <ScrollReveal key="scrollreveal-title">{title}</ScrollReveal>,
              ...rest
            ]);
          }
          return child;
        })}
      </motion.div>
    </section>
  );
};

export default SectionParallax;
