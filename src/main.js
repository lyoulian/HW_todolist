import "./assets/main.css"

import { createApp } from "vue"
import App from "./App.vue"
import ItemComponent from '@/components/Item.vue';

const app = createApp(App);
app.component('ItemComponent',ItemComponent);
app.mount("#app");
//createApp(App).mount("#app")
