<template>
    <div class="d-flex justify-content-center">
        <LoadingVotingCard v-if="show.loading" />
        <div v-else-if="hasVoted">
            <div class="alert alert-primary d-flex align-items-center" role="alert">
                <Icon name="material-symbols:info" class="flex-shrink-0 me-2" />

                <div>
                    ¡Ya has votado en esta votación!
                </div>
            </div>

            <div class="card mt-2" style="width: 40rem;">
                <div class="card-body">
                    <h3 class="card-title">{{ this.response[0].title }}</h3>
                    <p class="card-text">{{ this.response[0].description }}</p>

                    <div class="d-flex justify-content-between">
                        <button class="btn btn-success m-1 disabled" id="btn">A
                            favor</button>
                        <button class="btn btn-danger m-1 disabled" id="btn" >En contra</button>
                        <button class="btn btn-secondary m-1 disabled" id="btn">Abstención </button>
                    </div>

                    <hr>
                    <p class="card-text"><small class="text-body-secondary">#{{ idnum }}</small></p>
                </div>
            </div>

        </div>
        <div class="card mt-2" style="width: 40rem;" v-else>
            <div class="card-body">
                <h3 class="card-title">{{ this.response[0].title }}</h3>
                <p class="card-text">{{ this.response[0].description }}</p>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success m-1" id="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#votingConfirmation" @click.prevent="vote.opt = 'A FAVOR'; vote.optNum = 0">A
                        favor</button>
                    <button class="btn btn-danger m-1" id="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#votingConfirmation" @click.prevent="vote.opt = 'EN CONTRA'; vote.optNum = 1">En
                        contra</button>
                    <button class="btn btn-secondary m-1" id="btn" type="button" data-bs-toggle="modal"
                        data-bs-target="#votingConfirmation"
                        @click.prevent="vote.opt = 'ABSTENCIÓN'; vote.optNum = 2">Abstención </button>
                </div>

                <hr>
                <p class="card-text"><small class="text-body-secondary">#{{ idnum }}</small></p>
            </div>
        </div>
        <div class="modal fade" id="votingConfirmation" tabindex="-1" aria-labelledby="" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Valida tu voto</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            v-if="!this.show.loading"></button>
                    </div>
                    <div class="modal-body">
                        <p>Por favor, verifique que su voto es correcto, ya que no podrá cambiarlo una vez sea enviado
                            por usted. Si esta seguro de su elección, pulse el botoón de "Enviar voto"</p>
                        <hr>
                        Usted ha elegido la opción <b>{{ vote.opt }}</b> <br>
                        <span class="text-body-secondary">#{{ idnum }}</span>
                    </div>
                    <div class="modal-footer" v-if="!this.show.loading">
                        <div v-if="!this.show.error">
                            <button type="button" class="btn btn-secondary me-3"
                                data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" @click.prevent="enviar()">
                                <Icon name="mingcute:send-fill" style="color: white;" /> Enviar voto
                            </button>
                        </div>

                    </div>
                    <div class="model-footer d-flex justify-content-center mb-3" v-if="this.show.loading">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>

                    <div class="model-footer d-flex justify-content-center" v-if="this.show.error">
                        <div class="alert alert-danger m-3">
                            Ha ocurrido un error, por favor pongase en contacto con algun mimebro de la Junta Directiva:
                            {{ show.msg }}.
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
        idnum: Number
    },
    data() {
        return {
            vote: {
                opt: '',
                optNum: '',
            },
            show: {
                loading: true,
                error: false,
                msg: '404',
            },
            response: [{
                title: '',
                description: '',
                options: [],
            }],
            options: [
                { text: null }
            ],
            user: {},
            voted: [],
            hasVoted: false,
        }
    },
    methods: {
        async enviar() {
            console.log("VOTO ENVIADO");
            this.show.loading = true;
            this.show.error = false;
            console.log(this.user.uuid);
            const body = {
                optNum: this.vote.optNum,
                id: this.idnum,
                uuidRes: this.user.uuid,
            }

            try {
                await $fetch('/api/vote/submitVote', {
                    method: "POST",
                    body,
                });
                this.show.loading = false;
                await reloadNuxtApp();
                
            } catch (error) {
                this.show.loading = false;
                this.show.error = true;
                this.show.msg = error;
                await refreshNuxtData();
            }


        },

    },
    async mounted() {
        this.show.loading = true;
        try {
            const { user, loggedIn } = await useUserSession();
            this.user = user.value;
            if (!loggedIn.value) {
                console.log("NO INICIADO")
                window.location.href = "/";
            }

            this.response = await $fetch(`/api/vote/getInfo/${this.idnum}`);
            this.options = JSON.parse(this.response[0].options);
            this.show.loading = false;
            this.voted = JSON.parse(this.response[0].voted);
            this.voted.forEach((item) => {
                try {
                    if (item.uuid == this.user.uuid) {
                        this.hasVoted = true;
                    }
                } catch (error) {
                    //
                }
            })
        } catch (error) {
            console.log(error);
            this.show.loading = false;
            this.show.error = true;
            this.show.msg = error;
        }



    },
}
</script>


<style scoped>
#btn {
    width: 11rem;
}
</style>
