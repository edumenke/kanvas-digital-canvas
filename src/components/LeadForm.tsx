
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const LeadForm = () => {
  const { toast } = useToast();
  const [integrationType, setIntegrationType] = useState<"make" | "sheets">("sheets");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [sheetsUrl, setSheetsUrl] = useState("");
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

    const targetUrl = integrationType === "make" ? webhookUrl : sheetsUrl;
    
    if (!targetUrl.trim()) {
      toast({
        title: integrationType === "make" ? "Informe o Webhook do Make!" : "Informe a URL do Google Sheets!",
        description: integrationType === "make" 
          ? "Cole a URL do seu webhook do Make (Integromat)."
          : "Cole a URL do Google Apps Script publicado.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);

    try {
      await fetch(targetUrl, {
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
        title: "Erro ao enviar",
        description: "Verifique a URL e tente novamente.",
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
      
      {/* Seletor de tipo de integração */}
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-700 font-semibold">Tipo de Integração</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="integrationType"
              value="sheets"
              checked={integrationType === "sheets"}
              onChange={(e) => setIntegrationType(e.target.value as "sheets")}
              className="w-4 h-4"
            />
            <span className="text-sm">Google Sheets (Recomendado)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="integrationType"
              value="make"
              checked={integrationType === "make"}
              onChange={(e) => setIntegrationType(e.target.value as "make")}
              className="w-4 h-4"
            />
            <span className="text-sm">Make (Integromat)</span>
          </label>
        </div>
      </div>

      {/* Campo condicional baseado no tipo */}
      {integrationType === "sheets" ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="sheetsUrl" className="text-xs text-gray-600">
            URL do Google Apps Script
          </label>
          <input
            id="sheetsUrl"
            name="sheetsUrl"
            type="url"
            placeholder="Cole aqui a URL do seu Google Apps Script"
            value={sheetsUrl}
            onChange={(e) => setSheetsUrl(e.target.value)}
            className="px-4 py-2 rounded border bg-gray-50"
            required
          />
          <span className="text-xs text-gray-500">
            Este campo só você vê. Configure seguindo as instruções abaixo.
          </span>
          <details className="text-xs text-gray-600 bg-blue-50 p-3 rounded mt-1">
            <summary className="cursor-pointer font-semibold">📖 Como configurar Google Sheets (clique para expandir)</summary>
            <ol className="list-decimal ml-4 mt-2 space-y-1">
              <li>Abra sua planilha do Google Sheets</li>
              <li>Vá em <strong>Extensões → Apps Script</strong></li>
              <li>Cole este código:
                <pre className="bg-gray-800 text-white p-2 rounded text-xs mt-1 overflow-x-auto">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.timestamp, data.nome, data.email, data.telefone]);
  return ContentService.createTextOutput(JSON.stringify({result: "success"}))
    .setMimeType(ContentService.MimeType.JSON);
}`}
                </pre>
              </li>
              <li>Clique em <strong>Implantar → Nova implantação</strong></li>
              <li>Escolha tipo: <strong>Aplicativo da Web</strong></li>
              <li>Acesso: <strong>Qualquer pessoa</strong></li>
              <li>Copie a URL gerada e cole acima</li>
            </ol>
          </details>
        </div>
      ) : (
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
      )}

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

      {/* Botão de envio com espaçamento extra e destaque */}
      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar Contato"}
        </button>
      </div>
    </form>
  );
};

export default LeadForm;
