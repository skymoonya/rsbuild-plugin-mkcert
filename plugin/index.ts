import { type RsbuildPlugin } from '@rsbuild/core'

import { PLUGIN_NAME } from './lib/constant'
import { getDefaultHosts } from './lib/util'
import Mkcert, { MkcertBaseOptions } from './mkcert/index'

export { BaseSource, type SourceInfo } from './mkcert/source'

export type MkcertPluginOptions = MkcertBaseOptions & {
  /**
   * The hosts that needs to generate the certificate.
   */
  hosts?: string[]
}

const plugin = (options: MkcertPluginOptions = {}): RsbuildPlugin => {
  return {
    name: PLUGIN_NAME,
    setup(api) {
      api.modifyRsbuildConfig(async (config, { mergeRsbuildConfig }) => {
        const { server } = config

        const { hosts = [], ...mkcertOptions } = options

        const mkcert = Mkcert.create({
          ...mkcertOptions
        })

        await mkcert.init()

        const allHosts = [...getDefaultHosts(), ...hosts]

        if (server?.host) {
          allHosts.push(server.host)
        }

        const uniqueHosts = Array.from(new Set(allHosts)).filter(Boolean)

        const certificate = await mkcert.install(uniqueHosts)
        const httpsConfig = {
          key: certificate.key && Buffer.from(certificate.key),
          cert: certificate.cert && Buffer.from(certificate.cert)
        }
        return mergeRsbuildConfig(config, {
          server: {
            https: httpsConfig
          }
        })
      })
    }
  }
}

export default plugin
