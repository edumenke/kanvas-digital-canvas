
import React, { useState } from "react";
import { useCMS } from "./LocalCMSProvider";

type Props = {
  cmsKey: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  defaultValue: string;
  className?: string;
};

const EditableText = ({ cmsKey, as = "p", defaultValue, className }: Props) => {
  const { data, setData, admin } = useCMS();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(data[cmsKey] ?? defaultValue);

  React.useEffect(() => setValue(data[cmsKey] ?? defaultValue), [data, cmsKey, defaultValue]);

  if (!admin) {
    const Component = as as any;
    return <Component className={className}>{value}</Component>;
  }

  return editing ? (
    <input
      className={`bg-yellow-50 border rounded px-2 py-1 ${className}`}
      value={value}
      autoFocus
      onChange={e => setValue(e.target.value)}
      onBlur={() => {
        setData(cmsKey, value);
        setEditing(false);
      }}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === "Escape") {
          setData(cmsKey, value);
          setEditing(false);
        }
      }}
    />
  ) : (
    <span
      className={`hover:underline cursor-pointer ${className}`}
      onClick={() => setEditing(true)}
      title="Clique para editar"
    >
      {value}
    </span>
  );
};

export default EditableText;
