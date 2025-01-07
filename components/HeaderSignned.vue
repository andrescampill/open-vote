<template>
    <div id="navbar">
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="/">Sistema de voto</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white" aria-current="page" href="/vote"><Icon name="material-symbols:how-to-vote" style="color: white" />
                            Votar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#"><Icon name="material-symbols-light:inbox-text" style="color: white;" /> Resultados</a>
                    </li>
                    <li class="nav-item" v-if="perm">
                        <a href="/dashboard" class="nav-link text-white"><Icon name="pajamas:admin" style="color:white;" /> Panel</a>
                    </li>
                </ul>
            </div>
            <div class="dropdown">
                <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <Icon name="material-symbols:account-circle" style="color: white;" size="1rem"/>
                </button>
                <ul class="dropdown-menu">
                    <li><p class="dropdown-item">Bienvenidx {{ user.username }}</p></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a href="#" @click.prevent="logout" class="dropdown-item"><Icon name="ic:outline-log-out" /> Cerrar sesión</a></li>
                </ul>
            </div>
            
        </div>
    </nav>
</div>
</template>

<script setup>

const {user, clear, isLogged} = useUserSession(); 

const logout = () =>{
    clear();
    window.location.href = "/";
}

var perm = user.value.perm;
</script>

<style>
#navbar {
    background-color: #34ba28;
    width: 80vw;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 10vw;
    margin-bottom: 10px;
}
</style>
