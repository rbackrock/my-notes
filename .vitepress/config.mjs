import { defineConfig } from 'vitepress'
import glsl from 'vite-plugin-glsl'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [glsl()]
  },
  lang: 'zh-CN',
  title: 'rbackly 的笔记本',
  description: 'rbackly 的笔记本',
  srcDir: './src',
  outDir: './dist',
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  rewrites: {
    'posts/index.md': 'index.md'
  },
  markdown: {
    lineNumbers: true,
    math: true
  },
  themeConfig: {
    who: 'rbackly',
    notFoundMessage: 'Balls，找不到页面了',
    icp: '滇ICP备18008965号-1',
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar: [
      {
        category: 'C++基础语法',
        items: [
          {
            title: 'basics',
            link: '/posts/cpp-basic-syntax/basics'
          },
          {
            title: 'classes',
            link: '/posts/cpp-basic-syntax/classes'
          },
          {
            title: 'function',
            link: '/posts/cpp-basic-syntax/function'
          },
          {
            title: 'generic',
            link: '/posts/cpp-basic-syntax/generic'
          },
          {
            title: 'lambda',
            link: '/posts/cpp-basic-syntax/lambda'
          },
          {
            title: 'oop',
            link: '/posts/cpp-basic-syntax/oop'
          },
          {
            title: 'pointer',
            link: '/posts/cpp-basic-syntax/pointer'
          },
          {
            title: 'stl',
            link: '/posts/cpp-basic-syntax/stl'
          },
          {
            title: 'struct',
            link: '/posts/cpp-basic-syntax/struct'
          },
          
        ]
      },
      {
        category: '3D 相关练习和实验',
        items: [
          {
            title: '小场景#1',
            link: '/posts/3d/scene1'
          }
        ]
      },
      {
        category: 'Web3d',
        items: [
          {
            title: 'Blender 相关',
            link: '/posts/web3d/blender-about'
          },
          {
            title: 'Threejs 相关',
            link: '/posts/web3d/threejs-about'
          },
          {
            title: 'WebGL 着色器相关',
            link: '/posts/web3d/webgl-shader'
          }
        ]
      },
      {
        category: '开发备忘',
        items: [
          {
            title: '自己搭建内网穿透服务器',
            link: '/posts/dev-memo/build-behind-nat-firewall-local-server'
          },
          {
            title: '申请和配置免费 HTTPS',
            link: '/posts/dev-memo/tls-certificate'
          }
        ]
      },
      {
        category: '前端',
        items: [
          {
            title: 'JavaScript 小技巧',
            link: '/posts/frontend/javascript-skills'
          },
          {
            title: '节流和防抖',
            link: '/posts/frontend/throttle-and-debounce'
          },
          {
            title: '关于上传',
            link: '/posts/frontend/upload-about'
          },
          // {
          //   title: 'CSS 布局',
          //   link: '/posts/frontend/css-layout'
          // },
        ]
      },
      {
        category: '《汇编语言》第四版',
        items: [
          {
            title: '课后习题',
            link: '/posts/assembly-language-4th-edition/homework'
          },
          {
            title: '知识点',
            link: '/posts/assembly-language-4th-edition/knowledge'
          },
        ]
      },
    ]
  }
})
