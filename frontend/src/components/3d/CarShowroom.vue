<script setup lang="ts">
import { ref, computed } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel, Environment, ContactShadows } from '@tresjs/cientos'

const props = defineProps<{
  modelUrl: string
}>()

const backendUrl = 'http://localhost:8080'

const finalModelPath = computed(() => {
  if (!props.modelUrl) return ''
  if (props.modelUrl.startsWith('http')) return props.modelUrl
  return backendUrl + props.modelUrl
})

const controlsRef = ref<any>(null)
</script>

<template>
  <TresCanvas shadows alpha power-preference="high-performance" :gl="{ toneMappingExposure: 0.55 }">
    <!-- CAMERA -->
    <TresPerspectiveCamera :position="[-8, 4, 8]" :fov="50" />

    <!-- CONTROLS -->
    <OrbitControls
      ref="controlsRef"
      :target="[0, 1, 0]"
      :enable-pan="false"
      :min-distance="1"
      :max-distance="13"
      :max-polar-angle="Math.PI / 2.1"
      :auto-rotate="true"
      :auto-rotate-speed="1.0"
    />

    <!-- LIGHTING (GIỮ ĐẸP) -->
    <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.2" cast-shadow />
    <TresSpotLight :position="[0, 50, 0]" :intensity="8" :angle="0.4" :penumbra="1" cast-shadow />
    <TresAmbientLight :intensity="0.35" />
    <TresFog color="#050505" :near="10" :far="40" />

    <!-- ENV -->
    <Suspense>
      <Environment
        preset="city"
        background
        :backgroundBlurriness="0.7"
        :backgroundIntensity="0.35"
      />
    </Suspense>

    <!-- MODEL -->
    <Suspense>
      <GLTFModel
        :key="finalModelPath"
        :path="finalModelPath"
        :scale="[2.8, 2.8, 2.8]"
        :position="[0, 0, 0]"
        cast-shadow
      />
    </Suspense>

    <!-- SHADOW -->
    <ContactShadows :position="[0, -0.01, 0]" :opacity="0.9" :blur="2.5" :far="1" :scale="20" />

    <!-- GROUND -->
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, -0.05, 0]" receive-shadow>
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial color="#050505" :roughness="0.4" :metalness="0.8" />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
:deep(canvas) {
  width: 100% !important;
  height: 100% !important;
  cursor: grab;
}

:deep(canvas:active) {
  cursor: grabbing;
}
</style>
