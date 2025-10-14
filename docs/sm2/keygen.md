---
title: 密钥生成
icon: key
order: 2
---

# SM2 密钥生成

本文介绍 SM2 密钥对的生成过程。

## 生成步骤

1. 随机生成私钥 $d \in [1, n-1]$
2. 计算公钥 $P = [d]G$

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM2 } from '@smkit/core';

const sm2 = new SM2();
const keyPair = sm2.generateKeyPair();
console.log('公钥:', keyPair.publicKey);
console.log('私钥:', keyPair.privateKey);
```

@tab Java

```java
import cn.smkit.SM2;

SM2 sm2 = new SM2();
SM2KeyPair keyPair = sm2.generateKeyPair();
System.out.println("公钥: " + keyPair.getPublicKey());
System.out.println("私钥: " + keyPair.getPrivateKey());
```

:::
