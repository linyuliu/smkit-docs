---
home: true
icon: home
title: 首页
heroImage: /logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: SMKit
tagline: 安全、统一、现代化的加密算法工具集
actions:
  - text: 快速开始 💡
    link: ./guide/getting-started.html
    type: primary

  - text: 查看指南 📖
    link: ./guide/

highlights:
  - header: 中国商用密码算法
    description: 支持完整的国密算法体系，包括 SM2/SM3/SM4/SM9/ZUC
    image: /assets/image/shield.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: SM2 椭圆曲线公钥密码算法
        icon: key
        details: 支持加密/解密、签名/验证、密钥交换等功能
        link: /sm2/

      - title: SM3 密码杂凑算法
        icon: fingerprint
        details: 256位哈希算法，支持 HMAC 消息认证
        link: /sm3/

      - title: SM4 分组密码算法
        icon: lock
        details: 128位对称加密，支持多种工作模式（ECB、CBC、CTR、GCM）
        link: /sm4/

      - title: SM9 标识密码算法
        icon: id-card
        details: 基于身份的密码算法，简化证书管理
        link: /sm9/

      - title: ZUC 祖冲之序列密码算法
        icon: stream
        details: 流密码算法，支持 ZUC-128 和 ZUC-256
        link: /zuc/

  - header: 国际标准算法
    description: 扩展支持常用国际加密算法
    image: /assets/image/globe.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: AES
        icon: shield-halved
        details: 高级加密标准，支持 128/192/256 位密钥

      - title: RSA
        icon: key
        details: 非对称加密算法，支持加密和数字签名

      - title: SHA
        icon: fingerprint
        details: 安全哈希算法，支持 SHA-1/SHA-256/SHA-512

      - title: ECDSA
        icon: signature
        details: 椭圆曲线数字签名算法

  - header: 多语言支持
    description: 提供统一的 API 设计，支持前端和后端开发
    image: /assets/image/code.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: TypeScript/JavaScript
        icon: brands fa-js
        details: 完整的类型定义，支持浏览器和 Node.js 环境
        link: /typescript/

      - title: Java
        icon: brands fa-java
        details: 基于标准 JCA/JCE 架构，易于集成
        link: /java/

  - header: 核心特性
    description: 为什么选择 SMKit？
    image: /assets/image/features.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    features:
      - title: 🔐 安全可靠
        details: 严格遵循国家密码管理局和国际标准规范

      - title: 🎯 统一接口
        details: 多语言实现保持一致的 API 设计，降低学习成本

      - title: 🚀 高性能
        details: 优化的算法实现，支持硬件加速

      - title: 📦 开箱即用
        details: 简单的安装和配置，快速集成到项目中

      - title: 🔄 跨端兼容
        details: 支持前端、后端、移动端等多种运行环境

      - title: 📚 完善文档
        details: 详细的 API 文档和示例代码

      - title: 🧪 充分测试
        details: 完整的单元测试和集成测试覆盖

      - title: 🔓 开源免费
        details: MIT 许可证，可自由使用和修改

copyright: false
footer: MIT Licensed | Copyright © 2025 SMKit Team
---

## 快速上手

::: code-tabs#shell

@tab:active npm

```bash
npm install @smkit/core
```

@tab yarn

```bash
yarn add @smkit/core
```

@tab pnpm

```bash
pnpm add @smkit/core
```

:::

## 简单示例

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM4 } from '@smkit/core';

// SM4 加密
const sm4 = new SM4();
const key = '0123456789abcdeffedcba9876543210';
const plaintext = 'Hello, SMKit!';

const ciphertext = sm4.encrypt(plaintext, key);
console.log('密文:', ciphertext);

const decrypted = sm4.decrypt(ciphertext, key);
console.log('明文:', decrypted); // Hello, SMKit!
```

@tab Java

```java
import cn.smkit.SM4;

public class Demo {
    public static void main(String[] args) {
        // SM4 加密
        SM4 sm4 = new SM4();
        String key = "0123456789abcdeffedcba9876543210";
        String plaintext = "Hello, SMKit!";
        
        String ciphertext = sm4.encrypt(plaintext, key);
        System.out.println("密文: " + ciphertext);
        
        String decrypted = sm4.decrypt(ciphertext, key);
        System.out.println("明文: " + decrypted); // Hello, SMKit!
    }
}
```

:::

## 贡献者

感谢所有为 SMKit 做出贡献的开发者！

<Contributors repo="linyuliu/smkit-docs" />
