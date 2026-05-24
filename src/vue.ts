import type { App, Plugin } from 'vue'
import { Instruckt } from './instruckt'
import type { InstrucktConfig } from './types'

export type { InstrucktConfig }

const InstrucktPlugin: Plugin<InstrucktConfig> = {
  install(app: App, config: InstrucktConfig) {
    if (typeof window === 'undefined') return

    if (process.env.NODE_ENV !== 'development') return

    const instance = new Instruckt(config)
    app.config.globalProperties.$instruckt = instance

    const unmount = app.unmount.bind(app)
    app.unmount = () => {
      instance.destroy()
      unmount()
    }
  },
}

export default InstrucktPlugin
