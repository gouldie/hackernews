<template>
  <Line :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs'
import randomcolor from 'randomcolor'
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js'
import generated from '../data/generated'

ChartJS.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
)

export default {
  components: { Line },
  props: {
    techs: {
      type: Array
    }
  },
  watch: {
    techs: function () {
      this.chartData = this.formatData()
    }
  },
  data: function () {
    return {
      chartData: this.formatData(),
      chartOptions: {
        tension: 0.4,
        maintainAspectRatio: false,
        scales: {
          yAxes: {
            ticks: {
              beginAtZero: true
            }
          }
        }
      }
    }
  },
  methods: {
    formatData() {
      const datasets = this.techs.map(e => {
        const color = randomcolor()

        return {
          id: e,
          data: [],
          fill: false,
          backgroundColor: color,
          borderColor: color
        }
      })

      Object.keys(generated).forEach(m => {
        this.techs.forEach(t => {
          const count = generated[m][t].count
          const label = generated[m][t].label

          const index = datasets.indexOf(datasets.find(e => e.id === t))

          datasets[index].label = label
          datasets[index].data.push(count)
        })
      })

      return {
        labels: Object.keys(generated),
        datasets
      }
    }
  }
}
</script>
