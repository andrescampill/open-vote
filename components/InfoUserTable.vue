<template>
    <div>
        <div class="d-flex justify-content-center align-middle" v-if="show.loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">UUID</th>
                    <th scope="col">Usuario</th>
                    <th scope="col">Permisos</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in userData">
                    <th scope="row">{{ user.id }}</th>
                    <td>{{ user.uuid }}</td>
                    <td>{{ user.username }}</td>
                    <td>
                        <span class="badge text-bg-success" v-if="user.perms == 1">
                            <Icon name="ion:checkmark-round" />
                        </span>
                        <span class="badge text-bg-danger" v-else>
                            <Icon name="akar-icons:cross" />
                        </span>
                    </td>
                    <td class="d-flex justify-content-end">
                        <a :href="`/dashboard/users/${user.id}`"><button
                                class="btn btn-secondary me-2">Modificar</button></a>
                        <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                            @click="this.index = index">
                            <Icon name="material-symbols:delete" /> Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">¿Seguro que quieres eliminar al usuario?</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Atención, con esta acción vas a eliminar al usuario: <span class="badge text-bg-dark">{{
                            userData[index].username }}</span>. Esta acción es <b>irreversible</b>, el usuario
                            quedará sin acceso a la aplicación una vez que haya cerrado sesión. Los datos sobre las
                            votaciones en las que ha participado no serán eliminados.</p>
                        <p>Detalles: <br>Id: #{{ userData[index].id }} <br>Usuario: {{ userData[index].username }} <br>
                            UUID: {{ userData[index].uuid }}</p>
                        <span class="badge text-bg-danger" v-if="userData[index].perms == 1">ESTE USUARIO CUENTA CON
                            PERMISOS DE ADMINISTRACIÓN</span>
                        <p>Por vafor, confirme la eliminación del usuario:</p>
                    </div>
                    <div class="modal-footer">
                        <div v-if="show.loading">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                        <div v-else>
                            <button type="button" class="btn btn-secondary me-3" data-bs-dismiss="modal">Cancelar</button>
                        <button class="btn btn-danger" @click.prevent="deleteUser()">
                            <Icon name="material-symbols:delete" /> Eliminar
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: [{
                username: '',
                uuid: '',
                perms: '',
            }],
            show: {
                loading: true,
                alert: {
                    visible: false,
                    msg: '',
                    class: 'danger',
                }
            },
            index: 0,
        }
    },
    methods: {
        async fetchData() {
            // Loading
            this.show.loading = true;
            try {
                const response = await $fetch('/api/auth/getAll');
                this.userData = response;
                console.log(this.userData);
                this.show.loading = false;
            } catch (error) {
                this.show.loading = false;
                this.show.alert = {
                    visible: true,
                    msg: 'Ha ocurrido un error al conseguir los datos',
                    class: 'danger',
                }
            }
        },
        async deleteUser() {
            // Loading
            this.show.loading = true
            try {
                const body = {
                    id: this.userData[this.index].id
                }
                await $fetch('/api/auth/delete', {
                    method: "POST",
                    body
                });
                this.show.loading = false;
            } catch (error) {
                this.show.loading = false;
                this.show.alert = {
                    visible: true,
                    msg: 'Ha ocurrido un error al conseguir los datos',
                    class: 'danger',
                }
            };
            this.show.loading = false;
            this.fetchData();
            refreshNuxtData();
            reloadNuxtApp();
        }
    },
    mounted() {
        this.fetchData();
    }
}

</script>