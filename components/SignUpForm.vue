<template>
    <div class="d-flex justify-content-center mb-5">
        <div class="card mt-3" style="width: 30vw;">
            <div class="card-body">
                <h2 class="card-title">Registresé</h2>

                <form @submit.prevent="signup()">
                    <div class="mb-3">
                        <label for="userInput" class="form-label">Usuario</label>
                        <input v-model="userData.user" type="text" name="userInput" id="userInput" class="form-control">
                    </div>

                    <div class="">
                        <label for="passInput" class="form-label">Contrasñea</label>
                        <input v-model="userData.pass" type="password" name="passInput" id="passInput"
                            class="form-control">
                    </div>

                    <div class="mb-3">
                        <label for="passInput" class="form-label">Repita la contraseña</label>
                        <input v-model="userData.pass2" type="password" name="passInput" id="passInput"
                            class="form-control">
                    </div>

                    <div class="mb-3 form-check form-switch">
                        <input type="checkbox" role="switch" name="permis" id="perms" class="form-check-input" v-model="userData.perms">
                        <label class="form-check-label" for="perms">Usuario con permisos</label>
                    </div>

                    <button type="submit" class="btn btn-primary">
                        <Icon name="line-md:log-in" style="color: white;" /> Crear usuario
                    </button>
                    <div class="alert mt-3 mb-3" :class="`alert-${show.class}`" v-if="show.error">{{msg}}</div> <br>
                    <div class="text-center">
                        <div class="spinner-border text-primary mt-3 mb-3" role="status" v-if="show.loading">
                            <span class="visually-hidden">Cargando</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { routerKey } from 'vue-router';

export default {
    data() {
        return {
            show: {
                error: false,
                loading: false,
                class: 'danger'
            },
            msg: 'a',
            userData: {
                user: '',
                pass: '',
                pass2: '',
                perms: false,
                permsClear: 0,
            }


        }
    },
    methods: {
        async signup() {
            this.show.loading = true;
            this.show.error = false;
            this.msg = "";

            if(this.userData.perms == true){
                this.userData.permsClear = 1;
            } else {
                this.userData.permsClear = 0;
            }

            const body = {
                username: this.userData.user,
                password: this.userData.pass,
                perms: this.userData.permsClear,
            };

            if (this.userData.pass == this.userData.pass2) {
                // Password is the same and we can continue
                try {
                    const response = await $fetch('/api/auth/signup', {
                        method: "POST",
                        body,
                    });
                    this.show.loading = false;
                    this.show.error = true;
                    this.show.class= "success";
                    this.msg = "El usuario se ha creado correctamente";
                } catch (error) {
                    this.show.loading = false;
                    this.show.error = true;
                    this.show.class= "danger";
                }
            } else {
                this.msg = "Contraseña no repetida correctamente."
                this.show.loading = false;
                this.show.error = true;
                this.show.class= "danger";
            }
        }
    }
}
</script>