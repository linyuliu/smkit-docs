---
title: 示例代码
icon: code
order: 7
---

# SM2 示例代码

本文提供 SM2 算法的实用示例。

## 完整加密示例

```typescript
import { SM2 } from '@smkit/core';

// 创建实例
const sm2 = new SM2();

// 生成密钥对
const keyPair = sm2.generateKeyPair();

// 加密
const message = 'Hello, SM2!';
const ciphertext = sm2.encrypt(message, keyPair.publicKey);

// 解密
const plaintext = sm2.decrypt(ciphertext, keyPair.privateKey);

console.log('原文:', message);
console.log('解密:', plaintext);
```

## 数字签名示例

```typescript
import { SM2 } from '@smkit/core';

const sm2 = new SM2();
const keyPair = sm2.generateKeyPair();

// 签名
const data = 'Important document';
const signature = sm2.sign(data, keyPair.privateKey);

// 验签
const isValid = sm2.verify(data, signature, keyPair.publicKey);
console.log('签名验证:', isValid); // true
```
