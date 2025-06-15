
import React, { useState, useEffect } from "react";
import EditableImage from "./EditableImage";
import EditableText from "./EditableText";
import { useCMS } from "./LocalCMSProvider";

const defaultBanners = [
  {
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    title: "Kanvas: Estratégia para Negócios Digitais",
    desc: "Consultoria completa de marketing com métodos de design thinking aplicados ao seu negócio."
  },
  {
    img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    title: "Especialistas em Digital Biz",
    desc: "Dominamos performance, branding e experiência do usuário para gerar impacto e crescimento real."
  }
];

const HeroCarousel = () => {
  const { data, admin } = useCMS();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setSlide((slide + 1) % defaultBanners.length), 5000);
    return () => clearTimeout(timer);
  }, [slide]);

  return (
    <div className="relative w-full h-[540px] md:h-[640px] flex items-center justify-center overflow-hidden select-none">
      {defaultBanners.map((banner, idx) => (
        <div
          key={idx}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${slide === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          style={{
            background: `linear-gradient(rgba(12,17,23,0.50),rgba(16,21,29,0.42)),url('${data[`banner-img-${idx}`] ?? banner.img}') center/cover no-repeat`
          }}
        >
          <div className="container h-full flex flex-col justify-center items-center text-left text-white relative">
            <div className="max-w-3xl mt-32 animate-fade-in">
              <EditableText
                cmsKey={`banner-title-${idx}`}
                as="h1"
                defaultValue={banner.title}
                className="text-3xl md:text-5xl font-display font-bold drop-shadow-lg"
              />
              <EditableText
                cmsKey={`banner-desc-${idx}`}
                as="p"
                defaultValue={banner.desc}
                className="mt-4 text-lg md:text-2xl font-inter font-medium"
              />
            </div>
            <EditableImage
              cmsKey={`banner-img-${idx}`}
              defaultUrl={banner.img}
              alt={banner.title}
              className="hidden"
            />
          </div>
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute left-1/2 bottom-6 -translate-x-1/2 flex gap-2">
        {defaultBanners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlide(idx)}
            className={`w-4 h-4 rounded-full border-2 border-white ${slide === idx ? "bg-white" : "bg-white/40"} transition`}
            aria-label={`Banner ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
