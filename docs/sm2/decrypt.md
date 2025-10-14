---
title: 解密算法
icon: unlock
order: 4
---

# SM2 解密算法

本文介绍 SM2 私钥解密的过程。

## 解密步骤

使用私钥解密密文 $C = C_1 \| C_2 \| C_3$：

1. 从密文中提取 $C_1, C_2, C_3$
2. 计算 $S = [d_B]C_1$
3. 使用 KDF 派生密钥
4. 解密 $M = C_2 \oplus t$
5. 验证 $C_3$ 的正确性

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM2 } from '@smkit/core';

const sm2 = new SM2();
const plaintext = sm2.decrypt(ciphertext, privateKey);
console.log('明文:', plaintext);
```

@tab Java

```java
import cn.smkit.SM2;

SM2 sm2 = new SM2();
String plaintext = sm2.decrypt(ciphertext, privateKey);
System.out.println("明文: " + plaintext);
```

:::
