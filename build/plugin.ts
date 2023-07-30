import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

const AutoRegistryComponents = () => {
    return Components({
        resolvers: [
            ElementPlusResolver({
                importStyle: true
            })
        ],
        dts: false,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    })
}

const AutoImportDeps = () => {
    return AutoImport({
        imports: ['vue'],
        dts: false
    })
}

const viteSvgs = () => {
    return createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons/svg')],
        symbolId: 'icon-[dir]-[name]'
    })
}

export const createVitePlugins = (): (PluginOption | PluginOption[])[] => {
    return [
        vue(),
        AutoRegistryComponents(),
        AutoImportDeps(),
        viteSvgs()
    ]
}