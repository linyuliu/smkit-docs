---
title: 解密过程
icon: unlock
---

# SM4 解密

SM4 对称解密的实现细节。

```typescript
import { SM4 } from '@smkit/core';

const sm4 = new SM4();
const plaintext = sm4.decrypt(ciphertext, key);
```
