export const getComponent = (moduleFiles, path) => {
  const key = Object.keys(moduleFiles).find(i => i.endsWith(`/examples/${path}.vue`)) 
  return moduleFiles[key]?.default
}
