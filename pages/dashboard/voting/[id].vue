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
            }
        }
    },
    mounted() {
        const route = useRoute();
        this.idNum = route.params.id;
        this.show.loading = false;
    }
}
</script>

<style scoped>
#content {
    width: 80vw;
    margin-left: 10vw;
}
</style>