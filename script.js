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
  periodStart: "",
  periodEnd: "",
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
  periodStart: document.querySelector("#periodStart"),
  periodEnd: document.querySelector("#periodEnd"),
  periodError: document.querySelector("#periodError"),
  roleHelp: document.querySelector("#roleHelp"),
  saleForm: document.querySelector("#saleForm"),
  saleFormTitle: document.querySelector("#saleFormTitle"),
  saleValue: document.querySelector("#saleValue"),
  saleValueControl: document.querySelector(".currency-control"),
  saleValueError: document.querySelector("#saleValueError"),
  agencyRate: document.querySelector("#agencyRate"),
  agencyRateControl: document.querySelector(".percent-control"),
  agencyRateError: document.querySelector("#agencyRateError"),
  saleNumber: document.querySelector("#saleNumber"),
  saleNumberControl: document.querySelector(".number-control"),
  saleNumberError: document.querySelector("#saleNumberError"),
  saleType: document.querySelector("#saleType"),
  currentProductName: document.querySelector("#currentProductName"),
  currentProductMeta: document.querySelector("#currentProductMeta"),
  currentProductRate: document.querySelector("#currentProductRate"),
  submitSaleButton: document.querySelector("#submitSaleButton"),
  cancelEditButton: document.querySelector("#cancelEditButton"),
  clearFormButton: document.querySelector("#clearFormButton"),
  summaryRuleLabel: document.querySelector("#summaryRuleLabel"),
  summaryPeriodLabel: document.querySelector("#summaryPeriodLabel"),
  summaryCount: document.querySelector("#summaryCount"),
  totalCommission: document.querySelector("#totalCommission"),
  totalCaption: document.querySelector("#totalCaption"),
  totalSalesValue: document.querySelector("#totalSalesValue"),
  totalAgencyGain: document.querySelector("#totalAgencyGain"),
  averageRate: document.querySelector("#averageRate"),
  totalIssuer: document.querySelector("#totalIssuer"),
  totalPromoter: document.querySelector("#totalPromoter"),
  savePdfButton: document.querySelector("#savePdfButton"),
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

