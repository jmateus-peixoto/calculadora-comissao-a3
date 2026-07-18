"use strict";

// Percentuais transcritos do mapa de comissionamento fornecido.
// A configuração de 5% ou 15% afeta somente os produtos cujo percentual
// original da promotora é 5%. Produtos com 0% permanecem em 0%.
const products = [
  { description: "Bilhete Nacional", code: "BILN", category: "Nacional", classification: "Bilhete", issuerRate: 6, promoterOriginalRate: 0 },
  { description: "Bilhete Internacional", code: "BILI", category: "Internacional", classification: "Bilhete", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Bilhete TAP", code: "BILP", category: "Internacional", classification: "Bilhete", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Bilhete Nacional EMP", code: "BLE", category: "Nacional", classification: "Bilhete", issuerRate: 13, promoterOriginalRate: 0 },
  { description: "Reembolso Bilhete Nacional", code: "BIRN", category: "Nacional", classification: "Bilhete", issuerRate: 7, promoterOriginalRate: 5 },
  { description: "Reembolso Bilhete Internacional", code: "BIRI", category: "Internacional", classification: "Bilhete", issuerRate: 8, promoterOriginalRate: 0 },
  { description: "Reembolso Bilhete TAP", code: "TRTP", category: "Internacional", classification: "Bilhete", issuerRate: 8, promoterOriginalRate: 0 },
  { description: "Marcação de Assento Criança TAP", code: "MACH", category: "Internacional", classification: "Bilhete", issuerRate: 40, promoterOriginalRate: 0 },
  { description: "Marcação de Assento Internacional", code: "MASI", category: "Internacional", classification: "Bilhete", issuerRate: 40, promoterOriginalRate: 0 },
  { description: "Outras Taxas de Serviços TAP", code: "OXTP", category: "Internacional", classification: "Diversos", issuerRate: 40, promoterOriginalRate: 0 },
  { description: "Hotel Nacional", code: "HOTN", category: "Nacional", classification: "Hotelaria", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Hotel Nacional com a Receber", code: "HNCR", category: "Nacional", classification: "Hotelaria", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Hotel Inter", code: "THI", category: "Internacional", classification: "Hotelaria", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Hotel Inter com a Receber", code: "HICR", category: "Internacional", classification: "Hotelaria", issuerRate: 10, promoterOriginalRate: 0 },
  { description: "Pacote Terrestre Nacional", code: "PCTN", category: "Nacional", classification: "Pacote", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Pacote Terrestre Internacional", code: "PCTI", category: "Internacional", classification: "Pacote", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Comissão a Receber Nacional", code: "COMN", category: "Nacional", classification: "Pacote", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Comissão Inter", code: "COMI", category: "Internacional", classification: "Pacote", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Carro Nacional", code: "LOCN", category: "Nacional", classification: "Locação", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Carro Nacional Comissão a Receber", code: "LNCR", category: "Nacional", classification: "Locação", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Carro Internacional", code: "LOCI", category: "Internacional", classification: "Locação", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Multa e Avarias Locação", code: "MLOC", category: "Nacional", classification: "Locação", issuerRate: 6, promoterOriginalRate: 5 },
  { description: "Assistência Conforto Nacional", code: "ACON", category: "Nacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Assistência Conforto Internacional", code: "ASI", category: "Internacional", classification: "Bilhete", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Seguro Nacional", code: "SEGN", category: "Nacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Seguro Internacional", code: "SEGI", category: "Internacional", classification: "Diversos", issuerRate: 12, promoterOriginalRate: 5 },
  { description: "Seguro Inter JMJ", code: "SJMJ", category: "Internacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 0 },
  { description: "Cruzeiro Nacional", code: "CNAC", category: "Nacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Cruzeiro Internacional", code: "CINT", category: "Internacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Transfer", code: "TRAN", category: "Nacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Inscrição em Eventos", code: "IEVE", category: "Internacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Evento", code: "EVEN", category: "Nacional", classification: "Diversos", issuerRate: 8, promoterOriginalRate: 5 },
  { description: "Fretamento", code: "FRET", category: "Nacional", classification: "Diversos", issuerRate: 6, promoterOriginalRate: 5 },
  { description: "Rodoviário Nacional", code: "RODN", category: "Nacional", classification: "Rodoviário", issuerRate: 10, promoterOriginalRate: 0 },
  { description: "Rodoviário Internacional", code: "RODI", category: "Internacional", classification: "Rodoviário", issuerRate: 10, promoterOriginalRate: 5 },
  { description: "Taxa Bloqueio JMJ", code: "TBLO", category: "Internacional", classification: "Diversos", issuerRate: 10, promoterOriginalRate: 0 },
  { description: "Visto", code: "VIST", category: "Internacional", classification: "Diversos", issuerRate: 50, promoterOriginalRate: 0 },
  { description: "RAV Internacional", code: "RAV", category: "Internacional", classification: "Diversos", issuerRate: 8, promoterOriginalRate: 5 }
];

const state = {
  role: "promotor",
  promoterRate: 15,
  sales: [],
  editingId: null
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const numberFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const inputNumberFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const elements = {
  startCalculator: document.querySelector("#startCalculator"),
  calculatorArea: document.querySelector("#calculatorArea"),
  roleInputs: [...document.querySelectorAll('input[name="role"]')],
  promoterRateInputs: [...document.querySelectorAll('input[name="promoterRate"]')],
  roleHelp: document.querySelector("#roleHelp"),
  saleForm: document.querySelector("#saleForm"),
  saleFormTitle: document.querySelector("#saleFormTitle"),
  saleValue: document.querySelector("#saleValue"),
  saleValueControl: document.querySelector(".currency-control"),
  saleValueError: document.querySelector("#saleValueError"),
  saleType: document.querySelector("#saleType"),
  currentProductName: document.querySelector("#currentProductName"),
  currentProductMeta: document.querySelector("#currentProductMeta"),
  currentProductRate: document.querySelector("#currentProductRate"),
  submitSaleButton: document.querySelector("#submitSaleButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  clearFormButton: document.querySelector("#clearFormButton"),
  summaryRuleLabel: document.querySelector("#summaryRuleLabel"),
  summaryCount: document.querySelector("#summaryCount"),
  totalCommission: document.querySelector("#totalCommission"),
  totalCaption: document.querySelector("#totalCaption"),
  totalSalesValue: document.querySelector("#totalSalesValue"),
  averageRate: document.querySelector("#averageRate"),
  totalIssuer: document.querySelector("#totalIssuer"),
  totalPromoter: document.querySelector("#totalPromoter"),
  copySummaryButton: document.querySelector("#copySummaryButton"),
  clearAllButton: document.querySelector("#clearAllButton"),
  listTotal: document.querySelector("#listTotal"),
  emptyState: document.querySelector("#emptyState"),
  salesList: document.querySelector("#salesList"),
  rateSearch: document.querySelector("#rateSearch"),
  rateTableBody: document.querySelector("#rateTableBody"),
  emptyTableMessage: document.querySelector("#emptyTableMessage"),
  toast: document.querySelector("#toast")
};

let toastTimer;

function formatCurrency(value) {
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatRate(value) {
  return `${numberFormatter.format(Number.isFinite(value) ? value : 0)}%`;
}

function normalizeSearch(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function parseCurrency(value) {
  if (!value || typeof value !== "string") return 0;

  let sanitized = value
    .trim()
    .replace(/R\$/gi, "")
    .replace(/\s/g, "")
    .replace(/[^0-9,.-]/g, "")
    .replace(/-/g, "");

  if (!sanitized) return 0;

  const commaCount = (sanitized.match(/,/g) || []).length;
  const dotCount = (sanitized.match(/\./g) || []).length;
  const lastComma = sanitized.lastIndexOf(",");
  const lastDot = sanitized.lastIndexOf(".");

  if (commaCount > 0 && dotCount > 0) {
    if (lastComma > lastDot) {
      sanitized = sanitized.replace(/\./g, "").replace(/,/g, ".");
    } else {
      sanitized = sanitized.replace(/,/g, "");
    }
  } else if (commaCount > 0) {
    const parts = sanitized.split(",");
    const decimalPart = parts.pop() || "";
    sanitized = `${parts.join("")}.${decimalPart}`;
  } else if (dotCount > 0) {
    const parts = sanitized.split(".");
    const lastPart = parts[parts.length - 1] || "";
    const looksLikeThousands = lastPart.length === 3 && parts.slice(1).every((part) => part.length === 3);

    if (looksLikeThousands) {
      sanitized = parts.join("");
    } else {
      const decimalPart = parts.pop() || "";
      sanitized = `${parts.join("")}.${decimalPart}`;
    }
  }

  const parsed = Number.parseFloat(sanitized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function getProduct(code) {
  return products.find((product) => product.code === code) || products.find((product) => product.code === "BILI") || products[0];
}

function getPromoterRate(product) {
  return product.promoterOriginalRate === 5
    ? state.promoterRate
    : product.promoterOriginalRate;
}

function getSelectedRate(product) {
  const promoterRate = getPromoterRate(product);

  if (state.role === "emissor") return product.issuerRate;
  if (state.role === "ambos") return product.issuerRate + promoterRate;
  return promoterRate;
}

function getRoleLabel(role = state.role) {
  if (role === "emissor") return "Comissão da emissora";
  if (role === "ambos") return "Emissora + promotora";
  return "Comissão da promotora";
}

function calculateSale(sale) {
  const product = getProduct(sale.productCode);
  const promoterRate = getPromoterRate(product);
  const issuerCommission = sale.value * (product.issuerRate / 100);
  const promoterCommission = sale.value * (promoterRate / 100);
  const combinedCommission = issuerCommission + promoterCommission;
  const selectedRate = getSelectedRate(product);

  let selectedCommission = promoterCommission;
  if (state.role === "emissor") selectedCommission = issuerCommission;
  if (state.role === "ambos") selectedCommission = combinedCommission;

  return {
    product,
    promoterRate,
    issuerCommission,
    promoterCommission,
    combinedCommission,
    selectedRate,
    selectedCommission
  };
}

function getTotals() {
  return state.sales.reduce((totals, sale) => {
    const calculation = calculateSale(sale);
    totals.salesValue += sale.value;
    totals.issuer += calculation.issuerCommission;
    totals.promoter += calculation.promoterCommission;
    totals.selected += calculation.selectedCommission;
    return totals;
  }, {
    salesValue: 0,
    issuer: 0,
    promoter: 0,
    selected: 0
  });
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 2300);
}

function setValueError(show) {
  elements.saleValueError.hidden = !show;
  elements.saleValueControl.classList.toggle("invalid", show);
  elements.saleValue.setAttribute("aria-invalid", String(show));
}

function populateSaleTypes() {
  const previousCode = elements.saleType.value || "BILI";
  const classifications = [...new Set(products.map((product) => product.classification))];
  const fragment = document.createDocumentFragment();

  classifications.forEach((classification) => {
    const group = document.createElement("optgroup");
    group.label = classification;

    products
      .filter((product) => product.classification === classification)
      .forEach((product) => {
        const option = document.createElement("option");
        option.value = product.code;
        option.textContent = `${product.description} (${formatRate(getSelectedRate(product))})`;
        group.append(option);
      });

    fragment.append(group);
  });

  elements.saleType.replaceChildren(fragment);
  elements.saleType.value = products.some((product) => product.code === previousCode)
    ? previousCode
    : "BILI";
}

function updateProductPreview() {
  const product = getProduct(elements.saleType.value);
  const selectedRate = getSelectedRate(product);
  const roleShort = state.role === "emissor"
    ? "Emissora"
    : state.role === "ambos"
      ? "Emissora + promotora"
      : "Promotora";

  elements.currentProductName.textContent = product.description;
  elements.currentProductMeta.textContent = `${product.code} · ${product.category} · ${product.classification} · ${roleShort}`;
  elements.currentProductRate.textContent = formatRate(selectedRate);
}

function updateSettingsCopy() {
  const messages = {
    emissor: "O percentual exibido nos produtos corresponde à comissão da emissora.",
    promotor: "O percentual exibido nos produtos corresponde à comissão da promotora.",
    ambos: "O percentual exibido nos produtos é a soma da emissora com a promotora."
  };

  elements.roleHelp.textContent = messages[state.role];
  elements.summaryRuleLabel.textContent = getRoleLabel();
}

function renderRateTable(filter = elements.rateSearch.value) {
  const normalizedFilter = normalizeSearch(filter);
  const filteredProducts = products.filter((product) => {
    const haystack = normalizeSearch([
      product.description,
      product.code,
      product.category,
      product.classification
    ].join(" "));

    return haystack.includes(normalizedFilter);
  });

  elements.rateTableBody.innerHTML = "";

  filteredProducts.forEach((product) => {
    const promoterRate = getPromoterRate(product);
    const selectedRate = getSelectedRate(product);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${product.description}</td>
      <td><span class="code-badge">${product.code}</span></td>
      <td>${product.category} · ${product.classification}</td>
      <td><span class="percent-badge">${formatRate(product.issuerRate)}</span></td>
      <td><span class="percent-badge ${promoterRate === 0 ? "zero" : ""}">${formatRate(promoterRate)}</span></td>
      <td><span class="used-rate-badge">${formatRate(selectedRate)}</span></td>
    `;

    elements.rateTableBody.append(row);
  });

  elements.emptyTableMessage.hidden = filteredProducts.length !== 0;
}

function getComponentDetail(calculation) {
  if (state.role === "ambos") {
    return `Emissora: ${formatRate(calculation.product.issuerRate)} = ${formatCurrency(calculation.issuerCommission)} · Promotora: ${formatRate(calculation.promoterRate)} = ${formatCurrency(calculation.promoterCommission)}`;
  }

  if (state.role === "emissor") {
    return `Comissão da emissora neste produto: ${formatRate(calculation.product.issuerRate)}`;
  }

  if (calculation.promoterRate === 0) {
    return "Este produto possui 0% de comissão para a promotora.";
  }

  return `Comissão da promotora neste produto: ${formatRate(calculation.promoterRate)}`;
}

function renderSales() {
  elements.salesList.innerHTML = "";
  const hasSales = state.sales.length > 0;

  elements.emptyState.hidden = hasSales;
  elements.listTotal.textContent = `${state.sales.length} ${state.sales.length === 1 ? "item" : "itens"}`;

  state.sales.forEach((sale, index) => {
    const calculation = calculateSale(sale);
    const item = document.createElement("article");
    item.className = "sale-item";
    item.dataset.id = sale.id;

    item.innerHTML = `
      <div class="sale-identity">
        <span class="sale-index">Venda<br>${index + 1}</span>
        <div>
          <h3>${calculation.product.description} <span>(${formatRate(calculation.selectedRate)})</span></h3>
          <p>${calculation.product.code} · ${calculation.product.category} · ${calculation.product.classification} · ${getRoleLabel()}</p>
        </div>
      </div>

      <div class="sale-formula">
        <span>Como foi calculado</span>
        <strong>${formatCurrency(sale.value)} × ${formatRate(calculation.selectedRate)} = ${formatCurrency(calculation.selectedCommission)}</strong>
        <small>${getComponentDetail(calculation)}</small>
      </div>

      <div class="sale-value-block">
        <span>Valor da venda</span>
        <strong>${formatCurrency(sale.value)}</strong>
      </div>

      <div class="sale-commission-block">
        <span>Comissão gerada</span>
        <strong>${formatCurrency(calculation.selectedCommission)}</strong>
      </div>

      <div class="sale-actions">
        <button class="item-action edit" type="button" data-action="edit" data-id="${sale.id}">Editar</button>
        <button class="item-action remove" type="button" data-action="remove" data-id="${sale.id}">Excluir</button>
      </div>
    `;

    elements.salesList.append(item);
  });

  updateSummary();
}

function updateSummary() {
  const totals = getTotals();
  const count = state.sales.length;
  const averageRate = totals.salesValue > 0
    ? (totals.selected / totals.salesValue) * 100
    : 0;

  elements.summaryCount.textContent = `${count} ${count === 1 ? "venda" : "vendas"}`;
  elements.totalCommission.textContent = formatCurrency(totals.selected);
  elements.totalSalesValue.textContent = formatCurrency(totals.salesValue);
  elements.averageRate.textContent = formatRate(averageRate);
  elements.totalIssuer.textContent = formatCurrency(totals.issuer);
  elements.totalPromoter.textContent = formatCurrency(totals.promoter);
  elements.copySummaryButton.disabled = count === 0;
  elements.clearAllButton.disabled = count === 0;

  if (count === 0) {
    elements.totalCaption.textContent = "Adicione a primeira venda para iniciar o cálculo.";
  } else {
    elements.totalCaption.textContent = `Soma das ${count} ${count === 1 ? "comissão individual" : "comissões individuais"} pela regra “${getRoleLabel()}”.`;
  }
}

function refreshAllCalculations() {
  populateSaleTypes();
  updateProductPreview();
  updateSettingsCopy();
  renderSales();
  renderRateTable();
}

function resetForm({ preserveProduct = true, focus = true } = {}) {
  state.editingId = null;
  elements.saleValue.value = "";
  setValueError(false);

  if (!preserveProduct) {
    elements.saleType.value = "BILI";
  }

  elements.saleFormTitle.textContent = "Adicione uma venda";
  elements.submitSaleButton.textContent = "Adicionar venda à lista";
  elements.cancelEditButton.hidden = true;
  updateProductPreview();

  if (focus) {
    elements.saleValue.focus({ preventScroll: true });
  }
}

function formatInputOnBlur() {
  const value = parseCurrency(elements.saleValue.value);
  elements.saleValue.value = value > 0
    ? inputNumberFormatter.format(value)
    : "";
}

function addOrUpdateSale(event) {
  event.preventDefault();
  const value = parseCurrency(elements.saleValue.value);

  if (value <= 0) {
    setValueError(true);
    elements.saleValue.focus();
    showToast("Informe um valor de venda maior que zero.");
    return;
  }

  const productCode = elements.saleType.value;

  if (state.editingId) {
    const sale = state.sales.find((item) => item.id === state.editingId);
    if (sale) {
      sale.value = value;
      sale.productCode = productCode;
      showToast("Venda atualizada.");
    }
  } else {
    const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    state.sales.push({ id, value, productCode });
    showToast("Venda adicionada ao total.");
  }

  renderSales();
  resetForm({ preserveProduct: true, focus: true });
}

function editSale(id) {
  const sale = state.sales.find((item) => item.id === id);
  if (!sale) return;

  state.editingId = id;
  elements.saleValue.value = inputNumberFormatter.format(sale.value);
  elements.saleType.value = sale.productCode;
  elements.saleFormTitle.textContent = "Edite a venda selecionada";
  elements.submitSaleButton.textContent = "Salvar alteração";
  elements.cancelEditButton.hidden = false;
  setValueError(false);
  updateProductPreview();

  elements.saleForm.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => elements.saleValue.focus(), 350);
}

function removeSale(id) {
  const saleIndex = state.sales.findIndex((item) => item.id === id);
  if (saleIndex === -1) return;

  state.sales.splice(saleIndex, 1);

  if (state.editingId === id) {
    resetForm({ preserveProduct: true, focus: false });
  }

  renderSales();
  showToast("Venda excluída.");
}

function clearAllSales() {
  if (state.sales.length === 0) return;

  const confirmed = window.confirm("Remover todas as vendas adicionadas?");
  if (!confirmed) return;

  state.sales = [];
  resetForm({ preserveProduct: false, focus: false });
  renderSales();
  showToast("Todas as vendas foram removidas.");
}

function buildSummaryText() {
  const totals = getTotals();
  const lines = [
    "RESUMO DA CALCULADORA DE COMISSÃO",
    `Regra selecionada: ${getRoleLabel()}`,
    `Percentual da promotora nos produtos de 5%: ${formatRate(state.promoterRate)}`,
    ""
  ];

  state.sales.forEach((sale, index) => {
    const calculation = calculateSale(sale);
    lines.push(`${index + 1}. ${calculation.product.description} (${formatRate(calculation.selectedRate)})`);
    lines.push(`   ${formatCurrency(sale.value)} × ${formatRate(calculation.selectedRate)} = ${formatCurrency(calculation.selectedCommission)}`);

    if (state.role === "ambos") {
      lines.push(`   Emissora: ${formatCurrency(calculation.issuerCommission)} | Promotora: ${formatCurrency(calculation.promoterCommission)}`);
    }
  });

  lines.push("");
  lines.push(`Quantidade de vendas: ${state.sales.length}`);
  lines.push(`Total vendido: ${formatCurrency(totals.salesValue)}`);
  lines.push(`Total da emissora: ${formatCurrency(totals.issuer)}`);
  lines.push(`Total da promotora: ${formatCurrency(totals.promoter)}`);
  lines.push(`COMISSÃO TOTAL: ${formatCurrency(totals.selected)}`);

  return lines.join("\n");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const temporary = document.createElement("textarea");
    temporary.value = text;
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.append(temporary);
    temporary.select();

    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      temporary.remove();
    }
  }
}

async function copySummary() {
  if (state.sales.length === 0) return;
  const copied = await copyText(buildSummaryText());
  showToast(copied ? "Resumo detalhado copiado." : "Não foi possível copiar automaticamente.");
}

function startCalculator() {
  const wasHidden = elements.calculatorArea.hidden;

  if (wasHidden) {
    elements.calculatorArea.hidden = false;
    elements.startCalculator.setAttribute("aria-expanded", "true");
    elements.startCalculator.textContent = "Ir para a calculadora";
    window.requestAnimationFrame(() => elements.calculatorArea.classList.add("revealed"));
  }

  elements.calculatorArea.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => elements.saleValue.focus(), wasHidden ? 450 : 250);
}

function handleSettingsChange() {
  state.role = elements.roleInputs.find((input) => input.checked)?.value || "promotor";
  state.promoterRate = Number(elements.promoterRateInputs.find((input) => input.checked)?.value || 15);
  refreshAllCalculations();
}

function initialize() {
  populateSaleTypes();
  updateProductPreview();
  updateSettingsCopy();
  renderSales();
  renderRateTable();

  elements.startCalculator.addEventListener("click", startCalculator);
  elements.saleForm.addEventListener("submit", addOrUpdateSale);
  elements.saleType.addEventListener("change", updateProductPreview);
  elements.saleValue.addEventListener("input", () => {
    if (parseCurrency(elements.saleValue.value) > 0) setValueError(false);
  });
  elements.saleValue.addEventListener("blur", formatInputOnBlur);
  elements.saleValue.addEventListener("focus", () => elements.saleValue.select());
  elements.roleInputs.forEach((input) => input.addEventListener("change", handleSettingsChange));
  elements.promoterRateInputs.forEach((input) => input.addEventListener("change", handleSettingsChange));
  elements.cancelEditButton.addEventListener("click", () => resetForm({ preserveProduct: true, focus: true }));
  elements.clearFormButton.addEventListener("click", () => resetForm({ preserveProduct: false, focus: true }));
  elements.clearAllButton.addEventListener("click", clearAllSales);
  elements.copySummaryButton.addEventListener("click", copySummary);
  elements.rateSearch.addEventListener("input", (event) => renderRateTable(event.target.value));

  elements.salesList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const { action, id } = button.dataset;
    if (action === "edit") editSale(id);
    if (action === "remove") removeSale(id);
  });
}

initialize();
