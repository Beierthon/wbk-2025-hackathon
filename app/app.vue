<script setup lang="ts">
import { appName } from '~/config/site'

useHead({
  title: appName,
})
</script>

<template>
  <NuxtApp>
    <div class="bg-(--ui-bg)" vaul-drawer-wrapper>
      <VitePwaManifest />

      <NuxtLoadingIndicator :height="2" />

      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </NuxtApp>
</template>

<style>
* {
  font-family: IBM Plex Mono;
}
</style>
