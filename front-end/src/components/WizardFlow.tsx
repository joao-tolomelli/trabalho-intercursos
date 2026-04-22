import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WizardFlowProps {
  onComplete: (data: {
    activity: string;
    businessType: string;
    workLocation: string;
    worksAlone: string;
    numberOfPeople: string;
    fixedExpenses: string;
    issuesInvoices: string;
    invoiceDoubts: string;
    hasOtherCompany: string;
    hasBenefitsOrCLT: string;
    income: string;
  }) => void;
}

const incomeOptions = [
  "Até R$ 3.000",
  "Entre R$ 3.000 e R$ 6.750",
  "Entre R$ 6.750 e R$ 15.000",
  "Acima de R$ 15.000",
  "Ainda não tenho renda fixa",
];

const WizardFlow = ({ onComplete }: WizardFlowProps) => {
  const [step, setStep] = useState(0);
  
  // States
  const [activity, setActivity] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [worksAlone, setWorksAlone] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [fixedExpenses, setFixedExpenses] = useState("");
  const [issuesInvoices, setIssuesInvoices] = useState("");
  const [invoiceDoubts, setInvoiceDoubts] = useState("");
  const [hasOtherCompany, setHasOtherCompany] = useState("");
  const [hasBenefitsOrCLT, setHasBenefitsOrCLT] = useState("");
  const [income, setIncome] = useState("");

  const totalSteps = 9;

  const handleNext = () => {
    if (step === 0 && activity.trim()) setStep(1);
    else if (step === 1 && businessType) setStep(2);
    else if (step === 2 && workLocation) setStep(3);
    else if (step === 3 && worksAlone) setStep(4);
    else if (step === 4 && fixedExpenses) setStep(5);
    else if (step === 5 && issuesInvoices) setStep(6);
    else if (step === 6 && hasOtherCompany) setStep(7);
    else if (step === 7 && hasBenefitsOrCLT) setStep(8);
  };

  const handleSelectIncome = (option: string) => {
    setIncome(option);
    setTimeout(() => {
      onComplete({ 
        activity, 
        businessType,
        workLocation,
        worksAlone, 
        numberOfPeople,
        fixedExpenses,
        issuesInvoices,
        invoiceDoubts,
        hasOtherCompany,
        hasBenefitsOrCLT,
        income: option 
      });
    }, 400);
  };

  const slideVariants = {
    enter: { opacity: 0, x: 60 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -60 },
  };

  // Classe utilitária para os botões de opção não vazarem no mobile
  const choiceButtonClasses = "h-auto justify-start text-left whitespace-normal py-4 px-5";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-10 flex gap-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 0: Atividade */}
          {step === 0 && (
            <motion.div
              key="step0"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <p className="mb-2 text-sm font-medium text-muted-foreground">
                Passo {step + 1} de {totalSteps}
              </p>
              <h2 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
                Me conte com as suas palavras: o que você faz no dia a dia para gerar renda?
              </h2>
              <textarea
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Ex: Faço bolos por encomenda, vendo roupas online, trabalho como eletricista..."
                className="mb-6 h-36 w-full resize-none rounded-xl border-2 border-border bg-card p-4 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Button
                variant="hero"
                size="lg"
                onClick={handleNext}
                disabled={!activity.trim()}
                className="w-full sm:w-auto"
              >
                Avançar
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 1: Tipo de Negócio */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(0)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">O que você oferece aos seus clientes?</h2>
              <div className="flex flex-col gap-3">
                {["Vendo Produtos (físicos ou digitais)", "Presto Serviços", "Faço os dois"].map((option) => (
                  <Button key={option} variant={businessType === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => setBusinessType(option)}>
                    {option}
                  </Button>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!businessType} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 2: Local de Trabalho */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(1)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">De onde você trabalha a maior parte do tempo?</h2>
              <div className="flex flex-col gap-3">
                {["De casa (Home Office)", "Ponto comercial alugado ou próprio", "Na rua ou vou até os clientes", "100% pela Internet"].map((option) => (
                  <Button key={option} variant={workLocation === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => setWorkLocation(option)}>
                    {option}
                  </Button>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!workLocation} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 3: Equipe ou Conta Própria? */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(2)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Você tem equipe ou trabalha por conta própria?</h2>
              <div className="flex flex-col gap-3">
                {[
                  "Trabalho por conta própria (sozinho)",
                  "Tenho equipe fixa",
                  "Trabalho com parceiros ocasionalmente"
                ].map((option) => (
                  <Button 
                    key={option} 
                    variant={worksAlone === option ? "choiceSelected" : "choice"} 
                    size="lg" 
                    className={choiceButtonClasses} 
                    onClick={() => {
                      setWorksAlone(option);
                      // Limpa o número de pessoas se a opção não for "equipe fixa"
                      if (option !== "Tenho equipe fixa") {
                        setNumberOfPeople("");
                      }
                    }}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              
              {/* Só exibe o input de quantidade se a pessoa tiver equipe fixa */}
              {worksAlone === "Tenho equipe fixa" && (
                <div className="mt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground md:text-2xl">Trabalha com quantas pessoas?</h3>
                  <input 
                    type="number" 
                    value={numberOfPeople} 
                    onChange={(e) => setNumberOfPeople(e.target.value)} 
                    placeholder="Ex: 2" 
                    className="h-12 w-full resize-none rounded-xl border-2 border-border bg-card p-4 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
                  />
                </div>
              )}
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!worksAlone} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 4: Gastos Fixos */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(3)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Você tem gastos fixos mensais com o negócio?</h2>
              <p className="mb-6 text-muted-foreground">Conta de água, luz, aluguel de espaço, internet exclusiva para o trabalho, etc.</p>
              <div className="flex flex-col gap-3">
                {["Sim", "Não"].map((option) => (
                  <Button key={option} variant={fixedExpenses === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => setFixedExpenses(option)}>
                    {option}
                  </Button>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!fixedExpenses} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 5: Nota Fiscal */}
          {step === 5 && (
            <motion.div
              key="step5"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(4)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Você já emite Nota Fiscal para os seus clientes?</h2>
              <div className="flex flex-col gap-3">
                {["Sim", "Não"].map((option) => (
                  <Button key={option} variant={issuesInvoices === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => setIssuesInvoices(option)}>
                    {option}
                  </Button>
                ))}
              </div>
              {issuesInvoices === "Sim" && (
                <div className="mt-6">
                  <h3 className="mb-4 text-xl font-bold text-foreground md:text-2xl">Você tem alguma dúvida ou dificuldade com isso hoje?</h3>
                  <textarea value={invoiceDoubts} onChange={(e) => setInvoiceDoubts(e.target.value)} placeholder="Ex: Não entendo as alíquotas, o sistema da prefeitura é ruim..." className="h-24 w-full resize-none rounded-xl border-2 border-border bg-card p-4 text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
              )}
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!issuesInvoices} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 6: Outras Empresas */}
          {step === 6 && (
            <motion.div
              key="step6"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(5)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Você já tem alguma empresa no seu nome ou é sócio de algum negócio?</h2>
              <div className="flex flex-col gap-3">
                {["Sim, já tenho um CNPJ ou sou sócio", "Não, este será meu primeiro negócio formal"].map((option) => (
                  <Button key={option} variant={hasOtherCompany === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => setHasOtherCompany(option)}>
                    {option}
                  </Button>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!hasOtherCompany} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 7: Vínculos e Benefícios */}
          {step === 7 && (
            <motion.div
              key="step7"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(6)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Você tem algum vínculo formal ou recebe algum benefício?</h2>
              <div className="flex flex-col gap-3">
                {[
                  "Não, trabalho apenas por conta própria",
                  "Tenho carteira assinada (CLT)",
                  "Sou Servidor Público",
                  "Recebo benefício (Seguro-desemprego, auxílio, etc)"
                ].map((option) => (
                  <Button key={option} variant={hasBenefitsOrCLT === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => setHasBenefitsOrCLT(option)}>
                    {option}
                  </Button>
                ))}
              </div>
              <Button variant="hero" size="lg" onClick={handleNext} disabled={!hasBenefitsOrCLT} className="mt-6 w-full sm:w-auto">
                Avançar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* STEP 8: Renda */}
          {step === 8 && (
            <motion.div
              key="step8"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35 }}
            >
              <button onClick={() => setStep(7)} className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Voltar
              </button>
              <p className="mb-2 text-sm font-medium text-muted-foreground">Passo {step + 1} de {totalSteps}</p>
              <h2 className="mb-8 text-2xl font-bold text-foreground md:text-3xl">Mais ou menos, quanto você ganha por mês com isso?</h2>
              <div className="flex flex-col gap-3">
                {incomeOptions.map((option) => (
                  <Button key={option} variant={income === option ? "choiceSelected" : "choice"} size="lg" className={choiceButtonClasses} onClick={() => handleSelectIncome(option)}>
                    {option}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WizardFlow;