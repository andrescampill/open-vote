<template>
    <div>
        <div class="d-flex justify-content-center align-items-center" id="loading" v-if="show.loading">
            <div>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center" v-else-if="show.alert.visible">
            <div class="alert m-3" :class="'alert-' + show.alert.class">
                {{ show.alert.msg }}
            </div>
        </div>
        <div v-else class="d-flex justify-content-center mt-2">
            <div class="card" style="width: 40vw;">
                <div class="card-body">
                    <h5 class="card-title">Resultados de la votación:</h5>
                    <table class="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Opción</th>
                                <th scope="col">Votos</th>
                                <th scope="col">Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(option, index) in voteData.options">
                                <th scope="row">{{ index+1 }}</th>
                                <td>{{ option.text}}</td>
                                <td>{{ option.value}}</td>
                                <td>{{ option.value *100 / total }}%</td>
                            </tr>
                            <tr>
                                <th scope="row" colspan="2">Total:</th>
                                <td >{{ total }}</td>
                                <td>100%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        voteId: Number,
    },
    data() {
        return {
            show: {
                loading: true,
                alert: {
                    visible: false,
                    msg: 'Cargando...',
                    class: 'primary',
                },
                voteData: {},
                percentageVotes: [],
                total: 0,
            },
        }
    },
    methods: {
        async getData() {
            try {
                this.show.loading = true;
                this.show.alert.visible = false;
                const response = await $fetch(`/api/vote/getInfo/${this.voteId}`);
                console.log(response[0]);
                this.voteData = response[0];
                this.show.loading = false;
                this.voteData.options = JSON.parse(this.voteData.options)
                this.getTotal();
            } catch (error) {
                this.show.alert = {
                    visible: true,
                    msg: "Ha habido un error al cargar los contenidos" + error,
                    class: "danger",
                };
                console.error(error);
                this.show.loading = false;
            }
        },
        getTotal(){
            var totalTemp = 0;
            this.voteData.options.forEach((option) => {
                totalTemp = totalTemp + option.value;
            })

            this.total = totalTemp;
            
        }
    },
    mounted() {
        this.getData();
    }
}
</script>