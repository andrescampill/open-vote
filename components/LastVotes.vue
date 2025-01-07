<template>
    <div>
        <h6 class="card-title">Últimas votaciones:</h6>
        <button class="btn" @click="refreshData()" v-if="!show.loading">
            <Icon name="material-symbols:refresh" class="recargar" />
        </button>

        <div class="spinner-border text-secondary" role="status" v-if="show.loading">
            <span class="visually-hidden">Loading...</span>
        </div>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Título</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Más información</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="vote in this.response">
                    <th scope="row">{{ vote.id }}</th>
                    <td>{{ vote.title }}</td>
                    <td>
                        <span v-if="vote.active" class="badge rounded-pill text-bg-success">Activa</span>
                        <span v-else class="badge rounded-pill text-bg-danger ">Inactiva</span>
                    </td>
                    <td><a :href="'/dashboard/voting/' + vote.id">Más información</a></td>
                </tr>
            </tbody>
        </table>
        <p class="card-text text-body-secondary">Mostrando sólo las 5 últimas votaciones</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            response: '',
            show: {
                loading: true,
            }
        }
    },
    async mounted() {
        this.refreshData();

    },
    methods: {
        async refreshData() {
            this.show.loading = true;
            try{
                this.response = await $fetch('/api/vote/getLast');
            } catch (error){
                
            }
            this.show.loading = false;
        }
    }
}
</script>

<style scoped>
.recargar {
    cursor: pointer;
}
.badge{
    width: 5vw;
}
</style>