<template>
    <div id="content">
        <h2>Créditos</h2>
        <div class="mt-5">
            <h4>Sobre la aplicación</h4>
            <p>Versión de la aplicación: <span class="badge text-bg-warning">{{ version }}</span></p>
            <p >Sistema de voto es una aplicación web de código abierto desarrollada con la intención de mejorar la capacidad de entidades para realizar votaciones online. Cuenta con funcionalidades básicas para administrar votaciones y usuarios.</p>
        </div>
        <div class="mt-3">
            <h4>Desarrollador</h4>
            <p>Open-vote es un proyecto de código abierto desarrollado por:</p>
            <ul>
                <li>Andrés Campillo</li>
            </ul>
        </div>
        <div class="mt-3">
            <p>Para más información, consulta el código fuente en GitHub: </p>
            <a href="https://github.com/andrescampill/open-vote">
            <button class="btn btn-secondary"><Icon name="mdi:github" /> <Icon name="octicon:logo-github-16" /></button>
        </a>
        </div>
        <div class="mt-5">
            <p>Este proyecto se encuentra bajo la licencia de uso GNU GENERAL PUBLIC LICENSE.</p>
        </div>
        
    </div>
</template>

<script>
export default{
    data(){
        return{
            version: '0.1.0-beta'
        }
    },
}
</script>

<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}</style>