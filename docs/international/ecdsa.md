---
title: ECDSA 签名算法
icon: signature
---

# ECDSA 椭圆曲线数字签名

ECDSA 的详细介绍。

## 算法特性

ECDSA 基于椭圆曲线，提供高效的数字签名功能。

## 使用示例

```typescript
import { ECDSA } from '@smkit/core';

const ecdsa = new ECDSA('P-256');
const keyPair = ecdsa.generateKeyPair();
const signature = ecdsa.sign(message, keyPair.privateKey);
const isValid = ecdsa.verify(message, signature, keyPair.publicKey);
```
