---
title: 签名算法
icon: signature
order: 5
---

# SM2 数字签名

本文介绍 SM2 数字签名算法。

## 签名流程

使用私钥对消息进行签名：

$$
\text{Signature} = (r, s)
$$

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM2 } from '@smkit/core';

const sm2 = new SM2();
const signature = sm2.sign(message, privateKey);
console.log('签名:', signature);
```

@tab Java

```java
import cn.smkit.SM2;

SM2 sm2 = new SM2();
String signature = sm2.sign(message, privateKey);
System.out.println("签名: " + signature);
```

:::
