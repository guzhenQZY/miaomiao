<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
    export default {
        name : 'Scroller',
        props : {
            handleToScroll : {
                type : Function,
                default : function(){}
            },
            handleTouchEnd : {
                type : Function,
                default : function(){}
            }
        },
        mounted () {
            var scroll=new BScroll(this.$refs.wrapper,{
                //配置scroll内容
                tap : true,
                probeType: 1,
                scrollX : true,
            });

            this.scroll=scroll;

            scroll.on('scroll',(pos)=>{
                this.handleToScroll(pos);
            });

            scroll.on('touchEnd',(pos)=>{
                this.handleTouchEnd(pos);
            });
        },
        methods : {
            toScrollTop(el){
                this.scroll.scrollToElement(el);//设置移动到元素位置
            }
        }
    }
</script>

<style scoped>
   .wrapper{ height: 100%;}
</style>