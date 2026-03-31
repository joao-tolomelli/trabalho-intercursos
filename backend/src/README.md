# src

Aqui, fica todo o código-fonte. Nada além de código-fonte e arquivos auxiliares ao código-fonte deve ser colocado nesse diretório.

`app`:

```
src
└── app                     # É onde se define a aplicação Flask
    ├── controllers         # Controladores. É aqui que são definidas as rotas e onde serviços são usados para processar as requisições.
    ├── exceptions          # Exceções. Contém classes e funções para tratamento de erros e exceções personalizadas da aplicação.
    ├── hooks               # Hooks. Funções executadas automaticamente em momentos específicos do ciclo de vida da aplicação (ex: antes ou depois de requisições).
    ├── models              # Modelos. É onde são definidos os modelos do banco de dados.
    ├── repositories        # Repositórios. Classes que fazem acesso ao banco de dados.
    ├── schemas             # Esquemas. São classes usadas para transferência de dados tanto internamente à aplicação (entre funções e classes) quanto externamente (dados recebidos/enviados do/ao cliente).
    └── services            # Serviços. São usados por controladores e outros serviços, e lidam com lógicas de negócio. Acessam repositórios.
```

## Como estruturar o seu código

Isso é apenas um guia, sabemos que na prática pode ser necessário quebrar esse padrão. Mas é bom seguí-lo enquanto for possível porque ajuda a manter as coisas organizadas e bem separadas.

### Quem faz o que?

**RESUMINDO:**

- Controladores: tratamento de exceções.
- Serviços: lógica de negócio, chamadas de API, usam repositórios.
- Repositórios: acessam e manipulam o banco de dados.

Controladores recebem a requisição, repassam a um serviço que a processa e enviam as respostas.

Serviços lidam com lógicas de negócio. Podem fazer requisições a APIs externas e usar repositórios para acessar dados.

Repositórios acessam e manipulam o banco de dados, e nada mais. Podem incluir alguma lógica, mas é melhor manter a maioria na camada de serviços.

### Como lidar com erros

**RESUMINDO**: quem lida com exceções é a camada de Controle. Os controladores são quem deve determinar o que fazer frente a um erro.

Erros ou exceções devem acontecer nas camadas de serviço ou de acesso aos dados (repositórios). Quando isso acontecer, simplesmente propague a exceção até o controlador, e ele é quem deve lidar.
