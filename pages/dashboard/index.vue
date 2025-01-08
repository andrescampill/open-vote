<template>
    <div id="content">
        <PermsRequire />


        <div class="d-flex justify-content-center align-items-center" id="loading" v-if="show.loading">
            <div>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>

            </div>
        </div>
        <div v-else-if="show.error" id="loading" class="d-flex justify-content-center align-items-center">
            <div class="alert alert-danger">
                Ha habido un error, por favor, intentelo de nuevo más tarde
            </div>
        </div>
        <div class="" v-else>
            <div class="d-block">
                <h2>{{ welcomeMsg }} {{ username }}</h2>
            </div>
            <div>
                <!--Información sobre votaciones-->
                <div class="d-flex justify-content-between mt-3">
                    <div class="card" style="width: 30vw;">
                        <div class="card-body">
                            <h4 class="card-title">Crea una votación:</h4>
                            <CreateVoteForm />
                        </div>
                    </div>
                    <div class="card" style="width: 45vw;">
                        <div class="card-body">
                            <LastVotes />
                            <a href="/dashboard/voting"><button class="btn btn-primary">Ver todas las
                                    votaciones</button></a>
                        </div>
                    </div>

                </div>
            </div>
            <hr>
            <div>
                <!--Información sobre usuarios-->
                <div class="d-flex justify-content-between">
                    <div>
                        <SignUpForm class="signUpForm"/>
                    </div>
                    <div class="card mb-5" style="width: 45vw; height: 55vh;;">
                        <div class="card-body">
                            <LastUsers />
                            <a href="/dashboard/users"><button class="btn btn-primary">Ver todos los
                                    usuarios</button></a>
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
            welcomeMsg: 'Buenos días',
            username: 'Cargando...',
            show: {
                loading: true,
                error: false,
            },
        }
    },
    beforeMount() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            try {
                const { user, fetch } = useUserSession();
                fetch();
                console.log(user.value.username);
                this.username = user.value.username;


            } catch (error) {
                console.log("Ha habido un error");
                this.show.error = true;
            }

        }
    },
    mounted() {
        this.show.loading = false;

        const hour = new Date().getHours();
        if (hour <= 12 && hour >= 7) {
            this.welcomeMsg = "Buenos días";
        } else if (hour > 12 && hour <= 20) {
            this.welcomeMsg = "Buenas tardes";
        } else {
            this.messwelcomeMsgage = "Buenas noches";
        }
    }
}

</script>

<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}

#loading {
    height: 80vh;
}
.signUpForm{
    height: 57vh;
    margin-top: -2vh !important;
}
</style>