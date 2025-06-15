
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LeadForm = () => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState("");
  const [values, setValues] = useState({ nome: "", email: "", telefone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !values.nome.trim() ||
      !values.email.trim() ||
      !validateEmail(values.email) ||
      !values.telefone.trim()
    ) {
      toast({
        title: "Confira os campos!",
        description: "Todos os campos são obrigatórios e o e-mail deve estar correto.",
        variant: "destructive"
      });
      return;
    }
    if (!webhookUrl.trim()) {
      toast({
        title: "Informe o Webhook do Make!",
        description: "Cole a URL do seu webhook do Make (Integromat) para registrar o contato na sua planilha.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);

    try {
      // Envia dados para o webhook do Make
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
          ...values,
          timestamp: new Date().toISOString()
        })
      });

      toast({
        title: "Contato enviado!",
        description: "A Kanvas retornará em breve. Obrigado!",
        variant: "default"
      });
      setValues({ nome: "", email: "", telefone: "" });
    } catch (error) {
      toast({
        title: "Erro ao enviar para o Make",
        description: "Verifique a URL do webhook ou tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="max-w-xl mx-auto p-8 bg-white/80 rounded-xl shadow-xl flex flex-col gap-6 animate-fade-in"
      onSubmit={onSubmit}
    >
      <h3 className="text-2xl font-bold font-display mb-3">Entre em contato</h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="webhookUrl" className="text-xs text-gray-600">
          Webhook do Make (Integromat)
        </label>
        <input
          id="webhookUrl"
          name="webhookUrl"
          type="url"
          placeholder="Cole aqui a URL do seu webhook do Make"
          value={webhookUrl}
          onChange={(e) => setWebhookUrl(e.target.value)}
          className="px-4 py-2 rounded border bg-gray-50"
          required
        />
        <span className="text-xs text-gray-500">Este campo só você vê – visitantes não verão nem precisam preencher.</span>
      </div>
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

