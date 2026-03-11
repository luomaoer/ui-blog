const modules = import.meta.glob('./*/index.js', { eager: true })

const components = {}

// 遍历所有模块，提取并注册组件
for (const path in modules) {
  const module = modules[path]
  const componentName = Object.keys(module).find(key => key !== 'default')
  if (componentName) {
    components[componentName] = module[componentName]
  }
}


export { components }

// 提供一个 install 方法，以便通过 app.use() 全局注册
export default {
  install(app) {
    Object.keys(components).forEach(key => {
      app.component(key, components[key])
    })
  }
}
