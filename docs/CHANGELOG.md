# Changelog — Horta Delivery

Todas as mudanças relevantes do projeto são registradas aqui.
O projeto segue [Versionamento Semântico](https://semver.org/lang/pt-BR/) — veja `docs/VERSIONING.md`.
Detalhes de cada versão ficam em `docs/versions/`.

## [Não lançado]

### Planejado — v1.1.0
- Login administrativo real por e-mail e senha, sessão persistente, proteção das páginas administrativas, saída e recuperação de senha, sem cadastro público nem credenciais fixas.
- Provisionamento seguro e documentado do primeiro administrador, com permissões separadas dos dados de perfil.
- Clientes persistentes: criar, listar, buscar, editar e desativar, com os campos atuais, telefone único e políticas RLS.
- Ativação do Lovable Cloud e alterações de schema pelo Lovable, condicionadas às aprovações necessárias; preservar pt-BR, visual atual e futuro acesso de clientes por telefone e código.
- Verificar testes, compilação e comportamento essencial; registrar a versão compatível sem alterar v1.0.0 e sem publicar o aplicativo.

## [1.0.0] — 2026-11-23

Etapa 01 — Criação do projeto e fundação visual. Detalhes: [`docs/versions/v1.0.0.md`](versions/v1.0.0.md).

### Adicionado
- Identidade visual (verde escuro, verdes naturais, fundos claros) com tokens de cor, tipografia e superfícies.
- Layout administrativo responsivo: menu lateral recolhível no desktop, menu deslizante e barra inferior no celular.
- 12 telas iniciais com estados vazios: Dashboard, Pedidos, Clientes, Produtos e estoque, Separação de pedidos, Entregas e GPS, Financeiro e caixa, Relatórios, WhatsApp e notificações, Usuários e permissões, Calendário de vendas e Configurações.
- Componentes reutilizáveis: cabeçalho de página, estado vazio, card de indicador, tabela responsiva (cartões no celular), barra de filtros, campo de formulário, diálogo de formulário, diálogo de confirmação, badges de status e aviso "Em desenvolvimento".
- Formulários de pré-visualização para pedido, cliente e produto (sem salvar).
- Padrões regionais: pt-BR, BRL e America/Sao_Paulo.
- Testes de rotas dos módulos e de formatação de moeda/fuso horário.
