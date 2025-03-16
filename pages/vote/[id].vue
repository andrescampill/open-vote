<template>
    <div id="content" >
        <div class="d-flex justify-content-center m-5" id="prueba" v-if="show.loading">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <div v-else>
            <VotingCard :idnum="id" />
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            show: {
                loading: false,
            },
            id: 0,
        }
    },
    beforeMount() {
        const route = useRoute()
        this.show.loading = false;
        this.id = route.params.id;
    }
}
</script>

<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}

#prueba {
    height: 100vh;
}
</style>
