---
title: TypeScript 实现
icon: brands fa-js
---

# TypeScript/JavaScript 实现

SMKit 提供完整的 TypeScript/JavaScript 实现，支持浏览器和 Node.js 环境。

## 特性

::: tip TypeScript 优势
- ✅ **完整的类型定义**：提供准确的类型提示
- ✅ **模块化设计**：支持按需引入
- ✅ **零依赖**：核心库无外部依赖
- ✅ **跨平台**：浏览器和 Node.js 通用
:::

## 安装

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

## 快速开始

```typescript
import { SM2, SM3, SM4 } from '@smkit/core';

// SM4 对称加密
const sm4 = new SM4();
const encrypted = sm4.encrypt('Hello', '0123456789abcdef');

// SM3 哈希
const sm3 = new SM3();
const hash = sm3.hash('Hello');

// SM2 非对称加密
const sm2 = new SM2();
const keyPair = sm2.generateKeyPair();
```

## 浏览器支持

SMKit 支持所有现代浏览器：

| 浏览器 | 最低版本 |
| --- | --- |
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## 深入学习

::: tip 继续了解
- 📦 [安装配置](./installation.md)
- 🚀 [快速开始](./quickstart.md)
- 📚 [API 文档](./api.md)
:::
