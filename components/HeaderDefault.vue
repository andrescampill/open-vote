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
                        <a class="nav-link text-white" aria-current="page" href="/login"><Icon name="material-symbols:how-to-vote" style="color: white" />
                            Votar</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/login"><Icon name="material-symbols-light:inbox-text" style="color: white;" /> Resultados</a>
                    </li>
                </ul>
            </div>
            <NuxtLink to="/login" class="my-2 my-lg-0 "><button class="btn btn-success"><Icon name="material-symbols:person" style="color:white" /> Entrar</button></NuxtLink>
        </div>
    </nav>
</div>
</template>

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
