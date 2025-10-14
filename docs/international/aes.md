---
title: AES 加密算法
icon: shield-halved
---

# AES 高级加密标准

AES 的详细介绍和使用方法。

## 算法特性

AES 是当前最广泛使用的对称加密算法。

## 使用示例

```typescript
import { AES } from '@smkit/core';

const aes = new AES();
const key = generateRandomKey(256); // 256-bit key
const encrypted = aes.encrypt(plaintext, key, { mode: 'GCM' });
```
