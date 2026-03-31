# Template Flask

É nesse diretório que você deve criar o ambiente virtual. Use o gerenciador de pacotes [uv](https://docs.astral.sh/uv/getting-started/installation/):

```
uv venv
. .venv/bin/activate
```

Sincronize pela primeira vez:

```
uv sync
```

Configure os hooks pre-commit:

```
uv run pre-commit install
```

Pronto. Pode começar a programar!

## O que é cada arquivo?

- `pyproject.toml`: arquivo de definição do projeto para gerência de dependências, configuração de scripts, etc.
- `.flake8`: arquivo de configuração do `flake`.
- `.flaskenv`: variáveis de configuração do `flask`.
- `.pre-commit-config.yaml`: arquivo de configuração dos hooks pre-commit.

## Estrutura de diretórios

- `migrations`: o diretório de migrações criado pelo `flask-migrate`, já vem com o modelo de usuário.
- `src`: onde fica o código-fonte.

## Por que `uv`?

- É mais rápido que o `pip`;
- Permite configuração de scripts customizados. Exemplo disso é o `uv run dev`.
