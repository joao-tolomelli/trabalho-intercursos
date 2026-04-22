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
  ExternalLink,
  MessageSquareHeart // Ícone novo para a seção de feedback
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateSummaryPDF } from "@/utils/generatePDF";

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
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [hasClickedForm, setHasClickedForm] = useState(false);

  const handleDownloadPDF = () => {
    generateSummaryPDF(data);
    setShowFeedbackModal(false);
    setHasClickedForm(false); 
  };

  return (
    <div className="relative min-h-screen px-6 py-12 md:py-20">
      <div className="mx-auto max-w-5xl">
        
        {data.alerta_impeditivo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-start gap-3 rounded-2xl border-l-4 border-destructive bg-destructive/10 p-5 text-destructive-foreground shadow-sm"
          >
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
            <div>
              <h3 className="mb-1 font-bold text-destructive">Atenção Importante</h3>
              <p className="text-sm leading-relaxed">{data.alerta_impeditivo}</p>
            </div>
          </motion.div>
        )}

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
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

        {/* Actions Principais */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
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

        {/* NOVA SEÇÃO: Banner de Feedback Estático no rodapé */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-secondary/30 text-center"
        >
          <div className="p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MessageSquareHeart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-bold text-foreground">Gostou da ferramenta?</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Este projeto faz parte de um trabalho acadêmico. Sua avaliação não leva nem um minuto e me ajuda a validar a utilidade da aplicação!
            </p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSf6PH3dcB-D36GF431b2tpv-dVZgoYoTAarJ87LVvVGqXmz9w/viewform?usp=dialog" // Lembre-se de colocar o seu link aqui
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              Avaliar Projeto
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal de Feedback do PDF (mantido igual) */}
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
                Como este é um projeto acadêmico, sua avaliação é fundamental. Clique no link abaixo para responder um formulário rápido e o download será liberado.
              </p>

              <div className="mb-8 flex justify-center">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf6PH3dcB-D36GF431b2tpv-dVZgoYoTAarJ87LVvVGqXmz9w/viewform?usp=dialog" // E coloque o link aqui também
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasClickedForm(true)}
                  className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir Formulário de Avaliação
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <Button 
                  size="lg" 
                  disabled={!hasClickedForm} 
                  onClick={handleDownloadPDF}
                  className="relative w-full overflow-hidden transition-all"
                >
                  {hasClickedForm ? "Baixar meu PDF agora" : "Aguardando avaliação..."}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultDashboard;