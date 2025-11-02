import tailwindcss from "@tailwindcss/vite";

export default {
  ssrBuild: true,
  server: {
    fs: {
      allow: ['..']
    }
  },
  plugins: [tailwindcss()],
  ssr: {
    noExternal: [],
    external: []
  }
}
