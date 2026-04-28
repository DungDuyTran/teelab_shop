<script setup lang="ts">
import { useCarManagement } from '@/composables/useCarManagement'
import ProductHeader from '@/components/admin/dashboard/product/ProductHeader.vue'
import ProductTable from '@/components/admin/dashboard/product/ProductTable.vue'
import ProductShowroom from '@/components/admin/dashboard/product/ProductShowroom.vue'
import ProductForm from '@/components/admin/dashboard/product/ProductForm.vue'

const {
  cars,
  isLoading,
  deleteCar,
  carStore,
  isShowroomVisible,
  view3D,
  close3D,
  isFormVisible,
  isEditing,
  formData,
  openAddForm,
  openEditForm,
  closeForm,
  submitForm,
  selectedFileName,
  handleFileChange,
  selectedImgName,
  handleImageChange,
} = useCarManagement()
</script>

<template>
  <div class="relative min-h-screen bg-[#09090b]">
    <ProductHeader @open-add="openAddForm" />

    <ProductTable
      :cars="cars"
      :is-loading="isLoading"
      @view-3d="view3D"
      @edit-car="openEditForm"
      @delete-car="deleteCar"
    />

    <ProductShowroom
      :is-visible="isShowroomVisible"
      :selected-car="carStore.selectedCar"
      @close="close3D"
    />

    <ProductForm
      :is-visible="isFormVisible"
      :is-editing="isEditing"
      v-model:form-data="formData"
      :selected-img-name="selectedImgName"
      :selected-file-name="selectedFileName"
      @close="closeForm"
      @submit="submitForm($event)"
      @image-change="handleImageChange"
      @file-change="handleFileChange"
    />
  </div>
</template>
