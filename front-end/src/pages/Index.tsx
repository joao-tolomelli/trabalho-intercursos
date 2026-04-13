import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LandingScreen from "@/components/LandingScreen";
import WizardFlow from "@/components/WizardFlow";
import LoadingScreen from "@/components/LoadingScreen";
import ResultDashboard from "@/components/ResultDashboard";
import { submitToAI, type AnalysisPayload } from "@/api/analysis";
import { fetchCsrfToken } from "@/api/auth";

// Removemos o "loading" daqui, o React Query vai cuidar disso!
type Screen = "landing" | "wizard" | "result";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  // Agora guardamos o objeto completo de resposta da IA em vez de apenas a categoria
  const [aiResult, setAiResult] = useState<any>(null);

  useEffect(() => {
    fetchCsrfToken().catch((error) => {
      console.error("Erro ao buscar CSRF token:", error);
    });
  }, []);

  // Configuração da Mutation do React Query
  const mutation = useMutation({
    mutationFn: submitToAI,
    onSuccess: (data) => {
      // Quando a API responder com sucesso, guardamos os dados e mudamos a tela
      setAiResult(data);
      setScreen("result");
    },
    onError: (error) => {
      console.error("Erro ao analisar o perfil:", error);
      // Aqui você pode disparar um Toast (ex: react-hot-toast) avisando o usuário
      alert("Tivemos um problema de conexão. Por favor, tente novamente.");
    },
  });

  const handleStart = () => setScreen("wizard");

  // Recebe o payload completo do WizardFlow atualizado (com as 9 perguntas)
  const handleWizardComplete = (data: AnalysisPayload) => {
    // Dispara a requisição para o back-end
    mutation.mutate(data);
  };

  const handleRestart = () => {
    setScreen("landing");
    setAiResult(null);
    mutation.reset(); // Limpa o cache/estado dessa requisição no React Query
  };

  return (
    <>
      {screen === "landing" && <LandingScreen onStart={handleStart} />}

      {/* Mostra o Wizard apenas se não estiver carregando a requisição */}
      {screen === "wizard" && !mutation.isPending && (
        <WizardFlow onComplete={handleWizardComplete} />
      )}

      {/* O React Query controla a tela de Loading perfeitamente */}
      {mutation.isPending && <LoadingScreen />}

      {/* Passamos o objeto completo da IA para o Dashboard */}
      {screen === "result" && aiResult && (
        <ResultDashboard  category={"MEI  "} onRestart={handleRestart} />
      )}
    </>
  );
};

export default Index;;