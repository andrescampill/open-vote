<template>
    <div class="d-flex justify-content-center m-3">
        <div class="card" style="width: 30rem;">
            <div class="card-body">
                <h5 class="card-title">{{ vote.title }}</h5>
                <p class="card-text">{{ vote.description }}</p>
                <a :href="`/vote/${vote.id}`"><button class="btn btn-primary">Votar</button></a>
            </div>
            <div class="card-footer">
                <small><i>#{{ vote.id }}</i></small>
                <span class="badge text-bg-success ms-2" v-if="voted">Ya has votado</span>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    props: {
        vote: Object,

    },
    data(){
        return{
            voted: false,
        }
    },
    mounted(){
        try{
            const { user, fetch } = useUserSession();
            fetch();
            const userData = user.value;
            const uuid = JSON.parse(this.vote.voted);
            console.log(uuid);
            uuid.forEach(async (item) => {
                if(item.uuid === userData.uuid){
                    console.log(item);
                    this.voted = true;
                }
            })
        } catch (error){
            this.voted = false;
        }
    }
}
</script>