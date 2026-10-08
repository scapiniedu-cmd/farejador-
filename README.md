# Farejador: landing page

Landing page estática (HTML, CSS e JS puro, sem build) do **Farejador**: rastreamento e gestão de frotas com atendimento humanizado para empresas de 3 a 100 veículos.

## Estrutura

```
index.html                  página única
assets/css/style.css        tokens de design (laranja/branco/preto) e estilos
assets/js/main.js           menu mobile, animações, máscara de telefone e envio do formulário via WhatsApp
assets/img/                 símbolo do lobo (SVG colorido, SVG branco para fundo escuro e o PDF original)
```

## Seções

Header fixo → Hero com mockup da plataforma → segmentos atendidos → por que rastrear → soluções (localização, motoristas, histórico, roteirização, telemetria, videotelemetria) → videotelemetria em destaque → telemetria e relatórios → atendimento humanizado → como funciona → app → FAQ → formulário de contato → rodapé + botão flutuante de WhatsApp.

## Antes de publicar

- **WhatsApp:** troque `WHATSAPP_NUMBER` em `assets/js/main.js` (DDI + DDD + número, só dígitos).
- **Fotos:** as imagens da página são ilustrações em SVG/CSS. Para usar fotos reais, coloque os arquivos em `assets/img/` e substitua os blocos `.dash`, `.cam` e `.phone`.
- **Domínio:** o texto `app.farejador.com.br` no mockup é ilustrativo.

## Rodar localmente

Abra `index.html` no navegador ou rode `python3 -m http.server` e acesse http://localhost:8000.
Para publicar, sirva a pasta como site estático (GitHub Pages, Netlify, Vercel).
