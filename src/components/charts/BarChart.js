import { Bar } from 'vue-chartjs'
import { eventBus } from '../../main.js'

export default {
  extends: Bar,
  data () {
    return {
      datacollection: {
        labels: ['미세먼지', '오존', '초미세먼지'],
        datasets: [
          {
            label: '',
            backgroundColor: '#f87979',
            data: []
          }
        ]
      }
    }
  },
  mounted(){
    eventBus.$on('showData', (data) => {
      this.setData(data);
    })
  },
  methods: {
    setData(data){
      let dataSet = this.datacollection.datasets[0];
      dataSet.label = data.date;
      dataSet.data.push(data.pm10);
      dataSet.data.push(data.o3);
      dataSet.data.push(data.pm25);

      this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
    }
  }
}
