declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // podés agregar más variables si hacés falta
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
