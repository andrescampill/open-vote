<template>
    <div class="d-flex justify-content-center">
        <div class="card mt-2" style="width: 30vw;">
            <div class="card-body">
                <h3 class="card-title placeholder-glow">
                    <span class="placeholder col-6"></span>
                </h3>
                <p class="card-text placeholder-glow">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                </p>

                <div class="d-flex justify-content-between">
                    <button class="btn btn-success m-1 disabled placeholder " id="btn" type="button"></button>
                    <button class="btn btn-danger m-1 disabled placeholder " id="btn" type="button"></button>
                    <button class="btn btn-secondary m-1 disabled placeholder " id="btn" type="button"></button>
                </div>

                <hr>
                <p class="card-text"><small class="text-body-secondary placeholder-glow">
                    <span class="placeholder col-1"></span>
                </small></p>
            </div>
        </div>
    </div>
</template>

<style scope>
#btn {
    width: 11rem;
}
</style>
