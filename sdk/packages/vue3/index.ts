import { init, InitOptions } from '@smooth_zhz/web-tracing-core'

const ZhzWebTracing = {
  install: (app: any, options: InitOptions) => init(options)
}

export default ZhzWebTracing
export * from '@smooth_zhz/web-tracing-core'
