<template>
    <form @submit.prevent="createVote()">
        <div class="mb-3">
            <label for="titleInput" class="form-label">Título: <span class="text-danger">*</span></label>
            <input type="text" name="titleInput" id="titleInput" class="form-control" v-model="voteData.title" required>
        </div>
        <div class="mb-3">
            <label for="descInput" class="form-label">Descripción:</label>
            <textarea name="descInput" id="descInput" class="form-control" v-model="voteData.desc"></textarea>
        </div>
        <div class="mb-3">
            <div class="form-check form-switch">
                <input type="checkbox" class="form-check-input" role="switch" id="activeInput" checked
                    v-model="voteData.active">
                <label for="activeInput" class="form-checl-label">Permitir votos:</label>
            </div>
        </div>
        
        <div class="spinner-border text-primary" role="status" v-if="show.loading">
            <span class="visually-hidden">Cargando...</span>
        </div>
        <div :class="show.error.type" class="alert mt-2 mb-0" v-else-if="show.error.visible">{{ this.show.error.msg }}</div>

        <button type="submit" class="btn btn-primary" v-else>
            <Icon name="material-symbols:add" style="color:white;" /> Crear votación
        </button>
        <a href="/dashboard/voting/create" class="text-secondary"><p class="form-text text-secondary">Crear votación con opciones personalizadas</p></a>
    </form>
</template>

<script>
export default {
    data() {
        return {
            show: {
                loading: false,
                error: {
                    visible: false,
                    type: "alert-danger",
                    msg: 'Hola'
                },
            },
            voteData: {
                title: '',
                desc: '',
                active: true,
                activeClean: 1,
            }
        }
    },
    methods: {
        async createVote() {
            console.log("ENVIAR")
            this.show.loading = true;
            this.show.error.visible = false;
            if(this.voteData.active == true){
                this.voteData.activeClean = 1;
            } else {
                this.voteData.activeClean = 0;
            }
            const body = {
                title: this.voteData.title,
                desc: this.voteData.desc,
                active: this.voteData.activeClean,
            }

            console.log(body);

            try {
                await $fetch('/api/vote/create', {
                    method: "POST",
                    body,
                });

                this.show.loading = false;
                this.show.error = {
                    visible: true,
                    type: "alert-success",
                    msg: "Votación creada correctamente",
                }

                setTimeout(() => {
                    this.show.error = {
                        visible: false,
                        type: "alert-success",
                        msg: "Votación creada correctamente",
                    }
                }, 3000)
                // Si se ha creado bien estaremos aquí
            } catch (error) {
                this.show.loading = false;
                this.show.error = {
                    visible: true,
                    type: "alert-danger",
                    msg: "Ha habido un problema durante la creación de la votación"
                }
            }




        }
    }
}
</script>