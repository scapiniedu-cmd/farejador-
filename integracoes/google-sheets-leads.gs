/**
 * Farejador — recebe os pedidos do site e grava na planilha (CRM simples).
 *
 * Como usar:
 * 1. Na planilha do Google: Extensões > Apps Script, apague tudo e cole este código.
 * 2. Implantar > Nova implantação > App da Web.
 *    Executar como: Eu  |  Quem pode acessar: Qualquer pessoa.
 * 3. Copie a URL do app da Web e coloque em SHEETS_URL, no arquivo assets/js/main.js do site.
 */

const ABA = 'Leads';
const CABECALHO = ['Data', 'Nome', 'Empresa', 'WhatsApp', 'Veículos', 'Interesse', 'Origem', 'Status', 'Responsável', 'Observações'];
const STATUS = ['Novo', 'Em contato', 'Avaliação agendada', 'Proposta enviada', 'Fechado', 'Perdido'];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    if (p._honey) return resposta({ ok: true }); // robô de spam

    const aba = prepararAba();
    aba.appendRow([
      new Date(),
      limpar(p.nome),
      limpar(p.empresa),
      limpar(p.whatsapp),
      limpar(p.veiculos),
      limpar(p.interesse),
      limpar(p.origem),
      'Novo',
      '',
      '',
    ]);
    return resposta({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function prepararAba() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  const aba = planilha.getSheetByName(ABA) || planilha.insertSheet(ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(CABECALHO);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, CABECALHO.length)
      .setFontWeight('bold')
      .setBackground('#FF6A13')
      .setFontColor('#FFFFFF');
    aba.getRange('A2:A').setNumberFormat('dd/MM/yyyy HH:mm');
    aba.getRange('H2:H').setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).build()
    );
    aba.setColumnWidths(1, CABECALHO.length, 160);
  }
  return aba;
}

// Evita que um texto começando com = + - @ vire fórmula na planilha.
function limpar(valor) {
  const texto = String(valor || '').slice(0, 300).trim();
  return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
