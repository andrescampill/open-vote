<template>
    <div id="content">
        <div class="d-flex justify-content-center">
            <div class="card mt-3" style="width: 30rem;">
                <div class="card-body">
                    <h2 class="card-title">Inice sesion</h2>
                    <div class="alert alert-primary" v-if="loggedIn">
                        <div class="d-flex">
                            <div style="width: 1vw;" class="me-2">
                                <Icon name="tabler:exclamation-circle" class="align-middle" /> 
                            </div>
                            <div class="align-middle">
                                Ya has iniciado sesión
                            </div>
                        </div>
                    </div>

                    <form @submit.prevent="login()">
                        <div class="mb-3">
                            <label for="userInput" class="form-label">Usuario</label>
                            <input v-model="userData.user" type="text" name="userInput" id="userInput" class="form-control">
                        </div>

                        <div class="mb-3">
                            <label for="passInput" class="form-label">Contrasñea</label>
                            <input v-model="userData.pass" type="password" name="passInput" id="passInput" class="form-control">
                        </div>

                        <button type="submit" class="btn btn-primary">
                            <Icon name="line-md:log-in" style="color: white;" /> Iniciar sesión
                        </button>
                        <div class="alert alert-danger mt-3 mb-3" v-if="show.error">Ha habido un error en el inicio de
                            sesión, intentelo de nuevo más tarde: {{ msg }}</div> <br>
                        <div class="text-center">
                            <div class="spinner-border text-primary mt-3 mb-3" role="status" v-if="show.loading">
                                <span class="visually-hidden">Cargando</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: {
                error: false,
                loading: false,
            },
            msg: '',
            userData:{
                user: '',
                pass: '',
            }
            

        }
    },
    methods: {
        async login() {
            this.show.error = false;
            this.show.loading = true;
            this.msg = '';

            const body = {
                username: this.userData.user,
                password: this.userData.pass,
            }

            try{
                await $fetch('/api/auth/login', {
                    method: "POST",
                    body,
                });
                reloadNuxtApp();
                this.show.error = false;
                this.show.loading = false;
            } catch (error){
                this.show.loading = false;
                this.show.error = true;
            }

        }
    },
    setup(){
        const { loggedIn } = useUserSession();
    }
}
</script>

<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}
</style>