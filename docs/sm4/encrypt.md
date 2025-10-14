---
title: 加密过程
icon: lock
---

# SM4 加密

SM4 对称加密的实现细节。

```typescript
import { SM4 } from '@smkit/core';

const sm4 = new SM4();
const ciphertext = sm4.encrypt(plaintext, key);
```
