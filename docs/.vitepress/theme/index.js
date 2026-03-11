import DefaultTheme from 'vitepress/theme'
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
// import { TButton } from '../../../package/components/button/index.js'
import TComponents from '../../../package/components/index.js'
import "highlight.js/lib/common"
import hljsVuePlugin from "@highlightjs/vue-plugin/dist/highlightjs-vue.esm.min.js"
import DocsCodeDemo from "./components/docs-code-demo.vue"
export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.use(ElementPlus)
        // app.component('TButton', TButton)
        app.component("highlightjs", hljsVuePlugin.component)
        app.use(TComponents)
        app.component("DocsCodeDemo", DocsCodeDemo)
    }
}