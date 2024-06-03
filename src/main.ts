import './assets/main.css'

import { createApp, type ComponentOptionsBase, type ComponentPublicInstance } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

export async function bootstrap() {
    console.log('子应用启动ing...');
}

export async function mount(container: HTMLDivElement) {
    app.mount('#app');
}

export async function unmount() {
    app.unmount();
}

