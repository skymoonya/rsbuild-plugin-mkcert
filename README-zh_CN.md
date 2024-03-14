# rsbuild-plugin-mkcert

使用 mkcert 为 rsbuild https 开发服务提供证书支持。

## 效果

<details>
  <summary>查看</summary>
  
  ![localhost](docs/assets/screenshot/localhost.png)

![127.0.0.1](docs/assets/screenshot/127.0.0.1.png)

![localhost](docs/assets/screenshot/localip.png)

</details>

## 快速开始

1. 安装依赖

```sh
yarn add rsbuild-plugin-mkcert -D
```

2. 配置 rsbuild.config.ts

```ts
import { defineConfig } from '@rsbuild/core'
import mkcert from 'rsbuild-plugin-mkcert'

// https://rsbuild.dev/zh/config/
export default defineConfig({
  plugins: [mkcert()]
})
```

## 参数
### hosts

自定义域名，默认使用 `localhost` + 本地 ip 列表。
### force

是否强制重新生成证书。

### autoUpgrade

是否自动升级 `mkcert`。

### source

指定 `mkcert` 的下载源，国内用户可以设置成 `coding` 从 coding.net 镜像下载，也可以提供一个自定义的 [BaseSource](plugin/mkcert/Source.ts)。

### mkcertPath

如果网络受限的话，可以指定一个本地的 `mkcert` 文件来代替网络下载。

### savePath

保存文件的路径，比如下载的 mkcert 程序以及生成的 CA 文件、私钥跟证书文件等等。默认值是 [PLUGIN_DATA_DIR](plugin/lib/constant.ts)

### keyFileName

私钥的文件名

### certFileName

证书的文件名

## 移动端设备使用

为了使证书在移动设备上被信任，你必须安装根证书 `rootCA.pem` 文件。可以使用 `mkcert -CAROOT` 命令打印它所在的文件夹。

在 iOS 上，你可以使用 AirDrop 隔空投送，或者用 CA 用电子邮件发给自己，或者从 HTTP 服务器上提供。打开后，你需要[在设置>已下载描述文件中安装配置文件](https://github.com/FiloSottile/mkcert/issues/233#issuecomment-690110809)，然后[对其启用完全信任](https://support.apple.com/zh-cn/HT204477)。

对于安卓系统，安装根证书 CA ，然后在你的应用程序的开发构建中启用用户根证书。见 [StackOverflow 的答案](https://stackoverflow.com/a/22040887/749014)。

## 显示插件的调试信息

设置环境变量 `DEBUG`=`rsbuild:plugin:mkcert`

## 更新日志

[CHANGELOG](CHANGELOG.md)

## 原理

使用 [mkcert](https://github.com/FiloSottile/mkcert) 安装本地 `CA` 证书，并为 [server.https](https://rsbuild.dev/zh/config/server/https) 生成服务端证书。

## 友情提示

1. 卸载 `CA` 证书：`mkcert -uninstall`

## 感谢

- [mkcert](https://github.com/FiloSottile/mkcert)
- [daquinoaldo/https-localhost](https://github.com/daquinoaldo/https-localhost)
- [vite-plugin-mkcert](https://github.com/liuweiGL/vite-plugin-mkcert)
