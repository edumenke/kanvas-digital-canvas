import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import EditableImage from "./EditableImage";
import EditableText from "./EditableText";
import SplashFloat from "./SplashFloat";

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
      {/* Splash flutuante, só para sessões (não home, não contato) */}
      {id !== "home" && id !== "contato" && (
        <SplashFloat
          className={`z-0 ${reverse ? "right-4 top-7 md:right-24" : "left-4 top-9 md:left-24"}
            w-32 md:w-40`}
          style={{
            opacity: 0.35,
            top: "3%",
            ...(reverse ? { right: 0 } : { left: 0 }),
          }}
        />
      )}
      <motion.div
        className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-10 md:gap-24"
        initial={{ opacity: 0, y: 60 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionParallax;