function formatDate(value) {
  if (!value || typeof value !== "string") return "";
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return "";
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function getPeriodLabel() {
  if (!state.periodStart || !state.periodEnd) return "Período não selecionado";
  const startLabel = formatDate(state.periodStart);
  const endLabel = formatDate(state.periodEnd);
  if (!startLabel || !endLabel) return "Período não selecionado";
  if (state.periodStart === state.periodEnd) return startLabel;
  return `${startLabel} a ${endLabel}`;
}

function isValidPeriod() {
  return Boolean(state.periodStart && state.periodEnd && state.periodStart <= state.periodEnd);
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

function parsePercent(value) {
  const parsed = Number.parseFloat(String(value || "").replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseSaleNumber(value) {
  const parsed = Number.parseInt(String(value || "").replace(/\D/g, ""), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatPercentInput(value) {
  return String(Number.isFinite(value) ? value : 10).replace(",", ".");
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
  const agencyRate = Number.isFinite(sale.agencyRate) ? sale.agencyRate : 10;
  const agencyGain = sale.value * (agencyRate / 100);
  const promoterRate = getPromoterRate(product);
  const issuerCommission = agencyGain * (product.issuerRate / 100);
  const promoterCommission = agencyGain * (promoterRate / 100);
  const combinedCommission = issuerCommission + promoterCommission;
  const selectedRate = getSelectedRate(product);

  let selectedCommission = promoterCommission;
  if (state.role === "emissor") selectedCommission = issuerCommission;
  if (state.role === "ambos") selectedCommission = combinedCommission;

  return {
    product,
    agencyRate,
    agencyGain,
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
    totals.agencyGain += calculation.agencyGain;
    totals.issuer += calculation.issuerCommission;
    totals.promoter += calculation.promoterCommission;
    totals.selected += calculation.selectedCommission;
    return totals;
  }, {
    salesValue: 0,
    agencyGain: 0,
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

function setAgencyRateError(show) {
  elements.agencyRateError.hidden = !show;
  elements.agencyRateControl.classList.toggle("invalid", show);
  elements.agencyRate.setAttribute("aria-invalid", String(show));
}

function setSaleNumberError(show) {
  elements.saleNumberError.hidden = !show;
  elements.saleNumberControl.classList.toggle("invalid", show);
  elements.saleNumber.setAttribute("aria-invalid", String(show));
}

function setPeriodError(show) {
  elements.periodError.hidden = !show;
  elements.periodStart.closest(".date-control").classList.toggle("invalid", show);
  elements.periodEnd.closest(".date-control").classList.toggle("invalid", show);
  elements.periodStart.setAttribute("aria-invalid", String(show));
  elements.periodEnd.setAttribute("aria-invalid", String(show));
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
  elements.summaryPeriodLabel.textContent = getPeriodLabel();
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
    return `Base da comissão: ${formatCurrency(calculation.agencyGain)} · Emissora: ${formatRate(calculation.product.issuerRate)} = ${formatCurrency(calculation.issuerCommission)} · Promotora: ${formatRate(calculation.promoterRate)} = ${formatCurrency(calculation.promoterCommission)}`;
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
          <p>Venda nº ${sale.saleNumber || index + 1} · Período: ${getPeriodLabel()} · ${calculation.product.code} · ${calculation.product.category} · ${calculation.product.classification} · ${getRoleLabel()}</p>
        </div>
      </div>

      <div class="sale-formula">
        <span>Como foi calculado</span>
        <strong>${formatCurrency(sale.value)} × ${formatRate(calculation.agencyRate)} = ${formatCurrency(calculation.agencyGain)} × ${formatRate(calculation.selectedRate)} = ${formatCurrency(calculation.selectedCommission)}</strong>
        <small>${getComponentDetail(calculation)}</small>
      </div>

      <div class="sale-value-block">
        <span>Venda / ganho agência</span>
        <strong>${formatCurrency(sale.value)}</strong>
        <small>${formatRate(calculation.agencyRate)} = ${formatCurrency(calculation.agencyGain)}</small>
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
  elements.totalAgencyGain.textContent = formatCurrency(totals.agencyGain);
  elements.averageRate.textContent = formatRate(averageRate);
  elements.totalIssuer.textContent = formatCurrency(totals.issuer);
  elements.totalPromoter.textContent = formatCurrency(totals.promoter);
  elements.savePdfButton.disabled = count === 0;

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

function resetForm({ preserveProduct = true, preserveAgencyRate = true, focus = true } = {}) {
  state.editingId = null;
  elements.saleValue.value = "";
  elements.saleNumber.value = "";
  setValueError(false);
  setAgencyRateError(false);
  setSaleNumberError(false);

  if (!preserveProduct) {
    elements.saleType.value = "BILI";
  }

  if (!preserveAgencyRate) {
    elements.agencyRate.value = "10";
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
  const agencyRate = parsePercent(elements.agencyRate.value);
  const saleNumber = parseSaleNumber(elements.saleNumber.value);

  if (!isValidPeriod()) {
    setPeriodError(true);
    elements.periodStart.focus();
    showToast("Selecione um período válido para as vendas.");
    return;
  }

  if (value <= 0) {
    setValueError(true);
    elements.saleValue.focus();
    showToast("Informe um valor de venda maior que zero.");
    return;
  }

  if (agencyRate < 7 || agencyRate > 40) {
    setAgencyRateError(true);
    elements.agencyRate.focus();
    showToast("Informe o ganho da agência entre 7% e 40%.");
    return;
  }

  if (saleNumber <= 0) {
    setSaleNumberError(true);
    elements.saleNumber.focus();
    showToast("Informe um número de venda válido.");
    return;
  }

  const productCode = elements.saleType.value;

  if (state.editingId) {
    const sale = state.sales.find((item) => item.id === state.editingId);
    if (sale) {
      sale.value = value;
      sale.agencyRate = agencyRate;
      sale.saleNumber = saleNumber;
      sale.productCode = productCode;
      showToast("Venda atualizada.");
    }
  } else {
    const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    state.sales.push({ id, value, agencyRate, saleNumber, productCode });
    showToast("Venda adicionada ao total.");
  }

  renderSales();
  resetForm({ preserveProduct: true, preserveAgencyRate: true, focus: true });
}

function editSale(id) {
  const sale = state.sales.find((item) => item.id === id);
  if (!sale) return;

  state.editingId = id;
  elements.saleValue.value = inputNumberFormatter.format(sale.value);
  elements.agencyRate.value = formatPercentInput(sale.agencyRate);
  elements.saleNumber.value = sale.saleNumber || "";
  elements.saleType.value = sale.productCode;
  elements.saleFormTitle.textContent = "Edite a venda selecionada";
  elements.submitSaleButton.textContent = "Salvar alteração";
  elements.cancelEditButton.hidden = false;
  setValueError(false);
  setAgencyRateError(false);
  setSaleNumberError(false);
  updateProductPreview();

  elements.saleForm.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => elements.saleValue.focus(), 350);
}

function removeSale(id) {
  const saleIndex = state.sales.findIndex((item) => item.id === id);
  if (saleIndex === -1) return;

  state.sales.splice(saleIndex, 1);

  if (state.editingId === id) {
    resetForm({ preserveProduct: true, preserveAgencyRate: true, focus: false });
  }

  renderSales();
  showToast("Venda excluída.");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPdfTableHtml() {
  const totals = getTotals();
  const rows = state.sales.map((sale, index) => {
    const calculation = calculateSale(sale);

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${sale.saleNumber || index + 1}</td>
        <td>${escapeHtml(getPeriodLabel())}</td>
        <td>${escapeHtml(calculation.product.description)}<br><small>${escapeHtml(calculation.product.code)} · ${escapeHtml(calculation.product.category)}</small></td>
        <td>${formatCurrency(sale.value)}</td>
        <td>${formatRate(calculation.agencyRate)}</td>
        <td>${formatCurrency(calculation.agencyGain)}</td>
        <td>${formatRate(calculation.selectedRate)}</td>
        <td>${formatCurrency(calculation.selectedCommission)}</td>
      </tr>
    `;
  }).join("");

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Resumo de comissões</title>
  <style>
    @page { margin: 16mm; }
    * { box-sizing: border-box; }
    body { color: #14313b; font-family: Arial, sans-serif; font-size: 12px; }
    h1 { margin: 0 0 6px; font-size: 22px; }
    p { margin: 0; color: #52686e; }
    .summary { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin: 18px 0; }
    .summary div { border: 1px solid #d9e6e3; border-radius: 8px; padding: 9px; }
    .summary span { display: block; color: #667d83; font-size: 10px; text-transform: uppercase; }
    .summary strong { display: block; margin-top: 4px; font-size: 14px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; border: 1px solid #d9e6e3; text-align: left; vertical-align: top; }
    th { background: #edf4f2; font-size: 10px; text-transform: uppercase; }
    small { color: #667d83; }
    .right { text-align: right; }
  </style>
</head>
<body>
  <h1>Tabela de vendas e comissões</h1>
  <p>Período: ${escapeHtml(getPeriodLabel())}. Regra: ${escapeHtml(getRoleLabel())}. A comissão é calculada sobre o ganho da agência.</p>
  <section class="summary">
    <div><span>Vendas</span><strong>${state.sales.length}</strong></div>
    <div><span>Total vendido</span><strong>${formatCurrency(totals.salesValue)}</strong></div>
    <div><span>Ganho agência</span><strong>${formatCurrency(totals.agencyGain)}</strong></div>
    <div><span>Comissão total</span><strong>${formatCurrency(totals.selected)}</strong></div>
  </section>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Nº venda</th>
        <th>Período</th>
        <th>Venda</th>
        <th>Valor total</th>
        <th>% agência</th>
        <th>Ganho agência</th>
        <th>% comissão</th>
        <th>Comissão</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

function saveTableAsPdf() {
  if (state.sales.length === 0) return;

  const printWindow = window.open("", "_blank", "width=980,height=720");
  if (!printWindow) {
    showToast("Permita pop-ups para gerar o PDF.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(buildPdfTableHtml());
  printWindow.document.close();
  printWindow.focus();
  printWindow.setTimeout(() => printWindow.print(), 250);
  showToast("Escolha “Salvar como PDF” na janela de impressão.");
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
  window.setTimeout(() => {
    const focusTarget = isValidPeriod() ? elements.saleValue : elements.periodStart;
    focusTarget.focus();
  }, wasHidden ? 450 : 250);
}

function handleSettingsChange() {
  state.role = elements.roleInputs.find((input) => input.checked)?.value || "promotor";
  state.promoterRate = Number(elements.promoterRateInputs.find((input) => input.checked)?.value || 15);
  refreshAllCalculations();
}

function handlePeriodChange() {
  state.periodStart = elements.periodStart.value;
  state.periodEnd = elements.periodEnd.value;
  setPeriodError(false);
  updateSettingsCopy();
  renderSales();
}

function initialize() {
  populateSaleTypes();
  updateProductPreview();
  updateSettingsCopy();
  renderSales();
  renderRateTable();

  elements.startCalculator.addEventListener("click", startCalculator);
  elements.periodStart.addEventListener("change", handlePeriodChange);
  elements.periodEnd.addEventListener("change", handlePeriodChange);
  elements.saleForm.addEventListener("submit", addOrUpdateSale);
  elements.saleType.addEventListener("change", updateProductPreview);
  elements.saleValue.addEventListener("input", () => {
    if (parseCurrency(elements.saleValue.value) > 0) setValueError(false);
  });
  elements.agencyRate.addEventListener("input", () => {
    const agencyRate = parsePercent(elements.agencyRate.value);
    if (agencyRate >= 7 && agencyRate <= 40) setAgencyRateError(false);
  });
  elements.saleNumber.addEventListener("input", () => {
    if (parseSaleNumber(elements.saleNumber.value) > 0) setSaleNumberError(false);
  });
  elements.saleValue.addEventListener("blur", formatInputOnBlur);
  elements.saleValue.addEventListener("focus", () => elements.saleValue.select());
  elements.roleInputs.forEach((input) => input.addEventListener("change", handleSettingsChange));
  elements.promoterRateInputs.forEach((input) => input.addEventListener("change", handleSettingsChange));
  elements.cancelEditButton.addEventListener("click", () => resetForm({ preserveProduct: true, preserveAgencyRate: true, focus: true }));
  elements.clearFormButton.addEventListener("click", () => resetForm({ preserveProduct: false, preserveAgencyRate: false, focus: true }));
  elements.savePdfButton.addEventListener("click", saveTableAsPdf);
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
