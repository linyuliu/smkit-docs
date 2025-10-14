import { defineUserConfig } from "vuepress";
import { webpackBundler } from "@vuepress/bundler-webpack";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/smkit-docs/",
  
  bundler: webpackBundler({
    scss: {},
    vue: {},
  }),
  
  lang: "zh-CN",
  title: "SMKit",
  description: "安全、统一、现代化的加密算法工具集",

  head: [
    // 引入自定义字体
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
    ["link", { 
      rel: "stylesheet", 
      href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" 
    }],
    ["link", { 
      rel: "stylesheet", 
      href: "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.1.0/style.css" 
    }],
    ["link", { 
      rel: "stylesheet", 
      href: "https://cdn.jsdelivr.net/gh/subframe7536/maple-font@v6.4/dist/web/all.min.css" 
    }],
  ],

  theme: hopeTheme({
    hostname: "https://smkit-docs.github.io",

    author: {
      name: "SMKit Team",
      url: "https://github.com/linyuliu",
    },

    iconAssets: "fontawesome-with-brands",

    logo: "/logo.svg",

    repo: "linyuliu/smkit-docs",

    docsDir: "docs",

    locales: {
      "/": {
        navbar: [
          "/",
          {
            text: "指南",
            icon: "lightbulb",
            link: "/guide/",
          },
          {
            text: "中国商用密码",
            icon: "shield",
            prefix: "/",
            children: [
              { text: "SM2 椭圆曲线公钥密码", link: "sm2/" },
              { text: "SM3 密码杂凑算法", link: "sm3/" },
              { text: "SM4 分组密码算法", link: "sm4/" },
              { text: "SM9 标识密码算法", link: "sm9/" },
              { text: "ZUC 祖冲之序列密码", link: "zuc/" },
            ],
          },
          {
            text: "国际算法",
            icon: "globe",
            link: "/international/",
          },
          {
            text: "语言实现",
            icon: "code",
            prefix: "/",
            children: [
              { text: "TypeScript", link: "typescript/" },
              { text: "Java", link: "java/" },
            ],
          },
        ],

        sidebar: {
          "/guide/": [
            {
              text: "指南",
              icon: "lightbulb",
              prefix: "",
              children: [
                "README.md",
                "getting-started.md",
                "features.md",
                "architecture.md",
              ],
            },
          ],
          "/sm2/": [
            {
              text: "SM2 椭圆曲线公钥密码算法",
              icon: "shield",
              prefix: "",
              children: [
                "README.md",
                "algorithm.md",
                "keygen.md",
                "encrypt.md",
                "decrypt.md",
                "sign.md",
                "verify.md",
                "examples.md",
              ],
            },
          ],
          "/sm3/": [
            {
              text: "SM3 密码杂凑算法",
              icon: "shield",
              prefix: "",
              children: [
                "README.md",
                "algorithm.md",
                "hash.md",
                "hmac.md",
                "examples.md",
              ],
            },
          ],
          "/sm4/": [
            {
              text: "SM4 分组密码算法",
              icon: "shield",
              prefix: "",
              children: [
                "README.md",
                "algorithm.md",
                "modes.md",
                "encrypt.md",
                "decrypt.md",
                "examples.md",
              ],
            },
          ],
          "/sm9/": [
            {
              text: "SM9 标识密码算法",
              icon: "shield",
              prefix: "",
              children: [
                "README.md",
                "algorithm.md",
                "keygen.md",
                "encrypt.md",
                "decrypt.md",
                "sign.md",
                "verify.md",
                "examples.md",
              ],
            },
          ],
          "/zuc/": [
            {
              text: "ZUC 祖冲之序列密码算法",
              icon: "shield",
              prefix: "",
              children: [
                "README.md",
                "algorithm.md",
                "keystream.md",
                "mac.md",
                "examples.md",
              ],
            },
          ],
          "/international/": [
            {
              text: "国际算法",
              icon: "globe",
              prefix: "",
              children: [
                "README.md",
                "aes.md",
                "rsa.md",
                "sha.md",
                "ecdsa.md",
              ],
            },
          ],
          "/typescript/": [
            {
              text: "TypeScript 实现",
              icon: "code",
              prefix: "",
              children: [
                "README.md",
                "installation.md",
                "quickstart.md",
                "api.md",
              ],
            },
          ],
          "/java/": [
            {
              text: "Java 实现",
              icon: "code",
              prefix: "",
              children: [
                "README.md",
                "installation.md",
                "quickstart.md",
                "api.md",
              ],
            },
          ],
        },

        footer: "MIT Licensed | Copyright © 2025 SMKit Team",
        displayFooter: true,
      },
    },

    plugins: {
      // 代码复制
      copyCode: {
        showInMobile: true,
      },

      // 版权信息
      copyright: {
        author: "SMKit Team",
        license: "MIT",
        global: true,
      },
    },
    
    // Markdown 配置
    markdown: {
      align: true,
      attrs: true,
      codeTabs: true,
      component: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      math: {
        type: "katex",
      },
      mermaid: true,
    },
  }),
});
