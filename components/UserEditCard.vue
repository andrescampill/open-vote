<template>
    <div>
        <PermsRequire />
        <div class="d-flex justify-content-center align-items-center" id="loading" v-if="show.loading">
            <div>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>

            </div>
        </div>

        <div clasS="d-flex justify-content-center" v-else>
            <div class="card" style="width: 40vw;">
                <div class="card-header">
                    <h5 class="card-title">Detalles de usuario</h5>
                </div>
                <div class="card-body">
                    <form>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Usuario:</span>
                            <input v-model="userData.username" type="text" class="form-control disabled" disabled>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">UUID: </span>
                            <input v-model="userData.uuid" type="text" class="form-control" disabled>
                        </div>
                        <div class="mb-3">
                            <h6>Cambiar contrasñea:</h6>
                            <div class="mb-1">
                                <label for="pass1Input" class="form-label">Nueva contraseña: </label>
                                <input type="password" id="pass1Input" class="form-control" v-model="userData.pass1">
                            </div>
                            <div class="mb-1">
                                <label for="pass2Input" class="form-label">Repita la contraseña: </label>
                                <input type="password" id="pass2Input" class="form-control" v-model="userData.pass2">
                            </div>
                        </div>
                        <div class="mb 3">
                            <div class="form-check form-switch">
                                <input type="checkbox" id="perms" class="form-check-input" role="switch"
                                    v-model="userData.permsVisible">
                                <label for="perms" class="form-check-label">Permisos de administrador:</label>
                            </div>
                        </div>
                    </form>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <button class="btn btn-success" type="submit" @click.prevent="save()">
                            <Icon name="material-symbols:save" style="color:white;" /> Editar
                        </button>
                        <button class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#confirmDelete">
                            <Icon name="material-symbols:delete" /> Borrar
                        </button>
                    </li>
                </ul>
                <div class="card-footer">
                    <span class="text-secondary"><i>#{{ userId }}</i></span>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center" v-if="show.alert.visible">
            <div class="alert m-3" :class="'alert-' + show.alert.class">
                {{ show.alert.msg }}
            </div>
        </div>

        <div class="modal fade" id="confirmDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">¿Seguro que quieres eliminar al usuario?</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>Atención, con esta acción vas a eliminar al usuario: <span class="badge text-bg-dark">{{
                            userData.username }}</span>. Esta acción es <b>irreversible</b>, el usuario
                            quedará sin acceso a la aplicación una vez que haya cerrado sesión. Los datos sobre las
                            votaciones en las que ha participado no serán eliminados.</p>
                        <p>Detalles: <br>Id: #{{ userData.id }} <br>Usuario: {{ userData.username }} <br>
                            UUID: {{ userData.uuid }}</p>
                        <span class="badge text-bg-danger" v-if="userData.perms == 1">ESTE USUARIO CUENTA CON
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
    props: {
        userId: Number,
    },
    data() {
        return {
            show: {
                loading: true,
                alert: {
                    visible: false,
                    msg: '',
                    class: 'danger',
                }
            },
            userData: {
                id: 0,
                username: 'Cargando...',
                uuid: 'Cargando...',
                perms: 0,
                permsVisible: false,
                pass1: null,
                pass2: null,
            },
        }
    },
    methods: {
        async getData() {
            try {
                this.show.loading = true;
                this.show.alert.visible = false;

                console.log(this.userData);
                const response = await $fetch(`/api/auth/getInfo/${this.userId}`);
                this.userData = response;
                console.log(response);


                if (this.userData.perms == 1) {
                    this.userData.permsVisible = true;
                } else {
                    this.userData.permsVisible = false;
                }
                this.show.loading = false;
            } catch (error) {
                console.error(error);
                this.show.loading = false;
                this.show.alert = {
                    visible: true,
                    msg: 'ha ocurrido un error' + error,
                    class: 'danger',
                }
            }
        },
        async save(){
            this.show.loading = true;
            if(!this.userData.pass1 || this.userData.pass1 == ''){
                // User dont want to change password
                if(this.userData.permsVisible == false ){
                    this.userData.perms = 0;
                } else {
                    this.userData.perms = 1;
                }
                const body ={
                    id: this.userData.id,
                    perms: this.userData.perms,
                }
                console.log(body);
                await $fetch('/api/auth/update', {
                    method: "POST",
                    body,
                });
                setTimeout(async () => {
                    await this.getData();
                }, 1000)
                await refreshNuxtData();
            } else {
                // User want to change password
                if(this.userData.pass1 == this.userData.pass2){
                    //Both passwords are the same
                    if(this.userData.permsVisible == false ){
                    this.userData.perms = 0;
                } else {
                    this.userData.perms = 1;
                }
                const body ={
                    id: this.userData.id,
                    pass: this.userData.pass1, 
                    perms: this.userData.perms,
                }
                console.log(body);
                await $fetch('/api/auth/update', {
                    method: "POST",
                    body,
                });
                setTimeout(async () => {
                    await this.getData();
                }, 1000)
                this.show.loading = false;
                this.show.alert={
                    visible: true,
                    msg: 'El usuario se ha actualizado correctamente',
                    class: 'success',
                };
                } else {
                    this.show.loading = false;
                    this.show.alert = {
                        visible: true,
                        msg: 'Las contraseñas tienen que coincidir',
                        class: 'danger',
                    }
                }
            }
        },
        async deleteUser(){
            this.show.loading = true;
            try {
                const body = {
                    id: this.userData.id
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
    async beforeMount() {
        this.show.loading = true;
        await this.getData();
        await this.getData();
        this.show.loading = false;

    }
}
</script>

<style></style>