<template>
    <div>
        <p>Choice selection</p>
        <p>{{text}}</p>
        <div class="row">

            <div class="col-6">
                <p>Upload Image</p>
                <button id = "upload_btn" type="button" class="btn btn-outline-primary" @click="upload">Upload Image</button>
            </div>
            <div class="col-6">
                <p>Build your colors pallets</p>
                <button id = "colors_btn" type="button" class="btn btn-outline-primary" @click="colorsChooser">Choose colors</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ActionSelection',
        props: {
            text: "",
            select: false,
        },
        methods: {
            upload: function(){
                this.select = true,
                this.text="upload"
            },
            colorsChooser: function(){
                this.select = true,
                 this.text="colorsChooser"
            },

        },
        components: {

        }
    }

</script>

<style>

</style>