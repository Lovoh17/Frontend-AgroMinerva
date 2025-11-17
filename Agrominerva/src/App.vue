<template>
  <Head>
    <title>AgroMinerva - Universidad de El Salvador</title>
    <meta name="description" content="Departamento de Agronomía de la Universidad de El Salvador">
  </Head>
  <AppToast />
  <ConfirmDialog /> 
  <MainLayout />
</template>

<script setup>
import MainLayout from './layouts/MainLayout.vue'
import AppToast from './components/common/AppToast.vue'
import ConfirmDialog from 'primevue/confirmdialog'
import { Head } from '@vueuse/head'
import { useSeo } from '@/utils/seo'

useSeo() 

</script>