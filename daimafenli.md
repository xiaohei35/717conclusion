#代码分离 code spliting

三种常用方法:
    入口起点: 使用entry选项手动分离代码(main中引入代码)
    防止重复: 使用CommonsChunkPlugin去重和分离chunk
    CDN引用: 使用第三方CDN链接来加载第三方库或框架(使用webpack的externals)

动态导入配置步骤:
    1.在webpack配置文件中output添加chunkFilename字段
        {chunkFilename:"[name].bundle.js"}
    2.支持语法动态, 安装babel插件babel-plugin-syntax-dynamic-import, 在babelrc中加插件：
        {
            "plugins":["syntax-dynamic-import]
        }
    3.使用react-loadable辅助工具：
        let LoadableComponent = Loadable({
            loader:()=>import('url'),
            loading(){
                return <Loading></Loading>
            }
        })
    4.优化
        在import函数一开始加上注释如: /* webpackChunkName: 'bar' */, 对应 chunkFilename的名字