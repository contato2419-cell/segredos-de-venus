---
description: Regras de Interface e UX para Lojas Virtuais (Padrão Ouro)
---

# Regras de Interface e UX

Este documento dita as regras globais a serem seguidas ao criar lojas virtuais, focado em alto padrão (joalherias, boutiques eróticas premium, etc).

1. **Evitar Elementos Nativos do Navegador:**
   - **NUNCA** usar prompt(), alert() ou confirm() nativos do navegador para interações de usuário.
   - Qualquer interação deve acontecer dentro da própria interface da loja (modais estilizados, overlays, sidebars, toast notifications).

2. **Ícones e Badges (Notificações):**
   - Ícones de cabeçalho (Carrinho/Sacola, Busca, WhatsApp) devem ser limpos, acompanhados apenas dos ícones, sem textos desnecessários.
   - O contador de itens da sacola deve ser um **badge flutuante** sobreposto no topo direito do ícone (ex: `position: absolute; top: -6px; right: -8px;`), nunca ficar empilhado embaixo ou ao lado quebrando o layout.

3. **Comportamento Mobile vs Desktop (Responsividade):**
   - **Grades de Produtos e Categorias:** No mobile, exibir **2 produtos por vez**; no PC, exibir **4 produtos por vez**. Em ambos, usar **carrossel horizontal nativo** (`overflow-x: auto; flex-wrap: nowrap; scrollbar-width: none`), permitindo deslizar para o lado.
   - Não esconder as funcionalidades principais no mobile.
   - O menu hamburguer (mobile) não deve ficar inoperante.

4. **Botões e Call to Actions (CTAs):**
   - Evitar botões "soltos" sobrepostos diretamente no meio das imagens de Hero Section, caso poluam a estética.
   - Se links só precisarem da iconografia, não use `<button>` sem resetar o estilo. Prefira `<button>` resetado (`background: none; border: none;`) ou tags `<a>`.

5. **Imagens de Produtos:**
   - Devem usar `object-fit: contain` em conteineres com fundo adequado (ou imagens com fundo transparente).
