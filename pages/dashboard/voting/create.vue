<template>
    <div id="content">
        <div class="d-flex justify-content-center">
            <div class="card" style="width: 40vw;">
                <div class="card-header d-flex justify-content-between align-middle">
                    <h5 class="card-title">Crear votación</h5>
                    <span class="badge text-bg-info" id="badge">Modo avanzado</span>
                </div>
                <div class="card-body">
                    <div v-if="this.show.loading" class="d-flex justify-content-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <div v-else>
                        <form>
                            <div class="mb-3">
                                <label for="titleInput" class="form-label">Título:</label>
                                <input type="text" class="form-control" id="titleInput" v-model="formData.title">
                            </div>
                            <div class="mb-3">
                                <label for="descInput" class="form-label">Descripción</label>
                                <textarea name="" id="descInput" class="form-control"
                                    v-model="formData.description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="optMode" clasS="form-label">Estilo de votación:</label>
                                <select id="optMode" class="form-select" v-model="formData.mode.type" required>
                                    <option value="0" selected>Seleccione un modo de votación</option>
                                    <option value="1">Normal (A favor, en contra, abstención)</option>
                                    <option value="2">Personalizada</option>
                                </select>
                            </div>
                            <div class="mb-3" v-if="formData.mode.type == 2">
                                <div class="mb-1 input-group" v-for="(opt, index) in formData.mode.options">
                                    <span class="input-group-text" id="opt1">Opción {{ index + 1 }}</span>
                                    <input type="text" class="form-control" id="opt1"
                                        v-model="formData.mode.options[index].text">
                                    <button class="btn btn-danger" @click.prevent="deleteRow(index)">
                                        <Icon name="material-symbols:delete" />
                                    </button>
                                </div>
                                <div class="mb-3">
                                    <button class="btn btn-success mt-1" @click.prevent="addRow()">
                                        <Icon name="material-symbols:add-2-rounded" />
                                    </button>
                                    <div class="mt-1 input-group">
                                        <span class="input-group-text">Número de votos: </span>
                                        <input type="number" name="" id="maxInput" class="form-control" v-model="formData.mode.max">
                                        <div class="form-text ms-2">Número de opciones que podrán seleccionar las personas votantes</div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-check form-switch">
                                    <input type="checkbox" id="activeInput" class="form-check-input"
                                        v-model="formData.active">
                                    <label for="activeInput" class="form-check-label">Permitir votos</label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary" @click.prevent="send()">
                        Crear
                    </button>
                    <div class="alert m-3" :class="'alert-' + show.alert.class" v-if="show.alert.visible">
                        {{ show.alert.msg }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                title: '',
                description: '',
                mode: {
                    type: 0,
                    options: [
                        {
                            text: "",
                        },
                        {
                            text: "",
                        }
                    ],
                    max: 1,
                },
                active: true,
            },
            show: {
                loading: false,
                alert: {
                    visible: false,
                    msg: '',
                    class: 'danger',
                }
            }
        }
    },
    methods: {
        addRow() {
            const last = this.formData.mode.options.length;
            this.formData.mode.options[last] = {
                text: ''
            }
        },
        deleteRow(index) {
            this.formData.mode.options.splice(index, 1);
        },
        async send() {
            this.show = {
                loading: true,
                alert: {
                    visible: false
                }
            };
            if (this.formData.title == '' || this.formData.title == undefined || this.formData.title == null) {
                this.show = {
                    loading: false,
                    alert: {
                        visible: true,
                        msg: 'Hace falta que introduzcas un título válido',
                        class: 'danger',
                    }
                }
                return 0;
            } else {
                // We check for the type, the description is optional
                console.log(this.formData.mode.type)
                if (this.formData.mode.type == 0) {
                    // The user didn't select an option
                    this.show = {
                        loading: false,
                        alert: {
                            visible: true,
                            msg: 'Tienes que seleccionar un modo de votación',
                            class: 'danger',
                        }
                    };
                    return 0;
                } else if (this.formData.mode.type == 1) {
                    // Normal vote
                    this.formData.mode.options = [
                        {
                            text: "A FAVOR",
                            value: 0,
                        },
                        {
                            text: "EN CONTRA",
                            value: 0,
                        },
                        {
                            text: "ABSTENCIÓN",
                            value: 0,
                        }
                    ];

                } else {
                    //Custom vote, need to check the individual options,
                    if (this.formData.mode.options.length <= 1) {
                        // There's 1 or 0 options, so we need to tell them to add at least 2
                        this.show = {
                            loading: false,
                            alert: {
                                visible: true,
                                msg: 'Necesitas añadir por lo menos 2 opciones.',
                                class: 'danger',
                            }
                        }
                        return;
                    } else if(this.formData.mode.options.length < this.formData.mode.max){
                        this.show = {
                            loading: false,
                            alert: {
                                visible: true,
                                msg: 'No es posible que haya más votos que opciones.',
                                class: 'danger',
                            }
                        }
                    }else {
                        const opt = [];
                        opt[0]={
                            text: 'per',
                            value: this.formData.mode.max,
                        }
                        // We know that is personalized cuz opt[0] have that property
                        var cnt = 1;
                        this.formData.mode.options.forEach((vote) => {
                            opt[cnt] = {
                                text: vote.text,
                                value: 0,
                            },
                                cnt++
                        });
                        this.formData.mode.options = opt;
                    }
                }
                //Fetch API to create
                try {
                    if (this.formData.active == true) {
                        this.formData.active = 1;
                    } else {
                        this.formData.active = 0;
                    }
                    const body = {
                        title: this.formData.title,
                        desc: this.formData.description,
                        active: this.formData.active,
                        opt: this.formData.mode.options,
                    }
                    console.log("Fetching")
                    await $fetch('/api/vote/create', {
                        method: "POST",
                        body
                    })
                    this.show = {
                        loading: false,
                        alert: {
                            visible: true,
                            msg: 'Se ha creado la votación correctamente',
                            class: 'success',
                        }
                    }
                } catch (error) {
                    this.show = {
                        loading: false,
                        alert: {
                            visible: true,
                            msg: 'Ha habido un error al crear la votación: ' + error,
                            class: 'danger',
                        }
                    };
                    return 0;
                }
            }
        }
    }
}
</script>

<style>
#content {
    width: 80vw;
    margin-left: 10vw;
}

#badge {
    font-size: 0.7rem !important;
    height: 3vh;
    align-content: center;
}
</style>