<script setup lang="ts">
import { ref, watch, onErrorCaptured } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel, Environment, ContactShadows } from '@tresjs/cientos'
onErrorCaptured((err) => {
  console.error('LỖI TẢI 3D:', err)
  alert('Phát hiện lỗi tải 3D: ' + err.message)
  return false // Ngăn lỗi lây lan
})
const props = defineProps<{
  modelUrl: string
  isActive: boolean // Nhận trạng thái Popup đóng hay mở
}>()

const backendUrl = 'http://localhost:8080'

// Ref để điều khiển OrbitControls
const controlsRef = ref()

// Theo dõi trạng thái isActive, nếu đóng popup thì tắt tự động xoay để nhẹ máy
watch(
  () => props.isActive,
  (active) => {
    if (controlsRef.value?.value) {
      controlsRef.value.value.autoRotate = active
    }
  },
  { immediate: true },
)
</script>

<template>
  <TresCanvas shadows alpha power-preference="high-performance" :gl="{ toneMappingExposure: 0.55 }">
    <TresPerspectiveCamera :position="[-8, 4, 8]" :fov="50" />

    <OrbitControls
      ref="controlsRef"
      :target="[0, 1, 0]"
      :enable-pan="false"
      :min-distance="1"
      :max-distance="13"
      :max-polar-angle="Math.PI / 2.1"
      auto-rotate
      :auto-rotate-speed="1.0"
    />

    <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.2" cast-shadow />
    <TresSpotLight :position="[0, 50, 0]" :intensity="8" :angle="0.4" :penumbra="1" cast-shadow />
    <TresAmbientLight :intensity="0.35" />
    <TresFog color="#050505" :near="10" :far="40" />

    <Suspense>
      <Environment
        preset="city"
        background
        :backgroundBlurriness="0.7"
        :backgroundIntensity="0.35"
      />
    </Suspense>

    <Suspense>
      <GLTFModel
        :key="props.modelUrl"
        :path="backendUrl + props.modelUrl"
        :scale="[2.8, 2.8, 2.8]"
        :position="[0, 0, 0]"
        draco
        cast-shadow
      />
    </Suspense>

    <ContactShadows :position="[0, -0.01, 0]" :opacity="0.9" :blur="2.5" :far="1" :scale="20" />
    <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, -0.05, 0]" receive-shadow>
      <TresPlaneGeometry :args="[100, 100]" />
      <TresMeshStandardMaterial color="#050505" :roughness="0.4" :metalness="0.8" />
    </TresMesh>
  </TresCanvas>
</template>

<style scoped>
:deep(canvas) {
  cursor: grab;
  /* Ép canvas luôn lấp đầy thẻ div cha */
  width: 100% !important;
  height: 100% !important;
}
:deep(canvas:active) {
  cursor: grabbing;
}
</style>
