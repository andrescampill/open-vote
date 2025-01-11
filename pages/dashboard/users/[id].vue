<template>
    <div id="content">
        <UserEditCard :userId="idNum"/>
    </div>
</template>

<script>
export default{
    data(){
        return{
            idNum: 0,
        }
    },
    mounted(){
        const route = useRoute();
        this.idNum = route.params.id;
    }
}
</script>

<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}
</style>