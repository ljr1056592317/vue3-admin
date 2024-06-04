import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
    renderWithQiankun,
    qiankunWindow,
    type QiankunProps
} from 'vite-plugin-qiankun/dist/helper'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
const render = (container?: any) => {
    // 如果是在主应用的环境下就挂载到主应用的节点上，否则挂载到本地
    app.mount(container ? container : '#vue-app')
    // app.mount('#app')
}

const initQianKun = () => {
    renderWithQiankun({
        mount(props) {
            const { container } = props
            render(container)
        },
        bootstrap() { },
        unmount() {
            console.log('卸载');
            app.unmount()
        },
        update: function (props: QiankunProps): void | Promise<void> {
            throw new Error('Function not implemented.')
        }
    })
}

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()


