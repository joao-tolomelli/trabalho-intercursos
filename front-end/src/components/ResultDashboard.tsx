import { motion } from "framer-motion";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultDashboardProps {
  category: string;
  onRestart: () => void;
}

const cards = [
  {
    icon: FileText,
    title: "Como abrir o CNPJ",
    text: "Acesse o Portal do Empreendedor (gov.br/mei) e faça o cadastro gratuitamente. O processo é 100% online e leva cerca de 15 minutos.",
  },
  {
    icon: Calculator,
    title: "Impostos Mensais (DAS)",
    text: "Como MEI, você paga um valor fixo mensal de aproximadamente R$ 70, que já inclui INSS, ISS e ICMS. Simples assim.",
  },
  {
    icon: Receipt,
    title: "Imposto de Renda",
    text: "O MEI deve fazer a declaração anual do DASN-SIMEI. Como pessoa física, precisa declarar o IR se ultrapassar o limite de rendimentos.",
  },
  {
    icon: Heart,
    title: "Benefícios",
    text: "Ao contribuir mensalmente, você garante aposentadoria, auxílio-doença e salário-maternidade pelo INSS.",
  },
  {
    icon: ScrollText,
    title: "Nota Fiscal",
    text: "Emitir nota fiscal abre portas para vender para empresas, participar de licitações e transmitir mais confiança ao cliente.",
  },
  {
    icon: ClipboardList,
    title: "Outros Deveres",
    text: "Preencha o relatório mensal de receitas e envie a Declaração Anual (DASN-SIMEI) até 31 de maio de cada ano.",
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

const ResultDashboard = ({ category, onRestart }: ResultDashboardProps) => {
  return (
    <div className="min-h-screen px-6 py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mb-2 text-3xl font-extrabold text-foreground md:text-4xl">
            Você se enquadra na categoria:{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {category}
            </span>
          </h1>
          <p className="text-muted-foreground">
            Veja abaixo tudo o que você precisa saber sobre seus direitos e deveres.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              className="rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-card-hover"
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

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button variant="outline" size="lg" onClick={onRestart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Refazer o teste
          </Button>
          <Button variant="secondary" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Baixar resumo em PDF
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultDashboard;
