import { defineConfig } from 'vitepress'
import path from 'path'
export default defineConfig({
    // ...
    title: 'longan的个人博客',
    description: "前端,web前端，vue,React,小程序，H5,taro,antd,ant design,docker,shell,linux",
    vite: {
        resolve: {
            alias: {
                '@components': path.resolve(__dirname, '../components')
            }
        }
    },
    themeConfig: {
        nav: [
            {
                text: "web前端",
                activeMatch: `^/(js|css|html|browser)/`,
                items: [
                    { text: 'js基础', link: '/js/this' },
                    { text: 'js设计模式', link: '/js/design/single' },
                    { text: 'css基础', link: '/css/bfc' },
                    { text: '浏览器事件循环', link: '/browser/eventloop' },
                    {
                        text: 'vue2', link: '/js/vue2/'
                    },
                    { text: '问题总结', link: '/js/qa/canvas' }
                ]
            },
            {
                text: 'http',
                activeMatch: '^/http/',
                items: [
                    { text: 'http缓存', link: '/http/cache' },
                    { text: 'http版本', link: '/http/version' },
                ]
            },
            {
                text: "桌面系统",
                activeMatch: `^/system/`,
                items: [
                    { text: 'windows', link: '/system/windows' },
                    { text: 'macos', link: '/system/macos' },
                    { text: 'linux', link: '/system/linux' }
                ]
            },
            {
                text: "工具",
                activeMatch: `^/tools/`,
                items: [
                    { text: 'ja-netfilter', link: '/tools/java-netfilter' },
                ]
            },

        ],
        sidebar: {
            '/js/': [
                {
                    text: '基础知识',
                    items: [
                        { text: 'this指向', link: '/js/this' },
                        { text: '高阶函数', link: '/js/higherOrderFunction' },
                        { text: '原型', link: '/js/prototype' },
                    ]
                },
                {
                    text: '设计模式',
                    items: [
                        { text: '单例模式', link: '/js/design/single', },
                        { text: '代理模式', link: '/js/design/proxy', },
                        { text: '发布订阅模式', link: '/js/design/subscribe', },
                        { text: '享元模式', link: '/js/design/share', },
                        { text: '职责链模式', link: '/js/design/chain', },
                        { text: '装饰器模式', link: '/js/design/decorate', },
                        { text: '状态模式', link: '/js/design/status', },
                        { text: '适配器模式', link: '/js/design/adapt', },
                    ]

                },
                {
                    text: 'vue2源码',
                    items: [
                        { text: '响应式原理', link: '/js/vue2/' },
                        { text: 'nextTick', link: '/js/vue2/nextTick' },
                        { text: 'Observe', link: '/js/vue2/observe' },
                        { text: 'Dep', link: '/js/vue2/dep' },
                        { text: 'Watcher', link: '/js/vue2/watcher' },
                    ],
                },
                {
                    text: '问题总结',
                    items: [
                        { text: 'canvas', link: '/js/qa/canvas' },
                        { text: 'wxjssdk', link: '/js/qa/wxjssdk' },
                        { text: '小程序', link: '/js/qa/miniapp' },
                    ]
                }
            ],
            '/css/': [
                {
                    text: '基础知识', items: [
                        { text: 'BFC', link: '/css/bfc' },
                        { text: '问题总结', link: '/css/qa' }
                    ]
                }
            ],
            '/system/': [
                {
                    text: 'windows',
                    link: '/system/windows',
                },
                {
                    text: 'macos',
                    link: '/system/macos',
                },
                {
                    text: 'linux',
                    link: '/system/linux',
                },

            ],
            '/http/': [
                {
                    text: 'http缓存',
                    link: '/http/cache'
                },
                {
                    text: 'http版本',
                    link: '/http/version'
                },

            ],
            '/tools/': [
                {text:'java-netfilter',link:'/tools/java-netfilter'}
            ],
            '/': [
                { text: '首页', link: '/' },
                { text: 'web前端', link: '/js/design/single' },
                { text: '桌面系统', link: '/system/linux' },
            ]
        },
        search: {
            provider: 'local'
        },
        footer: { copyright: `© ${(new Date()).getFullYear()} xintang xiao. All rights reserved.` },
        lastUpdated: {
            text: '更新于'
        },
        editLink: {
            pattern: 'https://github.com/xiaoxintang/next-blog/edit/main/:path',
            text: '在github上编辑此页面'
        }

    },
    lastUpdated: true,
    markdown: {
        container: {
            tipLabel: '提示',
            warningLabel: '警告',
            dangerLabel: '危险',
            infoLabel: '信息',
            detailsLabel: '详细信息'
        },

    }
})