import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/reset.scss";
import * as Icons from "@element-plus/icons-vue";
import 'element-plus/theme-chalk/el-message.css';
import Draggable from 'vuedraggable'
import autoRegComp from '@/components/index'
import 'virtual:svg-icons-register'
import store from '@/store'

const app = createApp(App);

// register the element Icons component
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});

app.component('draggable', Draggable);
app.use(autoRegComp)
app.use(store)
app.mount("#app");
