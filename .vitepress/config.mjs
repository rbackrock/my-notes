import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  srcDir: './src',
  outDir: '../dist',
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
    notFoundMessage: 'Balls, 发生404错误了',
    icp: '滇ICP备18008965号-1',
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar: [
      {
        category: '示例',
        items: [
          {
            title: 'Markdown 示例',
            link: '/posts/example'
          }
        ]
      },
      {
        category: '3D练习',
        items: [
          {
            title: '小场景#1',
            link: '/posts/3d/scene1'
          }
        ]
      }
    ]
  }
})
