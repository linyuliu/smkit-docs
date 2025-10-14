---
title: RSA 加密算法
icon: key
---

# RSA 非对称加密

RSA 的详细介绍和使用方法。

## 算法特性

RSA 是最经典的非对称加密算法之一。

## 使用示例

```typescript
import { RSA } from '@smkit/core';

const rsa = new RSA();
const keyPair = rsa.generateKeyPair(2048);
const encrypted = rsa.encrypt(message, keyPair.publicKey);
const decrypted = rsa.decrypt(encrypted, keyPair.privateKey);
```
