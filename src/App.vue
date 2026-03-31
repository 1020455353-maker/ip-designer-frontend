<template>
  <div id="app">
    <a-layout style="min-height: 100vh">
      <a-layout-header style="background: #1890ff; padding: 0 50px">
        <div style="color: white; font-size: 20px; font-weight: bold; line-height: 64px">
          IP角色设计平台
        </div>
      </a-layout-header>
      <a-layout-content style="padding: 50px">
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        IP角色设计平台 ©2024
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
