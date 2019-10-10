<template>
    <keep-alive>
        <transition>
        <router-view/>
        </transition>
    </keep-alive>
</template>

<style>
.v-enter{
opacity: 0;
}
.v-enter-to{
opacity: 1;
}
.v-enter-active{
transition: all 2s ease;
}
</style>