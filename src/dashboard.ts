import './dashboard.css';
import {
  SCENARIOS,
  calculateSliceValue,
  calculateTotalValue,
  formatCurrency,
  type Scenario,
} from './data/scenarios';

declare const Chart: any;

const counts = new Map<string, number>();
let chart: any;

document.addEventListener('DOMContentLoaded', () => {
  SCENARIOS.forEach((s) => counts.set(s.id, s.defaultCount));
  renderInputs();
  const canvas = document.getElementById('value-chart') as HTMLCanvasElement;
  createChart(canvas);
  updateTotalDisplay();
});

function renderInputs(): void {
  const container = document.getElementById('scenario-inputs')!;
  container.innerHTML = SCENARIOS.map(
    (s) => `
    <div class="scenario-row">
      <div class="scenario-dot" style="background-color: ${s.color};"></div>
      <div class="scenario-name">${s.shortName}</div>
      <input
        type="number"
        class="scenario-input"
        id="input-${s.id}"
        value="${s.defaultCount}"
        min="0"
        max="999"
      />
      <div class="scenario-subtotal" id="subtotal-${s.id}">
        ${formatCurrency(calculateSliceValue(s, s.defaultCount))}
      </div>
    </div>
  `
  ).join('');

  SCENARIOS.forEach((s) => {
    const input = document.getElementById(`input-${s.id}`) as HTMLInputElement;
    input.addEventListener('input', () => {
      const value = parseInt(input.value) || 0;
      counts.set(s.id, value);
      const subtotal = document.getElementById(`subtotal-${s.id}`)!;
      subtotal.textContent = formatCurrency(calculateSliceValue(s, value));
      updateChart();
      updateTotalDisplay();
    });
  });
}

function createChart(canvas: HTMLCanvasElement): void {
  const data = SCENARIOS.map((s) =>
    calculateSliceValue(s, counts.get(s.id) ?? s.defaultCount)
  );

  chart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: SCENARIOS.map((s) => s.shortName),
      datasets: [
        {
          data,
          backgroundColor: SCENARIOS.map((s) => s.color),
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 15,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '55%',
      plugins: {
        legend: {
          position: 'bottom' as const,
          labels: {
            padding: 16,
            font: {
              size: 13,
              family:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            },
            usePointStyle: true,
            pointStyleWidth: 10,
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx: any) => {
              const value = ctx.parsed;
              const total = ctx.dataset.data.reduce(
                (a: number, b: number) => a + b,
                0
              );
              const pct = ((value / total) * 100).toFixed(1);
              return ` ${ctx.label}: ${formatCurrency(value)} (${pct}%)`;
            },
          },
        },
      },
      onClick: (_event: any, elements: any[]) => {
        if (elements.length > 0) {
          const index = elements[0].index;
          const scenario = SCENARIOS[index];
          const count = counts.get(scenario.id) ?? scenario.defaultCount;
          showDetailPanel(scenario, count);
        }
      },
    },
  });
}

function updateChart(): void {
  const data = SCENARIOS.map((s) =>
    calculateSliceValue(s, counts.get(s.id) ?? s.defaultCount)
  );
  chart.data.datasets[0].data = data;
  chart.update();
}

function updateTotalDisplay(): void {
  const total = calculateTotalValue(counts);
  const el = document.getElementById('total-value')!;
  el.textContent = formatCurrency(total);
}

function showDetailPanel(scenario: Scenario, count: number): void {
  const panel = document.getElementById('detail-panel') as HTMLDivElement;
  const total = calculateSliceValue(scenario, count);

  const postingsHtml = scenario.upwork.samplePostings
    .map(
      (posting) => `
      <div class="upwork-card">
        <div class="upwork-card-header">
          <span class="upwork-logo">Upwork</span>
          <h4>${scenario.upwork.jobTitle}</h4>
        </div>
        <div class="rate-badges">
          <span class="rate-badge">$${posting.rate}/hr</span>
          <span class="rate-badge">~${scenario.upwork.estimatedHours}h per deliverable</span>
        </div>
        <p>${posting.text}</p>
      </div>
    `
    )
    .join('');

  panel.innerHTML = `
    <div class="detail-panel-header">
      <h2 style="color: ${scenario.color};">${scenario.name}</h2>
      <button class="detail-close" id="close-detail">&times;</button>
    </div>
    <p class="detail-description">${scenario.description}</p>
    <h3 class="detail-section-title">Calculation Breakdown</h3>
    <div class="calc-breakdown">
      <span class="calc-count">${count}</span> outcomes &times;
      <span class="calc-rate">${formatCurrency(scenario.upwork.perUnitValue)}</span>/each
      <span class="calc-equals">=</span>
      <span class="calc-total">${formatCurrency(total)}</span>
    </div>
    <h3 class="detail-section-title">Market Rate Validation</h3>
    <div class="upwork-cards">
      ${postingsHtml}
    </div>
  `;

  panel.classList.add('visible');
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

  document.getElementById('close-detail')!.addEventListener('click', () => {
    panel.classList.remove('visible');
  });
}
