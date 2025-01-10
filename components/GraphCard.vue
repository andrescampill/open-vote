<template>
    <div>
        <div id="card">
            <div id="chartView"></div>
        </div>


    </div>
</template>

<style>
#chartView {
    display: flex;
    height: 40vh;
    width: 40vw;
    margin-top: 5rem;
}

#card {
    display: flex;
    justify-content: center;
}
</style>

<script>
import * as echarts from 'echarts';

export default {
    props: {
        voteId: Number
    },
    data() {
        return {
            voteData: [],
        }
    },
    methods: {
        async getInfo() {
            try {
                const response = await $fetch(`/api/vote/getInfo/${this.voteId}`);
                this.voteData = response[0];
                this.voteData.options = JSON.parse(response[0].options)
            } catch (error) {
                console.error(error);
            }
        },

        drawChart() {
            var chartDom = document.getElementById('chartView');
            var myChart = echarts.init(chartDom);


            var option;
            var cnt = 0;

            if (this.voteData.options[0].text == 'per') {
                // Is personalized
                this.voteData.options.splice(0,1);
            } 
                var results = [];
                this.voteData.options.forEach((option) => {
                    results[cnt] = {
                        value: option.value,
                        name: option.text,
                    }
                    cnt++;
                })

            option = {
                title: {
                    text: this.voteData.title,
                    subtext: 'Resultados',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: 'Resultados',
                        type: 'pie',
                        radius: '50%',
                        data: results,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };

            option && myChart.setOption(option);

        }
    },
    async mounted() {
        await this.getInfo();
        this.drawChart();
    }

}
</script>