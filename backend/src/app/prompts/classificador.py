class ClassificadorPrompts:
    @staticmethod
    def classificar(data: dict) -> str:
        atividade_principal = data.get("atividade_principal", "")
        trabalha_sozinho = data.get("trabalha_sozinho", "")
        numero_funcionarios = data.get("numero_funcionarios", "")

        prompt = (
            f"Classifique a empresa com base nas seguintes informações:\n"
            f"- Atividade Principal: {atividade_principal}\n"
            f"- Trabalha Sozinho: {trabalha_sozinho}\n"
            f"- Número de Funcionários: {numero_funcionarios}\n\n"
            "Classifique a empresa como 'Microempresa', "
            "'Pequena Empresa', 'Média Empresa' ou 'Grande Empresa'."
        )
        return prompt
