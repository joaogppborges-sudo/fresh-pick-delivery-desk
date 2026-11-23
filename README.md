# Horta Delivery

PROJETO HORTA DELIVERY — VERSÃO v1.0.0
ETAPA 01 — CRIAÇÃO DO PROJETO E FUNDAÇÃO VISUAL

Crie um novo projeto chamado "Horta Delivery". Este é o início de um software real de gestão de vendas e entregas de verduras, legumes e hortaliças.

CONTEXTO OPERACIONAL
- 150 a 300 clientes cadastrados.
- 20 a 50 pedidos por semana.
- Pedidos pelo site e, futuramente, WhatsApp.
- Vendas abrem na segunda-feira e encerram na sexta-feira (horário configurável).
- Entregas aos sábados.
- O próprio administrador realiza as entregas.
- Pagamentos aceitos: Pix, dinheiro e cartão.
- Acesso dos clientes planejado por telefone e código de confirmação.
- Interface em português do Brasil, moeda BRL e fuso horário America/Sao_Paulo.

OBJETIVO DESTA ETAPA
Entregar a fundação visual e estrutural do painel administrativo, responsiva e preparada para receber os módulos reais nas próximas etapas. Não implemente ainda banco de dados, autenticação real, WhatsApp, GPS, checkout ou integrações externas. Não invente dados de negócio nem apresente números fictícios como reais.

IDENTIDADE VISUAL
- SaaS moderno, profissional, limpo e acolhedor.
- Verde escuro como cor principal, verdes naturais como apoio, fundos claros e neutros.
- Tipografia legível, bom contraste, ícones consistentes e componentes reutilizáveis.
- Aparência profissional, sem excesso de elementos decorativos.

RESPONSIVIDADE
- Desktop: navegação lateral e área de conteúdo ampla.
- Tablet e celular: navegação adaptada, tabelas convertidas em listas/cartões quando necessário, botões acessíveis e formulários confortáveis.
- Priorizar uso real em celular.

ESTRUTURA DO PAINEL
Criar layout administrativo com:
1. Dashboard
2. Pedidos
3. Clientes
4. Produtos e estoque
5. Separação de pedidos
6. Entregas e GPS
7. Financeiro e caixa
8. Relatórios
9. WhatsApp e notificações
10. Usuários e permissões
11. Calendário de vendas
12. Configurações

ENTREGA VISUAL
- Dashboard com cards em estado vazio/sem dados conectados, sem métricas inventadas.
- Atalhos visuais para criar pedido, cadastrar cliente e produto.
- Próximo ciclo de vendas e próxima entrega apresentados como estados não configurados, sem presumir datas.
- Telas iniciais de cada módulo com estados vazios úteis e chamadas claras para ação.
- Componentes de formulário, tabela, filtros, badges de status e diálogos reutilizáveis.
- Navegação funcional entre as páginas.
- Não criar botões que aparentem funcionar sem ação; se ainda não implementados, indicar claramente "Em desenvolvimento" ou manter desabilitados.

VERSIONAMENTO OBRIGATÓRIO
- Esta entrega é a versão v1.0.0.
- Criar docs/CHANGELOG.md com registro da versão.
- Criar docs/versions/v1.0.0.md descrevendo escopo, páginas criadas, decisões e itens ainda não implementados.
- Adotar padrão SemVer: MAJOR.MINOR.PATCH.
- Incremento MINOR para funcionalidades compatíveis novas; PATCH para correções; MAJOR para mudanças incompatíveis.
- Antes de cada alteração futura, registrar a mudança planejada e a versão de destino.
- Preservar histórico e não sobrescrever documentação de versões anteriores.
- Preparar o projeto para integração com GitHub/versionamento de código; não afirmar que GitHub está conectado se não estiver.

QUALIDADE
- React + TypeScript + Tailwind e componentes acessíveis.
- Código modular, organizado e reutilizável.
- Evitar duplicação.
- Não adicionar dependências desnecessárias.
- Não inserir segredos no frontend.
- Não criar dados falsos como se fossem registros reais.
- Não modificar nem apagar arquivos sem necessidade.

AO CONCLUIR
Informe objetivamente:
1. O que foi criado.
2. Rotas/páginas disponíveis.
3. Arquivos de versionamento criados.
4. O que ainda não está conectado ou funcional.
5. Próxima etapa recomendada: revisar a interface e depois planejar/implementar Supabase, schema e RLS como v1.1.0.
Não avance para a próxima etapa sem solicitação.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://fresh-pick-delivery-desk.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0971aec4-bd57-4d46-a82f-1a2e4d96fcb3).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
