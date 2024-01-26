import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  srcDir: './posts',
  outDir: '../dist',
  head: [
    [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
    ]
  ],
  markdown: {
    lineNumbers: true,
    math: true
  },
  themeConfig: {
    who: '-你的名字-',
    notFoundMessage: 'Balls, 发生404错误了',
    icp: '备案编号',
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar: [
      {
        category: '这是分类',
        items: [
          {
            title: 'Markdown 示例',
            link: '/example'
          }
        ]
      }
    ]
  }
})
