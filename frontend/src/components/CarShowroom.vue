<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel, Environment, ContactShadows } from '@tresjs/cientos'

const props = defineProps<{
  modelUrl: string
}>()

const backendUrl = 'http://localhost:8080'
</script>

<template>
  <TresCanvas shadows alpha>
    <TresPerspectiveCamera :position="[5, 2, 5]" :fov="45" />
    <OrbitControls
      enable-damping
      :max-polar-angle="Math.PI / 2"
      :min-distance="3"
      :max-distance="10"
    />

    <Suspense>
      <Environment preset="city" />
    </Suspense>

    <TresAmbientLight :intensity="1" />
    <TresDirectionalLight :position="[5, 5, 5]" :intensity="2" cast-shadow />

    <Suspense>
      <GLTFModel :path="backendUrl + props.modelUrl" draco />
    </Suspense>

    <ContactShadows :opacity="0.7" :blur="2.5" :far="1" :resolution="512" color="#000000" />
  </TresCanvas>
</template>
