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
        <div class="d-flex justify-content-center" v-else-if="show.alert.visible">
            <div class="alert m-3" :class="'alert-' + show.alert.class">
                {{ show.alert.msg }}
            </div>
        </div>
        <div class="d-flex justify-content-center" v-else>
            <div class="card " style="width: 40vw;">

                <div class="card-body">

                    <h4 class="card-title">Editar votación:
                        <span v-if="voteData.active" class="badge rounded-pill text-bg-success">Activa</span>
                        <span v-else class="badge rounded-pill text-bg-danger ">Inactiva</span>

                    </h4>
                    <form @submit.prevent="save()">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Título: </span>
                            <input type="text" name="" id="" class="form-control" v-model="voteData.title" required>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Descripción:</span>
                            <textarea v-model="voteData.description" class="form-control"></textarea>
                        </div>
                    </form>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            v-model="active" @click="changedActive()">
                        <label class="form-check-label" for="flexSwitchCheckDefault">Activa/desactiva</label>
                    </div>


                </div>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <button class="btn btn-success" type="submit" @click.prevent="save()"><Icon name="material-symbols:save" style="color:white;" /> Guardar</button>
                        <button class="btn btn-danger ms-2" data-bs-toggle="modal" data-bs-target="#confirmDelete"><Icon name="material-symbols:delete" /> Borrar</button>
                    </li>
                </ul>

                <div class="card-footer">
                    <small class="text-secondary">#{{ voteId }}</small>
                </div>
            </div>

        </div>

        <div class="modal fade" id="confirmDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fs-5">¿Seguro que quieres eliminar la votación?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Esta acción es <b>irreversible</b>. Todos los datos sobre la votación serán eliminado, incluyendo los <b>resultados</b>. Confirme que desea eliminar la siguiente votación: <br>
                        <b>Id:</b> <span class="text-secondary">#{{ voteData.id }}</span><br>
                        <b>Título:</b> {{ voteData.title }}<br>
                        <b>Descripción: </b> {{ voteData.description }} <br>
                        <span v-if="voteData.active" class="badge rounded-pill text-bg-success">Activa</span>
                        <span v-else class="badge rounded-pill text-bg-danger ">Inactiva</span>

                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button class="btn btn-danger" @click.prevent="deleteVote()"><Icon name="material-symbols:delete" /> Confirmar borrado </button>
                    </div>
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
                }
            },
            voteData: {},
            active: false,
            active2: 1,
        }
    },
    methods: {
        async getData() {
            try {
                this.show.loading = true;
                this.show.error = false;

                const response = await $fetch(`/api/vote/getInfo/${this.voteId}`);
                console.log(response);
                this.voteData = response[0];
                this.show.loading = false;
                if (this.voteData.active == 1) {
                    this.active = true;
                }
            } catch (error) {
                this.show.alert = {
                    visible: true,
                    msg: "Ha habido un error al cargar los contenidos" + error,
                    class: "danger",
                };
                this.show.loading = false;
            }
        },
        async changedActive() {
            console.log("Updating...")
            this.show.loading = true;
            if (this.active == true) {
                this.active2 = 0;
                this.active = false;
            } else {
                this.active2 = 1;
                this.active = true;
            }
            try {

                const body = {
                    title: this.voteData.title,
                    description: this.voteData.description,
                    active: this.active2,
                    id: this.voteId,
                }
                await $fetch('/api/vote/update', {
                    method: "POST",
                    body,
                });
                setTimeout(async () => {
                    await this.getData();
                }, 1000)
                await refreshNuxtData()

            } catch (error) {
                console.error(error);
                this.show.loading = false;
                this.show.alert = {
                    visible: true,
                    msg: error,
                    class: 'danger',
                }
            }
        },
        async save(){
            this.show.loading = true;
            this.show.error = false;
            if (this.active == true) {
                    this.active2 = 1;
                } else {
                    this.active2 = 0;
                }
            const body = {
                    title: this.voteData.title,
                    description: this.voteData.description,
                    active: this.active2,
                    id: this.voteId,
                }
            try{
                await $fetch('/api/vote/update', {
                    method: "POST",
                    body,
                });
                setTimeout(async () => {
                    await this.getData();
                }, 1000)
            } catch(error){
                this.show.loading = false;
                this.show.alert = {
                    visible: true,
                    msg: error,
                    class: 'danger',
                }
            }
        },
        async deleteVote(){
            this.show.loading = true;
            this.show.error = false;
            const body = {
                    id: this.voteId,
                }
                try{
                await $fetch('/api/vote/delete', {
                    method: "POST",
                    body,
                });
                history.back();
            } catch(error){
                this.show.loading = false;
                this.show.alert = {
                    visible: true,
                    msg: error,
                    class: 'danger',
                }
            }
        }

    },
    mounted() {
        this.getData();
    }
}
</script>