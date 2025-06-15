
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LeadForm = () => {
  const { toast } = useToast();
  const [values, setValues] = useState({ nome: "", email: "", telefone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !values.nome.trim() ||
      !values.email.trim() ||
      !validateEmail(values.email) ||
      !values.telefone.trim()
    ) {
      toast({ title: "Confira os campos!", description: "Todos os campos são obrigatórios e o e-mail deve estar correto.", variant: "destructive" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Contato enviado!", description: "A Kanvas retornará em breve. Obrigado!", variant: "default" });
      setValues({ nome: "", email: "", telefone: "" });
    }, 1200);
  };

  return (
    <form className="max-w-xl mx-auto p-8 bg-white/80 rounded-xl shadow-xl flex flex-col gap-6 animate-fade-in" onSubmit={onSubmit}>
      <h3 className="text-2xl font-bold font-display mb-3">Entre em contato</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="text-sm text-gray-700">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          required
          value={values.nome}
          onChange={handleChange}
          className="px-4 py-2 rounded border bg-gray-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm text-gray-700">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange}
          className="px-4 py-2 rounded border bg-gray-50"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="telefone" className="text-sm text-gray-700">Telefone</label>
        <input
          id="telefone"
          name="telefone"
          type="tel"
          required
          value={values.telefone}
          onChange={handleChange}
          className="px-4 py-2 rounded border bg-gray-50"
          placeholder="(99) 99999-9999"
        />
      </div>
      <button
        type="submit"
        className="bg-primary px-6 py-2 rounded font-bold text-white hover:bg-primary/90 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
};

export default LeadForm;
