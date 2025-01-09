<template>
    <div id="content">
        <h2 >Todas las votaciones: </h2>
        <div class="d-flex justify-content-center mt-3">
            <div class="spinner-border text-primary" role="status" v-if="show.loading">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div v-else>
                <div v-for="indVote in voteData">
                    <InfoCard :vote="indVote" />
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
                loading: true,
            },
            voteData: [],
        }
    },
    methods: {
        async getAll() {
            this.show.loading = true;
            try {
                const response = await $fetch('/api/vote/getAll');
                this.voteData = response;
                console.log(this.voteData);
            } catch (error){
                console.log(error);
            }
            this.show.loading = false;
        }
    },
    created() {
        this.show.loading = true;
        this.getAll();
    }
}
</script>

<style>
h2{
    position: sticky;
    top: 10vh;
}
</style>