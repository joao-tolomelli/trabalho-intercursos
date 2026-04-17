import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  FileText,
  Calculator,
  Receipt,
  Heart,
  ScrollText,
  ClipboardList,
  RotateCcw,
  Download,
  AlertTriangle,
  Briefcase,
  BrainCircuit,
  X,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSummaryPDF } from "@/utils/generatePDF";

// Tipagem baseada no JSON retornado pela sua API
export interface AIResponseData {
  alerta_impeditivo: string | null;
  classificacao_pj: string;
  cnae_principal: {
    codigo: string;
    descricao: string;
    permitido_mei: boolean;
  } | null;
  cnaes_secundarios: any[];
  justificativa_enquadramento: string;
  perfil_resumo: string;
  setor_atuacao: string;
}

interface ResultDashboardProps {
  data: AIResponseData;
  onRestart: () => void;
}

// Cards fixos para instruções gerais
const staticCards = [
  {
    icon: FileText,
    title: "Como abrir o CNPJ",
    text: "Acesse o Portal do Empreendedor (gov.br/mei) e faça o cadastro gratuitamente. O processo é 100% online e leva cerca de 15 minutos.",
  },
  {
    icon: Calculator,
    title: "Impostos Mensais",
    text: "Como MEI, você paga um valor fixo mensal de aproximadamente R$ 75 (DAS), que já inclui INSS, ISS e ICMS. Simples assim.",
  },
  {
    icon: Receipt,
    title: "Imposto de Renda",
    text: "O MEI deve fazer a declaração anual do DASN-SIMEI. Como pessoa física, precisa declarar o IR se ultrapassar o limite de rendimentos da Receita.",
  },
  {
    icon: Heart,
    title: "Benefícios do INSS",
    text: "Ao contribuir mensalmente, você garante tempo para aposentadoria, auxílio-doença e salário-maternidade.",
  },
  {
    icon: ScrollText,
    title: "Nota Fiscal",
    text: "Emitir nota fiscal abre portas para vender para empresas, participar de licitações e transmitir mais profissionalismo ao cliente.",
  },
  {
    icon: ClipboardList,
    title: "Outros Deveres",
    text: "Mantenha um relatório mensal das suas receitas e não se esqueça de enviar a Declaração Anual até 31 de maio de cada ano.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const ResultDashboard = ({ data, onRestart }: ResultDashboardProps) => {
  // Estados do Modal de Feedback
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");

  const handleDownloadPDF = () => {
    // Chama a função passando os dados da IA que já estão na prop 'data'
    generateSummaryPDF(data);
    setShowFeedbackModal(false); // Fecha o modal após o download
  };

  const submitFeedback = async () => {
    // 1. Aqui você faz o Axios POST para salvar o feedback
    //console.log("Feedback enviado:", { rating, text: feedbackText });
    
    // 2. Após confirmar o envio, gera o PDF automaticamente
    handleDownloadPDF();
  };

  return (
    <div className="relative min-h-screen px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        
        {/* Bloco de Alerta Impeditivo */}
        {data.alerta_impeditivo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 rounded-2xl border-l-4 border-destructive bg-destructive/10 p-5 text-destructive-foreground shadow-sm"
          >
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
            <div>
              <h3 className="mb-1 font-bold text-destructive">Atenção Importante</h3>
              <p className="text-sm text-gray-800 leading-relaxed">{data.alerta_impeditivo}</p>
            </div>
          </motion.div>
        )}

        {/* Header Dinâmico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-extrabold text-foreground md:text-5xl">
            Sua categoria ideal é:{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {data.classificacao_pj}
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {data.perfil_resumo}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Card Dinâmico 1: CNAE sugerido */}
          {data.cnae_principal && (
            <motion.div
              variants={cardVariants}
              className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground">
                Atividade Sugerida (CNAE)
              </h3>
              <p className="text-sm leading-relaxed text-foreground/80">
                <span className="mb-1 block font-semibold">{data.cnae_principal.codigo}</span>
                {data.cnae_principal.descricao}
              </p>
            </motion.div>
          )}

          {/* Card Dinâmico 2: Justificativa da IA */}
          <motion.div
            variants={cardVariants}
            className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 shadow-sm transition-shadow hover:shadow-md sm:col-span-2 lg:col-span-2"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <BrainCircuit className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mb-2 text-base font-bold text-foreground">
              Análise da Inteligência Artificial
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80">
              {data.justificativa_enquadramento}
            </p>
          </motion.div>

          {/* Cards Estáticos */}
          {staticCards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                <card.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {card.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions (Botões principais) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button variant="outline" size="lg" onClick={onRestart} className="w-full sm:w-auto">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refazer o teste
          </Button>
          <Button variant="default" size="lg" onClick={() => setShowFeedbackModal(true)} className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Baixar resumo em PDF
          </Button>
        </motion.div>
      </div>

      {/* Modal de Feedback */}
      <AnimatePresence>
        {showFeedbackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
            >
              <button 
                onClick={() => setShowFeedbackModal(false)}
                className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="mb-2 mt-2 text-center text-xl font-bold text-foreground">Seu PDF está pronto!</h3>
              <p className="mb-6 text-center text-sm text-muted-foreground">
                Como este é um projeto universitário, sua avaliação me ajuda muito a validar a ferramenta. Como foi sua experiência?
              </p>

              {/* Sistema de Estrelas */}
              <div className="mb-6 flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-transform hover:scale-110 ${
                      rating >= star ? "text-yellow-400" : "text-muted-foreground/30"
                    }`}
                  >
                    <Star className="h-10 w-10 fill-current" />
                  </button>
                ))}
              </div>

              {/* Caixa de Texto Opcional */}
              <AnimatePresence>
                {rating > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-6 overflow-hidden"
                  >
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Conte mais sobre o porquê dessa nota (opcional)"
                      className="w-full resize-none rounded-xl border-2 border-border bg-background p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      rows={3}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ações do Modal */}
              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  disabled={rating === 0} 
                  onClick={submitFeedback}
                  className="w-full"
                >
                  Enviar Feedback e Baixar PDF
                </Button>
                <button 
                  onClick={handleDownloadPDF}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                >
                  Pular e baixar direto
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultDashboard;