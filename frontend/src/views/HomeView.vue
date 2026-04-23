<script setup lang="ts">
import { shallowRef } from 'vue'
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, GLTFModel, Environment, ContactShadows } from '@tresjs/cientos'
import { useRouter } from 'vue-router'

const router = useRouter()
const modelUrl = '/models/ferrari.glb'
const carRef = shallowRef()
</script>

<template>
  <div class="relative w-full h-screen bg-[#050505] overflow-hidden font-sans">
    <!-- overlay giữ nhẹ để tăng độ tối UI -->
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <nav
      class="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-8 bg-gradient-to-b from-black/80 to-transparent"
    >
      <div
        class="text-white text-3xl font-black italic tracking-tighter cursor-pointer"
        @click="router.push('/')"
      >
        TEELAB <span class="text-red-600">SHOP</span>
      </div>

      <div class="flex items-center gap-6">
        <button
          @click="router.push('/login')"
          class="text-white hover:text-red-500 font-bold uppercase text-sm tracking-widest transition"
        >
          ĐĂNG NHẬP
        </button>

        <button
          @click="router.push('/register')"
          class="bg-red-600 text-white px-8 py-2 rounded-full font-black uppercase text-sm tracking-widest hover:bg-red-700 transition transform hover:scale-105 shadow-lg shadow-red-600/20"
        >
          ĐĂNG KÝ
        </button>
      </div>
    </nav>

    <div class="absolute left-16 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div class="relative">
        <h1
          class="text-white text-[150px] font-black italic uppercase leading-[0.7] opacity-70 select-none tracking-tighter"
        >
          FERRARI
        </h1>

        <h2
          class="text-red-600 text-[120px] font-black italic uppercase leading-none mt-[-40px] drop-shadow-2xl"
        >
          F40
        </h2>
      </div>

      <p
        class="text-gray-400 mt-10 max-w-sm pointer-events-auto text-lg leading-relaxed border-l-2 border-red-600 pl-6 select-none"
      >
        Khám phá đỉnh cao công nghệ và thiết kế Ý, nơi hiệu năng và thẩm mỹ hòa quyện hoàn hảo trong
        từng đường nét...
      </p>
    </div>

    <!-- 3D -->
    <div class="absolute inset-0 z-0">
      <TresCanvas shadows power-preference="high-performance" :gl="{ toneMappingExposure: 0.55 }">
        <TresPerspectiveCamera :position="[-8, 4, 8]" :fov="50" />

        <OrbitControls
          :target="[1, 1, 0]"
          :enable-pan="false"
          :min-distance="1"
          :max-distance="13"
          :max-polar-angle="Math.PI / 2.1"
        />

        <!-- LIGHT (giảm lại cho tối) -->
        <TresDirectionalLight :position="[5, 10, 5]" :intensity="1.2" cast-shadow />
        <TresSpotLight
          :position="[0, 50, 0]"
          :intensity="8"
          :angle="0.4"
          :penumbra="1"
          cast-shadow
        />
        <TresAmbientLight :intensity="0.35" />

        <!-- FOG (tạo chiều sâu + làm nền tối dần) -->
        <TresFog color="#050505" :near="10" :far="40" />

        <!-- ENVIRONMENT (GIỮ CITY nhưng làm tối) -->
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
            ref="carRef"
            :path="'http://localhost:8080' + modelUrl"
            :scale="[2.8, 2.8, 2.8]"
            :position="[1, 0, 0]"
            :rotation="[0, Math.PI / 1, 0]"
            draco
          />
        </Suspense>

        <!-- SHADOW -->
        <ContactShadows
          :position="[3.3, -0.01, 0]"
          :opacity="0.9"
          :blur="2.5"
          :far="1"
          :scale="20"
        />

        <!-- FLOOR giữ lại (để xe không bay) -->
        <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, -0.05, 0]" receive-shadow>
          <TresPlaneGeometry :args="[100, 100]" />
          <TresMeshStandardMaterial color="#050505" :roughness="0.4" :metalness="0.8" />
        </TresMesh>
      </TresCanvas>
    </div>

    <div
      class="absolute bottom-10 right-10 z-10 text-white/40 text-[10px] font-mono tracking-[0.5em] uppercase"
    >
      Software Engineering 2026 | Trần Duy Dũng
    </div>
  </div>
</template>

<style scoped>
:deep(canvas) {
  cursor: grab;
}
:deep(canvas:active) {
  cursor: grabbing;
}

h2 {
  text-shadow: 0 0 50px rgba(220, 38, 38, 0.4);
}
</style>
