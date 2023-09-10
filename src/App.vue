<script setup>
import DeviceItem from "@/components/Item.vue"
import { v4 as uuidv4 } from "uuid"
import { ref, reactive, onBeforeMount, onMounted } from "vue"

const device = ref("")
const devices = reactive([])
const StorageKey = "AUO-Device-List"

const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const addDevice = () => {
  if (device.value !== "") {
    const item = {
      id: uuidv4(),
      title: device.value,
    }
    devices.unshift(item)

    save(StorageKey, devices)
    
    device.value = ""
  }
}

const removeItem = (id) => {
  const index = devices.findIndex((device) => {
    return device.id === id
  })

  devices.splice(index, 1)
  save(StorageKey, devices)
}

onBeforeMount(() => {
  const saveDevices = JSON.parse(localStorage.getItem(StorageKey))
  devices.push(...saveDevices)
})

</script>

<template>
    <main class="container mx-auto">
      <header class="m-2">
        <h1 class="text-6xl font-thin select-none">TODO!</h1>
        <div class="font-semibold select-none text-neutral-600">simple and studid todo app</div>
      </header>
      <form class="px-10 py-12 bg-white shadow-sm">
        <section class="flex">
          <input 
            type="text" 
            placeholder="做點重要的事吧..." 
            class="w-full text-2xl focus:outline-none input-lg input input-bordered" 
            v-model="device"
          />
          <button @click.prevent="addDevice" class="text-xl btn-lg btn btn-neutral">新增</button>
        </section>
      </form>

      <section class="px-10 py-6 mt-4 bg-white">
        <ul>
          <DeviceItem
            @remove-auo-item="removeItem"
            v-for="d in devices"
            :device="d"
          />
        </ul>        
      </section>
    </main>
</template>

<style scoped></style>
