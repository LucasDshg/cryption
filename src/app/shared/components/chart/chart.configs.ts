import { Chart } from 'chart.js';

export const zeroLinePlugin = {
  id: 'zeroLinePlugin',
  afterDraw: (chart: Chart): void => {
    const ctx = chart.ctx as CanvasRenderingContext2D;
    const yScale = chart.scales['y'] as any;
    if (!yScale) return;

    const chartArea = chart.chartArea;
    const yZero = yScale.getPixelForValue(0);
    if (yZero === undefined) return;
    if (yZero < chartArea.top || yZero > chartArea.bottom) return;

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#717171';
    const y = Math.round(yZero) + 0.5;
    ctx.moveTo(chartArea.left, y);
    ctx.lineTo(chartArea.right, y);
    ctx.stroke();
    ctx.restore();
  },
};

export const chartLineConfigs = {
  datasets: {
    borderWidth: 6,
    borderColor: '#00b221',
    fill: true,
    tension: 0.4,
  },
  options: {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 30,
        right: 30,
        top: 20,
        bottom: 0,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        border: {
          width: 0,
        },
        grid: {
          lineWidth: 0,
        },
      },
    },
  },
};

export const chartBarConfigs = {
  datasets: {
    borderRadius: Number.MAX_VALUE,
    borderSkipped: false,
    borderWidth: 0,
    backgroundColor: '#00b221',
    borderColor: '#00b221',
    maxBarThickness: 18,
  },

  options: {
    maintainAspectRatio: false,
    plugins: {
      datalabels: { display: false },
      legend: { display: false },
    },
    scales: {
      y: {
        grid: { display: false },
        ticks: { display: false },
        border: { display: false },
      },
      x: {
        grid: { display: false },
        border: { width: 0 },
        ticks: { display: false },
      },
    },
  },
};

export const chartPieConfigs = {
  datasets: {
    backgroundColor: ['#00b221', '#b50404'],
    borderColor: 'transparent',
  },

  options: {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  },
};
