
import  '../js/chartjs/package/dist/chart.umd.js'
// import  {Utils} from '../js/untils.js'
const ctx = document.getElementById('myChart');
const DATA_COUNT = 7;
const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100, decimals: 0};
const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.style.background = '#FFF';
        tooltipEl.style.borderRadius = '3px';
        tooltipEl.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
        tooltipEl.style.color = 'white';
        tooltipEl.style.opacity = 1;
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(0, 0)';
        tooltipEl.style.transition = 'all .1s ease';
        tooltipEl.style.borderBottom = '2px solid black';
        const table = document.createElement('table');
        table.style.margin = '0px';

        tooltipEl.appendChild(table);
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
};

const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;

    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    //   if (tooltip.opacity === 0) {
    //     tooltipEl.style.opacity = 0;
    //     return;
    //   }

    // Set Text
    if (tooltip.body) {
        const titleLines = tooltip.title || [];
        const bodyLines = tooltip.body.map(b => b.lines);

        const tableHead = document.createElement('thead');

        titleLines.forEach(title => {
            const tr = document.createElement('tr');
            tr.style.borderWidth = 0;

            const th = document.createElement('th');
            th.style.borderWidth = 0;
            const text = document.createTextNode(title);

            th.appendChild(text);
            tr.appendChild(th);
            tableHead.appendChild(tr);
        });

        const tableBody = document.createElement('tbody');
        bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];
            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
            tr.style.padding = '0';
            tooltipEl.style.borderColor = colors.borderColor;
            const td = document.createElement('td');

            const text = document.createTextNode(body);

            //   td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
        });

        const tableRoot = tooltipEl.querySelector('table');
        tableRoot.style.borderBottom = 0;
        // Remove old children
        while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
        }

        // Add new children
        tableRoot.appendChild(tableHead);
        tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};
const data_line = [];
const data_line_2 = [];
let prev = 100;
let prev2 = 80;
for (let i = 0; i < 100; i++) {
    prev += 5 - Math.random() * 10;
    data_line.push({ x: i, y: prev });
    prev2 += 5 - Math.random() * 10;
    data_line_2.push({ x: i, y: prev2 });
}
const totalDuration = 100;
const delayBetweenPoints = totalDuration / data_line.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
    x: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: NaN, // the point is initially skipped
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.xStarted) {
                return 0;
            }
            ctx.xStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    },
    y: {
        type: 'number',
        easing: 'linear',
        duration: delayBetweenPoints,
        from: previousY,
        delay(ctx) {
            if (ctx.type !== 'data' || ctx.yStarted) {
                return 0;
            }
            ctx.yStarted = true;
            return ctx.index * delayBetweenPoints;
        }
    }
};
new Chart(ctx, {
    type: 'line',
    data: {
        // labels:Utils.months({count: DATA_COUNT}),
        datasets: [
            {
                data: data_line,
                borderWidth: 2,
                borderColor: 'red',
                borderDash: [5, 5],
                pointStyle: 'false',
                radius: 0,
            },
            {
                data: data_line_2,
                borderWidth: 2, 
                borderColor: 'blue',
                pointStyle: 'false',
                radius: 0,
            }
        ]
    },
    options: {
        animation,
        interaction: {
            intersect: false
        },

        scales: {
            x: {
                type: 'linear',
            }
        },
        plugins: {
            title: {
                display: true,
                text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
            },
            tooltip: {
                enabled: false,
                position: 'nearest',
                external: externalTooltipHandler
            }
        }
    }
}
);
