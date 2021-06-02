<template>
    <transition name="modal" v-if="showModal">
        <div class="modal-mask">
            <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                <slot name="header">
                    {{ header }}
                </slot>
                </div>

                <div class="modal-body">
                <slot name="body">
                    {{ body }}
                </slot>
                </div>

                <div class="modal-footer">
                <slot name="footer">
                    <button class="modal-default-button" v-on:click="close()">
                    OK
                    </button>
                </slot>
                </div>
            </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',
        data() {
            return {
            show: false
            }
        },
        props: {
            header: String,
            body: String,
            footer: String,
            showModal: Boolean
        },
        methods: {
            close(){
                this.$emit('close-modal', false);
            }
        }
    }
</script>

<style lang="scss">
    @import '../assets/css/modal.css';
</style>
