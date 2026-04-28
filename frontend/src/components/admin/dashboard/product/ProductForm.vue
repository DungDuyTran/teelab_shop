<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Save, Image as ImageIcon, Box } from 'lucide-vue-next'

const props = defineProps<{
  isVisible: boolean
  isEditing: boolean
  formData: any
  selectedImgName: string
  selectedFileName: string
}>()

const emit = defineEmits(['close', 'submit', 'image-change', 'file-change'])

// local state (quan trọng để tránh mutate props trực tiếp)
const localFormData = ref<any>({})

// sync từ parent -> form
watch(
  () => props.formData,
  (newVal) => {
    localFormData.value = { ...newVal }
  },
  { immediate: true, deep: true },
)

// submit
const handleSubmit = () => {
  emit('submit', { ...localFormData.value })
}
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300"
      :class="isVisible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
    >
      <!-- overlay -->
      <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="emit('close')"></div>

      <!-- modal -->
      <div
        class="relative w-full max-w-4xl bg-[#09090b] rounded-2xl border border-[#27272a] shadow-2xl flex flex-col transition-all"
        :class="isVisible ? 'scale-100' : 'scale-95'"
      >
        <!-- header -->
        <div class="flex items-center justify-between p-6 border-b border-[#27272a]">
          <h2 class="text-xl font-bold uppercase text-white tracking-wide">
            {{ isEditing ? 'Cập nhật thông tin xe' : 'Thêm siêu xe mới' }}
          </h2>
          <button
            @click="emit('close')"
            class="text-gray-400 hover:text-white hover:bg-red-600/20 p-2 rounded-full"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- form -->
        <form @submit.prevent="handleSubmit" class="p-6 overflow-y-auto max-h-[75vh]">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- NAME -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Tên xe *</label>
              <input v-model="localFormData.name" type="text" required class="input" />
            </div>

            <!-- BRAND -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Brand</label>
              <input v-model="localFormData.brand" type="text" class="input" />
            </div>

            <!-- CATEGORY -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Danh mục *</label>
              <select v-model="localFormData.categoryId" required class="input">
                <option :value="1">Supercar</option>
                <option :value="2">Hypercar</option>
                <option :value="3">Sport</option>
              </select>
            </div>

            <!-- STOCK -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Tồn kho *</label>
              <input
                v-model.number="localFormData.stockQuantity"
                type="number"
                min="0"
                required
                class="input"
              />
            </div>

            <!-- PRICE -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Giá *</label>
              <input v-model.number="localFormData.price" type="number" required class="input" />
            </div>

            <!-- SALE -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Giá sale</label>
              <input v-model.number="localFormData.salePrice" type="number" class="input" />
            </div>

            <!-- IMAGE -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Ảnh *</label>
              <div class="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  @change="emit('image-change', $event)"
                  class="file-input"
                  :required="!isEditing && !localFormData.imageUrl"
                />
                <ImageIcon class="icon" />
                <p v-if="selectedImgName" class="text-green-400">
                  {{ selectedImgName }}
                </p>
                <p v-else class="text-gray-400">Upload ảnh</p>
              </div>
            </div>

            <!-- MODEL -->
            <div>
              <label class="text-xs text-gray-400 uppercase">Model 3D *</label>
              <div class="upload-box">
                <input
                  type="file"
                  accept=".glb"
                  @change="emit('file-change', $event)"
                  class="file-input"
                  :required="!isEditing && !localFormData.modelUrl"
                />
                <Box class="icon" />
                <p v-if="selectedFileName" class="text-green-400">
                  {{ selectedFileName }}
                </p>
                <p v-else class="text-gray-400">Upload model</p>
              </div>
            </div>

            <!-- DESCRIPTION -->
            <div class="md:col-span-2">
              <label class="text-xs text-gray-400 uppercase">Mô tả</label>
              <textarea v-model="localFormData.description" rows="3" class="input"></textarea>
            </div>
          </div>

          <!-- actions -->
          <div class="flex justify-end gap-3 mt-6 border-t border-[#27272a] pt-4">
            <button type="button" @click="emit('close')" class="btn-cancel">Hủy</button>
            <button type="submit" class="btn-save">
              <Save :size="16" />
              {{ isEditing ? 'Cập nhật' : 'Lưu' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.input {
  width: 100%;
  background: #18181b;
  border: 1px solid #27272a;
  color: white;
  padding: 10px;
  border-radius: 8px;
}

.upload-box {
  position: relative;
  border: 2px dashed #27272a;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.file-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.icon {
  color: #666;
  margin-bottom: 6px;
}

.btn-save {
  background: #dc2626;
  padding: 8px 16px;
  color: white;
  border-radius: 6px;
}

.btn-cancel {
  color: #aaa;
}
</style>
