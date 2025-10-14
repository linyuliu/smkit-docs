---
title: 快速开始
icon: rocket
---

# TypeScript 快速开始

快速上手 SMKit TypeScript 库。

## 基本用法

```typescript
import { SM4 } from '@smkit/core';

const sm4 = new SM4();
const encrypted = sm4.encrypt('Hello', 'key');
const decrypted = sm4.decrypt(encrypted, 'key');
```

## 异步操作

```typescript
import { SM2 } from '@smkit/core';

async function example() {
  const sm2 = new SM2();
  const keyPair = await sm2.generateKeyPairAsync();
  return keyPair;
}
```
