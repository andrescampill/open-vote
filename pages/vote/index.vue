<template>
    <div class="d-flex">
        <div id="content">
            <div class="spinner-border text-primary" role="status" v-if="show.spinner">
                <span class="visually-hidden">Loading...</span>
            </div>
            <LoadingVotingCard v-for="vote in ids" v-else-if="show.loading" />
            <div v-for="voteLoaded in votingData" v-else>
                <VoteLinkCard :vote="voteLoaded" />
            </div>
        </div>
    </div>

</template>
<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}
</style>

<script>
export default {
    data() {
        return {
            show: {
                loading: true,
                spinner: true,
            },
            ids: [],
            votingData: [],

        }
    },
    methods: {
        async getActive() {
            try {
                this.ids = await $fetch('/api/vote/checkActive');
                this.show.spinner = false;
                this.show.loading = true;
                return this.ids;
            } catch (error) {
                console.log(error);
                this.show.loading = false;
                this.show.error = true;
            }
        },

        async getData() {
            try {
                const response = await this.getActive();
                var cnt = 0;
                response.forEach(async (vote) => {
                    try {
                        const data = await $fetch(`/api/vote/getInfo/${vote.id}`);
                        this.votingData[cnt] = data[0];
                        cnt++;
                    } catch (error) {
                        console.error(error);
                    }
                });
                this.show.spinner = false;
                this.show.loading = false;
                console.log("Todo los datos cargados");
                console.log(this.votingData);
            } catch (error) {
                console.error("ERROR", error);

            }
        }
    },
    created() {
        this.getActive();
    },
    mounted() {
        this.getData();
    }
}
</script>

<style>
#content{
    padding-bottom: 20vh;
}

@media only screen and (max-width: 768px) {
    .card{
        width: 80vw !important;
    }
}
</style>