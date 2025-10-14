---
title: 哈希计算
icon: fingerprint
---

# SM3 哈希计算

介绍如何使用 SM3 计算消息哈希。

```typescript
import { SM3 } from '@smkit/core';

const sm3 = new SM3();
const hash = sm3.hash('Hello, World!');
console.log('哈希值:', hash);
```
