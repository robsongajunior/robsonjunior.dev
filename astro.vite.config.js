export default {
  ssrBuild: true,
  server: {
    fs: {
      allow: ['..']
    }
  },
  ssr: {
    noExternal: [],
    external: []
  }
}
