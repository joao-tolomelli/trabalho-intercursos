import jsPDF from "jspdf";
import { type AIResponseData } from "@/components/ResultDashboard"; // Ajuste o caminho se necessário

export const generateSummaryPDF = (data: AIResponseData) => {
  // Cria um novo documento A4
  const doc = new jsPDF();
  
  // Configurações de margem e fonte
  const margin = 20;
  let cursorY = margin; // Controla a posição vertical na página

  // Título Principal
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Resumo de Formalizacao", margin, cursorY);
  cursorY += 15;

  // Categoria
  doc.setFontSize(14);
  doc.text(`Categoria Sugerida: ${data.classificacao_pj}`, margin, cursorY);
  cursorY += 10;

  // CNAE
  if (data.cnae_principal) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`CNAE Principal: ${data.cnae_principal.codigo}`, margin, cursorY);
    cursorY += 6;
    
    // splitTextToSize quebra o texto longo para não vazar da página
    const cnaeDesc = doc.splitTextToSize(data.cnae_principal.descricao, 170);
    doc.text(cnaeDesc, margin, cursorY);
    cursorY += (cnaeDesc.length * 6) + 5;
  }

  // Linha divisória
  doc.setLineWidth(0.5);
  doc.line(margin, cursorY, 190, cursorY);
  cursorY += 10;

  // Justificativa da IA
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Analise do Perfil", margin, cursorY);
  cursorY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const justificativaTexto = doc.splitTextToSize(data.justificativa_enquadramento, 170);
  doc.text(justificativaTexto, margin, cursorY);
  cursorY += (justificativaTexto.length * 5) + 10;

  // Próximos Passos (Deveres e Direitos)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Proximos Passos e Obrigacoes", margin, cursorY);
  cursorY += 8;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const passos = [
    "- Cadastro: Acesse o Portal do Empreendedor (gov.br/mei) para abrir o CNPJ.",
    "- Impostos: Pagamento mensal do DAS (aprox. R$ 75).",
    "- Declaracao: Envio anual da DASN-SIMEI ate 31 de maio.",
    "- Beneficios: Direito a INSS (aposentadoria, auxilio-doenca)."
  ];

  passos.forEach(passo => {
    doc.text(passo, margin, cursorY);
    cursorY += 7;
  });

  // Alerta Impeditivo (Se houver)
  if (data.alerta_impeditivo) {
    cursorY += 5;
    doc.setTextColor(220, 38, 38); // Cor vermelha
    doc.setFont("helvetica", "bold");
    const alerta = doc.splitTextToSize(`ATENCAO: ${data.alerta_impeditivo}`, 170);
    doc.text(alerta, margin, cursorY);
    doc.setTextColor(0, 0, 0); // Volta para preto
  }

  // Rodapé
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Gerado por IA - Projeto Acadêmico", margin, 280);

  // Força o download do arquivo no navegador do usuário
  doc.save("meu-resumo-formalizacao.pdf");
};