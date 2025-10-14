---
title: 验签算法
icon: check
order: 6
---

# SM2 签名验证

本文介绍 SM2 签名验证算法。

## 验证流程

使用公钥验证签名的有效性。

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM2 } from '@smkit/core';

const sm2 = new SM2();
const isValid = sm2.verify(message, signature, publicKey);
console.log('验签结果:', isValid);
```

@tab Java

```java
import cn.smkit.SM2;

SM2 sm2 = new SM2();
boolean isValid = sm2.verify(message, signature, publicKey);
System.out.println("验签结果: " + isValid);
```

:::
