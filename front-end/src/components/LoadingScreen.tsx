import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-8">
          <div className="h-16 w-16 rounded-full border-4 border-border" />
          <motion.div
            className="absolute inset-0 h-16 w-16 rounded-full border-4 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <Loader2 className="absolute inset-0 m-auto h-6 w-6 text-primary animate-pulse-soft" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-foreground">
          Nossa inteligência está analisando o seu perfil...
        </h2>
        <p className="text-muted-foreground">Isso leva só alguns segundos.</p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
