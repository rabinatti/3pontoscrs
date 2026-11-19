# 🏢 Três Pontos CRS

> \*\*Contexto Acadêmico:\*\* Documentação oficial do sistema modelada em UML 2.5.1 para a disciplina de Análise e Desenvolvimento de Sistemas.  
> \*\*Escopo:\*\* Conecta clientes (contratantes) a prestadores de serviços de manutenção e conservação predial (residencial e comercial), realizando a intermediação até o início do contato direto.

\---

## 📑 Sumário

1. [Visão Geral e Escopo](#1-visão-geral-e-escopo)
2. [Atores do Sistema](#2-atores-do-sistema)
3. [Requisitos Funcionais (RF)](#3-requisitos-funcionais-rf)
4. [Requisitos Não Funcionais (RNF) e Regras de Negócio (RN)](#4-requisitos-não-funcionais-rnf-e-regras-de-negócio-rn)
5. [Casos de Uso](#5-casos-de-uso)
6. [Modelo de Domínio (Arquitetura de Classes)](#6-modelo-de-domínio-arquitetura-de-classes)
7. [Pontos em Aberto / Decisões de Projeto](#7-pontos-em-aberto--decisões-de-projeto)

\---

## 1\. Visão Geral e Escopo

O aplicativo tem como objetivo principal aproximar usuários que necessitam de serviços de conservação e manutenção predial de profissionais qualificados.

* **O que entra no escopo:** Cadastro e autenticação de usuários, busca de prestadores, exibição de páginas de perfil, sistema de avaliações obrigatórias, planos pagos de assinatura para prestadores e espaços publicitários.
* **O que fica de fora:** A negociação direta, o agendamento formal e o pagamento do serviço em si ocorrem externamente ao aplicativo.

\---

## 2\. Atores do Sistema

O sistema contempla atores humanos e sistemas externos integrados:

|Ator|Tipo|Descrição|
|-|-|-|
|**Visitante**|Humano|Usuário que abriu o app e ainda não possui cadastro/login.|
|**Usuário (Contratante)**|Humano|Conta cadastrada que busca prestadores e avalia atendimentos.|
|**Prestador**|Humano|Usuário que anunciou serviços e possui um plano mensal ativo (herda as características de Usuário).|
|**Administrador**|Humano|Equipe de gestão do app: modera avaliações, gerencia contas e controla anúncios.|
|**Anunciante Externo**|Humano|Agente contratante de espaço publicitário no app.|
|**Serviço de Validação**|Sistema Externo|Envia códigos de validação via SMS/e-mail no cadastro e recuperação de senha.|
|**Meio de Pagamento**|Sistema Externo|Realiza a cobrança de pacotes e mensalidades, confirmando os pagamentos.|

\---

## 3\. Requisitos Funcionais (RF)

|ID|Módulo|Requisito|Prioridade|
|-|-|-|-|
|**RF01**|Cadastro|Permitir cadastro de Visitante informando dados pessoais, residenciais e de contato.|Alta|
|**RF02**|Cadastro|Exigir leitura e aceite das políticas de utilização antes de concluir o cadastro.|Alta|
|**RF03**|Cadastro|Enviar código de validação e ativar a conta somente após a confirmação.|Alta|
|**RF04**|Acesso|Autenticar o Usuário por login e senha, liberando a página de busca.|Alta|
|**RF05**|Acesso|Permitir recuperar a senha por código enviado ao contato cadastrado.|Média|
|**RF06**|Busca|Permitir busca de prestadores por palavra-chave.|Alta|
|**RF07**|Busca|Permitir consultar a lista completa de prestadores cadastrados.|Alta|
|**RF08**|Busca|Permitir buscar prestadores por categoria de serviço.|Média|
|**RF09**|Prestador|Exibir página do prestador com logotipo, informações, fotos e avaliações.|Alta|
|**RF10**|Prestador|Mostrar meios de contato do prestador para comunicação direta fora do app.|Alta|
|**RF11**|Solicitação|Registrar que o Usuário iniciou contato com um prestador (solicitação).|Alta|
|**RF12**|Avaliação|Exigir que o Usuário avalie o prestador ao final de uma solicitação.|Alta|
|**RF13**|Avaliação|Calcular automaticamente a nota média de cada prestador.|Média|
|**RF14**|Avaliação|Bloquear o Usuário que deixar de registrar a avaliação devida.|Média|
|**RF15**|Prestador|Permitir que um Usuário logado cadastre-se também como Prestador.|Alta|
|**RF16**|Planos|Exibir os pacotes disponíveis (Básico, Plus e Premium).|Alta|
|**RF17**|Planos|Contratar pacote automaticamente via meio de pagamento e ativar assinatura.|Alta|
|**RF18**|Planos|Registrar pagamentos mensais e suspender assinaturas de inadimplentes.|Média|
|**RF19**|Prestador|Permitir edição de logotipo, fotos e informações da página pelo Prestador.|Alta|
|**RF20**|Publicidade|Exibir anúncios segmentados de agentes externos.|Baixa|
|**RF21**|Administração|Permitir moderação de avaliações, bloqueio/desbloqueio de contas e gestão de anúncios.|Média|

\---

## 4\. Requisitos Não Funcionais (RNF) e Regras de Negócio (RN)

### Requisitos Não Funcionais

* **RNF01 (Segurança):** Senhas devem ser armazenadas obrigatoriamente utilizando funções de hash criptográfico.
* **RNF02 (Privacidade):** Conformidade estrita com a LGPD para dados pessoais e residenciais.
* **RNF03 (Usabilidade):** O fluxo de cadastro deve ser simplificado e focado em dados essenciais.
* **RNF04 (Desempenho):** Resposta de busca em até 2 segundos em condições normais de uso.
* **RNF05 (Disponibilidade):** Sistema operacional 24/7, com janelas de manutenção comunicadas previamente.
* **RNF06 (Portabilidade):** Compatibilidade inicial com plataformas Android e iOS.

### Regras de Negócio

* **RN01:** Existe apenas uma conta por pessoa; o Prestador é um Usuário com papel adicional, sem duplicidade de cadastro.
* **RN02:** O cadastro é efetivado somente após o aceite das políticas e validação do código por SMS/e-mail.
* **RN03:** O contato e a prestação do serviço ocorrem estritamente fora do ambiente do aplicativo.
* **RN04:** Toda solicitação encerrada exige avaliação obrigatória do contratante (sujeito a bloqueio em caso de omissão).
* **RN05:** O Prestador deve manter um pacote ativo (Básico, Plus ou Premium) mediante pagamento mensal.
* **RN06:** A ativação de pacotes ocorre de forma automatizada mediante confirmação do gateway de pagamento.
* **RN07:** Anúncios externos devem estar obrigatoriamente vinculados ao nicho de atuação do aplicativo.
* **RN08 \& RN09:** A listagem de prestadores exibe apenas profissionais disponíveis, ordenados alfabeticamente por nome.

\---

## 5\. Casos de Uso (Resumo do Diagrama)

O sistema conta com 15 Casos de Uso principais mapeados:

* **UC01 a UC03:** Cadastro, Validação por Código e Autenticação no App.
* **UC04 a UC06:** Busca de Prestadores, Consulta de Páginas e Contato Direto.
* **UC07:** Avaliação de Prestadores.
* **UC08 a UC11:** Cadastro como Prestador, Contratação de Pacotes, Gestão de Página e Pagamento de Mensalidades.
* **UC12 a UC14:** Visualização de Anúncios, Gestão de Anúncios e Moderação Administrativa.
* **UC15:** Recuperação de Senha.

\---

## 6\. Modelo de Domínio (Arquitetura de Classes)

O modelo conceitual divide-se em dois núcleos principais:

1. **Núcleo de Atendimento:** Envolve as classes `Usuário`, `Prestador` (herança), `Endereço`, `CódigoValidação`, `CategoriaServiço`, `FotoServiço`, `Solicitação` e `Avaliação`.
2. **Núcleo de Monetização e Publicidade:** Composto por `Pacote`, `Assinatura`, `Pagamento`, `Anunciante` e `Anúncio`.

\---

## 7\. Pontos em Aberto / Decisões Pendentes com o Professor

> \*Estes tópicos estão mapeados para validação contínua com as orientações da disciplina:\*

1. **Confirmação de Solicitação:** Como o app detecta o fim do contato externo para exigir a avaliação (ex: clique no botão de WhatsApp vs. confirmação manual)?
2. **Endereços Múltiplos:** Suporte a um ou múltiplos endereços por usuário (atendimento residencial e comercial).
3. **Prazos de Bloqueio:** Definição exata do tempo limite tolerado para avaliação antes do bloqueio automático da conta.
4. **Diferenciais dos Pacotes:** Atributos específicos que diferenciam os planos Básico, Plus e Premium (ex: destaque na busca, limite de fotos).
