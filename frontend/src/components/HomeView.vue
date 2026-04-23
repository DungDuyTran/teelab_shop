<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel, Environment, ContactShadows } from '@tresjs/cientos'

const router = useRouter()
const carRef = shallowRef()

// Hiệu ứng nhún nhảy
const onRender = ({ clock }: any) => {
  if (carRef.value) {
    carRef.value.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.05
  }
}
</script>

<template>
  <div class="w-full h-screen bg-[#050505] text-white relative">
    <nav class="absolute top-0 w-full z-20 flex justify-between p-10 items-center">
      <div class="text-3xl font-black italic">TEELAB <span class="text-red-600">SHOP</span></div>
      <div class="flex gap-8">
        <button @click="router.push('/login')" class="font-bold uppercase text-sm">
          Đăng nhập
        </button>
        <button
          @click="router.push('/register')"
          class="bg-red-600 px-8 py-2 rounded-full font-bold uppercase text-sm"
        >
          Đăng ký
        </button>
      </div>
    </nav>

    <div class="absolute left-20 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <h1 class="text-[150px] font-black italic opacity-10 leading-none">FERRARI</h1>
      <h2 class="text-red-600 text-[100px] font-black italic leading-none mt-[-40px]">F40</h2>
      <button
        @click="router.push('/products')"
        class="mt-10 pointer-events-auto bg-white text-black px-10 py-4 font-bold uppercase text-xs tracking-widest hover:bg-red-600 hover:text-white transition"
      >
        Bộ sưu tập xe
      </button>
    </div>

    <div class="fixed inset-0 z-0">
      <TresCanvas shadows window-size @render="onRender">
        <TresPerspectiveCamera :position="[-8, 2, 8]" :fov="45" />
        <OrbitControls :target="[2.5, 0, 0]" :enable-pan="false" />

        <TresDirectionalLight :position="[5, 10, 5]" :intensity="3" />
        <TresAmbientLight :intensity="0.8" />

        <Suspense>
          <Environment preset="city" />
        </Suspense>

        <Suspense>
          <GLTFModel
            ref="carRef"
            path="http://localhost:8080/models/ferrari.glb"
            :scale="[2.5, 2.5, 2.5]"
            :position="[2.5, 0, 0]"
            draco
          />
        </Suspense>

        <ContactShadows
          :position="[2.5, -0.01, 0]"
          :opacity="1"
          :blur="2.5"
          :scale="20"
          color="#000000"
        />

        <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, -0.05, 0]">
          <TresPlaneGeometry :args="[100, 100]" />
          <TresMeshStandardMaterial color="#080808" :roughness="0.1" :metalness="0.8" />
        </TresMesh>
      </TresCanvas>
    </div>
  </div>
</template>
