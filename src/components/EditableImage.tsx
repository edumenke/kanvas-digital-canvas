
import React, { useRef } from "react";
import { useCMS } from "./LocalCMSProvider";

type Props = {
  cmsKey: string;
  defaultUrl: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

const EditableImage = ({ cmsKey, defaultUrl, alt, className, style }: Props) => {
  const { data, setData, admin } = useCMS();
  const inputRef = useRef<HTMLInputElement>(null);
  const url = data[cmsKey] ?? defaultUrl;

  if (!admin) {
    return <img src={url} alt={alt} className={className} style={style} />;
  }
  return (
    <span className="relative group">
      <img
        src={url}
        alt={alt}
        className={className + " opacity-80"}
        style={style}
        onClick={() => inputRef.current?.click()}
        title="Clique para alterar imagem"
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Cole URL da imagem"
        className="hidden"
        onBlur={e => e.target.value && setData(cmsKey, e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter" && (e.target as any).value) {
            setData(cmsKey, (e.target as any).value);
          }
        }}
      />
      <span
        className="absolute bottom-2 left-2 bg-white opacity-90 text-xs rounded px-2 py-0.5 shadow hidden group-hover:block"
        style={{ zIndex: 10 }}
      >
        Trocar imagem (URL)
      </span>
    </span>
  );
};

export default EditableImage;
