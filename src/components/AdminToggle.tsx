
import React from "react";
import { useCMS } from "./LocalCMSProvider";
import { ArrowUp, ArrowDown } from "lucide-react";

const AdminToggle = () => {
  const { admin, toggleAdmin } = useCMS();
  return (
    <button
      onClick={toggleAdmin}
      className="fixed bottom-6 right-6 bg-white border border-primary rounded-full shadow-lg p-3 z-50 flex flex-col hover:bg-primary/10 transition"
      title={admin ? "Sair do modo admin" : "Entrar no modo admin"}
      style={{ opacity: 0.85 }}
    >
      {admin ? (
        <ArrowDown size={24} className="text-primary" />
      ) : (
        <ArrowUp size={24} className="text-primary" />
      )}
      <span className="text-[10px] font-inter font-semibold text-primary">{admin ? "Modo admin" : "CMS Kanvas"}</span>
    </button>
  );
};

export default AdminToggle;
