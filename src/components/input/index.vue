<template>
    <div>
        什么鬼
        {{attrs.props.label}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            slabel: '1title',
        }
    },
    
    props: ['attrs'],
    created() {
        console.log(this.attrs)
    },
}
</script>
