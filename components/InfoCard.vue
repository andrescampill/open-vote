<template>
    <div class="card mb-3">
        <div class="card-body" style="width: 40vw">
            <h5 class="card-title">
                <div class="d-flex justify-content-between">
                    <div>
                        Votación : {{ vote.title }}
                    </div>
                    <div>
                        <span v-if="active" class="badge rounded-pill text-bg-success">Activa</span>
                        <span v-else class="badge rounded-pill text-bg-danger ">Inactiva</span>
                    </div>
                </div>


            </h5>
            <p class="card-text">{{ vote.description }}</p>
        </div>
        <div class="card-footer">
            <div class="d-flex justify-content-between align-middle">
                <p class="text-secondary">#{{ vote.id }}</p>
                <a :href="'/dashboard/voting/' + vote.id"><button class="btn btn-primary"
                        @click="this.show.loading = true;">
                        <Icon name="material-symbols:edit" /> Editar
                    </button></a>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    props: {
        vote: Object
    },
    data() {
        return {
            active: false,
        }
    },
    mounted() {
        if (this.vote.active == 1) {
            this.active = true;
        } else {
            this.active = false;
        }
    }
}
</script>