export default {
  build: {
    cssTarget: ['chrome111', 'edge111', 'firefox114', 'safari16', 'ios16']
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
}
