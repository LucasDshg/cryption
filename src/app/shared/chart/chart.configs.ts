export const chartLineConfigs = {
  datasets: {
    borderWidth: 6,
    borderColor: '#4cb33b',
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
    backgroundColor: '#4cb33b',
    borderColor: '#4cb33b',
    maxBarThickness: 18,
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

export const chartPieConfigs = {
  datasets: {
    backgroundColor: ['#4cb33b', '#e77333'],
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
