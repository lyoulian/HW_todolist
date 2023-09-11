<script setup>
import TodoItem from "@/components/Item.vue"
import { v4 as uuidv4 } from "uuid"
import { ref, reactive, onBeforeMount, onMounted } from "vue"

const toDo = ref("")
const toDos = reactive([{id:"1",title:"...",completed: false}])
const StorageKey = "AUO-ToDo-List"
//const completed = ref(props.completed)
const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
}

const addtoDos = () => {
  if (toDo.value !== "") {
    const item = {
      id: uuidv4(),
      title: toDo.value,
    }
    toDos.unshift(item)

    save(StorageKey, toDos)
    
    toDo.value = ""
  }
}

const removeItem = (id) => {
  const index = toDos.findIndex((toDo) => {
    return toDo.id === id
  })

  toDos.splice(index, 1)
  save(StorageKey, toDos)
}

onBeforeMount(() => {
  const saveToDos = JSON.parse(localStorage.getItem(StorageKey))
  toDos.push(...saveToDos)
})

</script>

<template>
    <main class="container mx-auto">
      <header class="m-2">
        <h1 class="text-6xl font-thin select-none">TODO!</h1>
        <div class="font-semibold select-none text-neutral-600">simple and studid todo app test</div>
      </header>
      <form class="px-10 py-12 bg-white shadow-sm">
        <section class="flex">
          <input 
            type="text" 
            placeholder="做點重要的事吧..." 
            class="w-full text-2xl focus:outline-none input-lg input input-bordered" 
            v-model="toDo"
          />
          <button @click.prevent="addtoDos" class="text-xl btn-lg btn btn-neutral">新增</button>
        </section>
      </form>

      <section class="px-10 py-6 mt-4 bg-white">
        <ul>
          <TodoItem
            @remove-item="removeItem"
            v-for="d in toDos"
            :toDo="d"
          />
        </ul>        
      </section>
    </main>
</template>

<style scoped></style>
