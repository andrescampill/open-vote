<template>
    <div>
        <h6 class="card-title">Ultimos usuarios creados:</h6>
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
                    <th scope="col">Usuario</th>
                    <th scope="col">Permisos</th>
                    <th scope="col">Más información</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in this.response">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.username }}</td>
                    <td>
                        <span v-if="user.perms == 1" class="badge rounded-pill text-bg-success"><Icon name="ion:checkmark-round" /></span>
                        <span v-else class="badge rounded-pill text-bg-danger "><Icon name="akar-icons:cross" /> </span>
                    </td>
                    <td><a :href="'/dashboard/users/' + user.id">Más información</a></td>
                </tr>
            </tbody>
        </table>
        <p class="card-text text-body-secondary mb-1">Mostrando sólo los 5 últimos usuarios creados</p>
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
                this.response = await $fetch('/api/auth/getLast');
            } catch (error){
                console.log(error);
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
</style>