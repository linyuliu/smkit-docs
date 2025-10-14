---
title: 安装配置
icon: download
---

# TypeScript 安装配置

如何安装和配置 SMKit TypeScript 库。

## 安装

```bash
npm install @smkit/core
```

## 导入

```typescript
import { SM2, SM3, SM4 } from '@smkit/core';
```

## TypeScript 配置

确保 `tsconfig.json` 包含：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "node"
  }
}
```
