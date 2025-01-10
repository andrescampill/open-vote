<template>
    <div id="content">
        <div class="d-flex justify-content-center align-items-center" id="loading" v-if="show.loading">
            <div>
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>

            </div>
        </div>
        <div v-else>
            <h2>Detalles de la votación</h2>
            <VoteDetails :voteId="idNum" />
            <ResultCard :voteId="idNum" />
            <div class="d-flex justify-content-center mt-3 mb-5" v-if="!mobile">
                <div class="card" style="width: 40vw; height: 50vh;">
                    <div class="card-body">
                        <GraphCard :voteId="idNum" />
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
            idNum: null,
            show: {
                loading: true,
            },
            mobile: false,
        }
    },
    mounted() {
        const route = useRoute();
        this.idNum = route.params.id;
        this.show.loading = false;

        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i)) {     
            this.mobile = true;
        } 
        }
    }
</script>

<style scoped>
#content {
    width: 80vw;
    margin-left: 10vw;
}
</style>