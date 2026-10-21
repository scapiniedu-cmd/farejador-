# Farejador: landing page

Landing page estática (HTML, CSS e JS puro, sem build) da **Farejador**: rastreamento veicular inteligente e gestão de frotas com atendimento humanizado, em Apucarana-PR. Atende carros, motos, caminhões e frotas, com foco em empresas de 3 a 100 veículos.

## Estrutura

```
index.html                  página única
assets/css/style.css        tokens de design (laranja/branco/preto) e estilos
assets/js/main.js           menu mobile, animações, máscara de telefone e envio do formulário via WhatsApp
assets/img/                 símbolo do lobo (SVG colorido, SVG branco para fundo escuro e o PDF original)
assets/img/instagram/       artes do Instagram otimizadas para a galeria
assets/img/fotos/           fotos reais (equipe na Exposec)
```

## Seções

Header fixo → Hero com mockup da plataforma → segmentos atendidos → gestão inteligente da frota → soluções (monitoramento 24h, bloqueio de emergência, localização, motoristas, histórico, roteirização, telemetria, videotelemetria) → tipos de veículo e planos a partir de R$ 59,90 → videotelemetria em destaque → telemetria e relatórios → atendimento humanizado → como funciona → app → FAQ → formulário de contato → rodapé + botão flutuante de WhatsApp.

## Antes de publicar

- **WhatsApp:** configurado com o número oficial (43) 9 9864-0294 em `WHATSAPP_NUMBER`, no arquivo `assets/js/main.js`.
- **Fotos:** a galeria usa 10 artes do Instagram em `assets/img/instagram/` (formato 4:5, 540 × 675 px). Os originais enviados ficam guardados na branch `fontes-instagram`. As demais imagens da página são ilustrações em SVG/CSS. Para usar fotos reais, coloque os arquivos em `assets/img/` e substitua os blocos `.dash`, `.cam` e `.phone`.
- **Domínio:** o texto `app.farejador.com.br` no mockup é ilustrativo.

## Domínio e formulário

- **Domínio:** `farejadorapo.com.br` (arquivo `CNAME`, `robots.txt`, `sitemap.xml` e metatags de compartilhamento já configurados).
- **Formulário:** cada pedido abre o WhatsApp com a mensagem pronta e também é enviado para **appfarejador@gmail.com** pelo [FormSubmit](https://formsubmit.co).
  No **primeiro envio**, o FormSubmit manda um e-mail de confirmação para appfarejador@gmail.com. É preciso clicar em **Activate Form** uma única vez para os pedidos começarem a chegar.
- **Imagem de compartilhamento:** `assets/img/og-farejador.jpg` (aparece quando o link é enviado no WhatsApp ou nas redes).

## Rodar localmente

Abra `index.html` no navegador ou rode `python3 -m http.server` e acesse http://localhost:8000.
Para publicar, sirva a pasta como site estático (GitHub Pages, Netlify, Vercel).
