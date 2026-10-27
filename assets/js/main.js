// =========================================================
// Farejador — Landing page
// =========================================================

// WhatsApp oficial da Farejador (DDI + DDD + número, só dígitos).
const WHATSAPP_NUMBER = "5543998640294";
// E-mail que recebe os pedidos do formulário (via FormSubmit.co).
const LEAD_EMAIL = "appfarejador@gmail.com";
// URL do app da Web do Google Apps Script que grava os pedidos na planilha (CRM).
// Veja integracoes/google-sheets-leads.gs. Enquanto estiver vazia, a planilha não é usada.
const SHEETS_URL = "";
const WHATSAPP_DEFAULT_MSG = "Olá! Vim pelo site e quero conhecer as soluções de rastreamento da Farejador.";

const whatsUrl = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Links de WhatsApp
document.querySelectorAll(".js-whats").forEach((a) => {
  a.href = whatsUrl(WHATSAPP_DEFAULT_MSG);
  a.target = "_blank";
  a.rel = "noopener";
});

document.querySelectorAll(".js-whats-moto").forEach((a) => {
  a.href = whatsUrl("Olá! Vim pelo site e quero saber do plano para moto a partir de R$ 39,90 com bloqueio.");
  a.target = "_blank";
  a.rel = "noopener";
});

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Animação de entrada ao rolar
const revealTargets = document.querySelectorAll(
  ".section__head, .split > *, .card, .benefits li, .steps li, details, .chips, .report"
);
revealTargets.forEach((el) => el.classList.add("reveal"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-visible"));
}

// Máscara simples de telefone
const phone = document.querySelector('input[name="whatsapp"]');
phone.addEventListener("input", () => {
  const d = phone.value.replace(/\D/g, "").slice(0, 11);
  let out = d;
  if (d.length > 2) out = `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length > 7) out = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
  phone.value = out;
});

// Envia o pedido por e-mail. Não bloqueia o WhatsApp se falhar.
const sendLeadEmail = (d) =>
  fetch(`https://formsubmit.co/ajax/${LEAD_EMAIL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Novo pedido de cotação pelo site: ${d.nome}`,
      _template: "table",
      _captcha: "false",
      _honey: d._honey,
      Nome: d.nome,
      Empresa: d.empresa.trim() || "Não informado",
      WhatsApp: d.whatsapp,
      Veículos: d.veiculos,
      Interesse: d.interesse,
      Origem: "Site www.farejadorapp.com.br",
    }),
  });

// Grava o pedido na planilha do Google. O Apps Script não responde a CORS,
// então o envio é "no-cors" (não dá para ler a resposta).
const saveLeadSheet = (d) => {
  if (!SHEETS_URL) return;
  fetch(SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    body: new URLSearchParams({
      nome: d.nome,
      empresa: d.empresa,
      whatsapp: d.whatsapp,
      veiculos: d.veiculos,
      interesse: d.interesse,
      origem: "Site www.farejadorapp.com.br",
      _honey: d._honey,
    }),
  }).catch(() => {});
};

// Formulário: valida, envia por e-mail e planilha e abre o WhatsApp com a mensagem pronta
const form = document.getElementById("lead-form");
const note = form.querySelector(".form__note");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let ok = true;
  form.querySelectorAll("[required]").forEach((f) => {
    const invalid = !f.value.trim() || (f.name === "whatsapp" && f.value.replace(/\D/g, "").length < 10);
    f.classList.toggle("is-invalid", invalid);
    if (invalid) ok = false;
  });
  if (!ok) {
    note.textContent = "Preencha os campos destacados para continuar.";
    note.classList.add("is-error");
    return;
  }
  const d = Object.fromEntries(new FormData(form));
  const msg =
    `Olá! Quero solicitar uma cotação da Farejador.\n\n` +
    `Nome: ${d.nome}\n` +
    (d.empresa.trim() ? `Empresa: ${d.empresa}\n` : "") +
    `WhatsApp: ${d.whatsapp}\n` +
    `Frota: ${d.veiculos}\nInteresse: ${d.interesse}`;
  note.classList.remove("is-error");
  note.textContent = "Enviando seu pedido…";
  window.open(whatsUrl(msg), "_blank", "noopener");
  saveLeadSheet(d);
  sendLeadEmail(d)
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      note.textContent = "Pedido enviado! Também abrimos o WhatsApp para você falar com a gente.";
      form.reset();
    })
    .catch(() => {
      note.textContent = "Abrimos o WhatsApp para você enviar seu pedido.";
    });
});

document.getElementById("ano").textContent = new Date().getFullYear();
