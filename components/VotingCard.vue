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

            <div class="card mt-2" style="width: 40vw;">
                <div class="card-body">
                    <h3 class="card-title">{{ this.response[0].title }}</h3>
                    <p class="card-text">{{ this.response[0].description }}</p>

                    <div class="d-flex justify-content-between">
                        <button class="btn btn-success m-1 disabled" id="btn">A
                            favor</button>
                        <button class="btn btn-danger m-1 disabled" id="btn">En contra</button>
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

                <div class="d-flex justify-content-between" v-if="!per">
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
                <div v-else-if="max == 1">
                    <div v-for="(option, index) in options" class="mt-2">
                        <button class="btn btn-primary" type="button" data-bs-toggle="modal"
                            data-bs-target="#votingConfirmation"
                            @click.prevent="vote.opt = option.text; vote.optNum = index;">{{ option.text }}</button>
                    </div>
                </div>
                <div v-else>
                    <div class="mt-2" v-for="(option, index) in options">
                        <div class="form-check">
                            <input type="checkbox" class="form-check-input" value="index" :id="'opt' + index"
                                v-model="vote.optPer[index]">
                            <label :for="'opt' + index" class="form-check-label">{{ option.text }}</label>
                        </div>
                    </div>
                    <p>Puedes marcar como máximo {{ max }} opciones.</p>
                    <button class="mt-3 btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#votingPerConfirmation">Enviar votos</button>
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
                        <div class="alert m-3" :class="'alert-' + this.show.errorClass">

                            {{ show.msg }}.
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="votingPerConfirmation" tabindex="-1" aria-labelledby="" aria-hidden="true">
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
                        Usted ha elegido las siguientes opciones:
                        <ul>
                            <div v-for="(opt, index) in vote.optPer">
                                <li v-if="vote.optPer[index]">{{ options[index].text }}</li>
                            </div>
                        </ul>
                        <p>Puedes seleccionar como máximo: <b>{{ max }}</b> opciones</p>
                        <br>
                        <span class="text-body-secondary">#{{ idnum }}</span>
                    </div>
                    <div class="modal-footer" v-if="!this.show.loading">
                        <div v-if="!this.show.error">
                            <button type="button" class="btn btn-secondary me-3"
                                data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary" @click.prevent="sendPer()">
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
                        <div class="alert m-3" :class="'alert-' + this.show.errorClass">

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
                optPer: [],
            },
            show: {
                loading: true,
                error: false,
                msg: '404',
                errorClass: 'danger',
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
            per: false,
            max: 1,
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
                this.show.error = true;
                this.show.msg = "Su voto se ha guardado correctamente"
                this.show.errorClass = "success";
                setTimeout(async () => {
                    await reloadNuxtApp();
                }, 5000)
            } catch (error) {
                this.show.loading = false;
                this.show.error = true;
                this.show.errorClass = "danger";
                this.show.msg = "Ha habido un error y su voto no se ha podido guardar: " + error;
                await refreshNuxtData();
            }


        },
        async sendPer() {
            this.show.loading = true;
            var cnt = 0;
            this.vote.optPer.forEach((option) => {
                if (option == true) {
                    cnt++;
                }
            })
            if (cnt > this.max) {
                // The user selected more then they could:
                this.show.loading = false;
                this.show.error = true;
                this.show.errorClass = "danger";
                this.show.msg = "Debes seleccionar como máximo " + this.max + " opciones";
                setTimeout(() => {
                    this.show.error = false;
                }, 3000)
                await refreshNuxtData();
            } else {
                // If all vote selections are correct:
                var optIndex = [];
                console.log(this.vote.optPer);
                this.vote.optPer.forEach((option, index) => {
                    if (option == true) {
                        console.log("THIS INDEX IS TRUE: " + index);
                        optIndex.push(index);
                    }
                })
                try {
                    const body = {
                        opts: optIndex,
                        id: this.idnum,
                        uuidRes: this.user.uuid,
                    }
                    console.log(body);
                    await $fetch('/api/vote/submitPerVote', {
                        method: "POST",
                        body,
                    });
                    this.show.loading = false;
                    this.show.error = true;
                    this.show.msg = "Su voto se ha guardado correctamente"
                    this.show.errorClass = "success";
                    setTimeout(async () => {
                        await reloadNuxtApp();
                    }, 5000)
                } catch (error) {
                    this.show.loading = false;
                    this.show.error = true;
                    this.show.errorClass = "danger";
                    this.show.msg = "Ha habido un error y su voto no se ha podido guardar: " + error;
                    await refreshNuxtData();
                }
            }
        }

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
            console.log(this.response[0].options);
            this.options = JSON.parse(this.response[0].options);

            this.voted = JSON.parse(this.response[0].voted);
            this.voted.forEach((item) => {
                try {
                    if (item.uuid == this.user.uuid) {
                        this.hasVoted = true;
                    }
                } catch (error) {
                    //
                }
            });
            if (this.options[0].text == 'per') {
                // Is personalized
                this.max = this.options[0].value;
                console.log("VOTACIÓN PERSONALZIADA");
                this.options.splice(0, 1);
                this.per = true;
            };
            this.show.loading = false;
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

input[type='checkbox'] {
    width: 20px;
    height: 20px;
}
</style>
