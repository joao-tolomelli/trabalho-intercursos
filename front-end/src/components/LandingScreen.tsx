import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen = ({ onStart }: LandingScreenProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-lg"
      >
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
          <Sparkles className="h-8 w-8 text-accent" />
        </div>

        <h1 className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
          Saia da informalidade de um jeito{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            fácil.
          </span>
        </h1>

        <p className="mb-10 text-lg text-muted-foreground">
          Nossa inteligência analisa o seu perfil em 2 minutos e te mostra o
          melhor caminho para se formalizar — sem burocracia, sem jargões.
        </p>

        <Button variant="hero" size="xl" onClick={onStart}>
          Descobrir minha categoria
          <ArrowRight className="ml-1 h-5 w-5" />
        </Button>
      </motion.div>
    </div>
  );
};

export default LandingScreen;
