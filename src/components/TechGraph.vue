<template>
  <Line :chart-data="chartData" :chart-options="chartOptions" />
</template>

<script>
import data from '../data'
import { jobStats } from '../utils'
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
      this.chartData = this.formatData(data)
    }
  },
  data: function () {
    return {
      chartData: this.formatData(data),
      chartOptions: {
        tension: 0.4,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                display: true
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    formatData(data) {
      const formattedData = {}

      Object.keys(data).forEach(key => {
        formattedData[key] = jobStats(data[key])
      })

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

      Object.keys(formattedData).forEach(m => {
        this.techs.forEach(t => {
          const count = formattedData[m][t].count
          const label = formattedData[m][t].label

          const index = datasets.indexOf(datasets.find(e => e.id === t))

          datasets[index].label = label
          datasets[index].data.push(count)
        })
      })

      return {
        labels: Object.keys(formattedData),
        datasets
      }
    }
  }
}
</script>
