<template>

</template>

<script>
export default {
    methods: {
        load() {
            const { user, fetch } = useUserSession();
            try {
                fetch();
                if(user.value.perm != true){
                    window.location.href = "/"
                }
            } catch (error) {
                window.location.href = "/"

            }
        }
    },
    beforeMount() {
        this.load();

    }
}

</script>