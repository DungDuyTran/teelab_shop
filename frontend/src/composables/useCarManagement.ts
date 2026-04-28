import { ref } from 'vue'
import { useCarStore } from '@/stores/carStore'
import { useCar } from '@/composables/useCar'
import type { CarResponse } from '@/types/car'

export function useCarManagement() {
  const carStore = useCarStore()
  const { cars, isLoading, deleteCar, createCar, updateCar, uploadModel, uploadImage } = useCar()

  const isShowroomVisible = ref(false)

  const view3D = (car: CarResponse) => {
    carStore.setSelectedCar(car)
    isShowroomVisible.value = true
  }

  const close3D = () => {
    isShowroomVisible.value = false
  }

  const isFormVisible = ref(false)
  const isEditing = ref(false)
  const currentEditId = ref<number | null>(null)

  const initialFormState = {
    name: '',
    brand: '',
    price: 0,
    salePrice: 0,
    stockQuantity: 1,
    description: '',
    imageUrl: '',
    modelUrl: '',
    color: '#ffffff',
    categoryId: 1,
  }

  const formData = ref({ ...initialFormState })

  const selectedFile = ref<File | null>(null)
  const selectedFileName = ref('')

  const selectedImgFile = ref<File | null>(null)
  const selectedImgName = ref('')

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      selectedFile.value = target.files[0]
      selectedFileName.value = target.files[0].name
    }
  }

  const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      selectedImgFile.value = target.files[0]
      selectedImgName.value = target.files[0].name
    }
  }

  const resetFileState = () => {
    selectedFile.value = null
    selectedFileName.value = ''
    selectedImgFile.value = null
    selectedImgName.value = ''
  }

  const openAddForm = () => {
    isEditing.value = false
    currentEditId.value = null
    formData.value = { ...initialFormState }
    resetFileState()
    isFormVisible.value = true
  }

  const openEditForm = (car: CarResponse) => {
    isEditing.value = true
    currentEditId.value = car.id

    formData.value = {
      name: car.name,
      brand: car.brand || '',
      price: car.price,
      salePrice: car.salePrice || 0,
      stockQuantity: car.stockQuantity || 0,
      description: car.description,
      imageUrl: car.imageUrl || '',
      modelUrl: car.modelUrl,
      color: car.color,
      categoryId: car.categoryId,
    }

    resetFileState()
    isFormVisible.value = true
  }

  const closeForm = () => {
    isFormVisible.value = false
    resetFileState()
  }

  const submitForm = async (submittedData: any) => {
    try {
      let finalModelUrl = submittedData.modelUrl
      let finalImageUrl = submittedData.imageUrl

      // ✅ GIỮ LINK CŨ NẾU KHÔNG UPLOAD
      if (!selectedFile.value && isEditing.value) {
        finalModelUrl = formData.value.modelUrl
      }

      if (!selectedImgFile.value && isEditing.value) {
        finalImageUrl = formData.value.imageUrl
      }

      // ✅ UPLOAD MỚI
      if (selectedFile.value) {
        finalModelUrl = await uploadModel(selectedFile.value)
      }

      if (selectedImgFile.value) {
        finalImageUrl = await uploadImage(selectedImgFile.value)
      }

      const payload = {
        ...submittedData,
        modelUrl: finalModelUrl,
        imageUrl: finalImageUrl,
      }

      console.log('PAYLOAD:', payload)

      if (isEditing.value && currentEditId.value) {
        await updateCar(currentEditId.value, payload)
        alert('✅ Cập nhật thành công')
      } else {
        await createCar(payload)
        alert('✅ Thêm xe thành công')
      }

      closeForm()
    } catch (error) {
      console.error(error)
      alert('❌ Lưu thất bại - kiểm tra console')
    }
  }

  return {
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
  }
}
