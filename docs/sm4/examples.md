---
title: 示例代码
icon: code
---

# SM4 示例代码

实用的 SM4 使用示例。

## 文件加密

```typescript
import { SM4 } from '@smkit/core';
import fs from 'fs';

const sm4 = new SM4();
const key = '0123456789abcdeffedcba9876543210';

// 加密文件
const fileData = fs.readFileSync('file.txt');
const encrypted = sm4.encrypt(fileData, key);
fs.writeFileSync('file.txt.enc', encrypted);

// 解密文件
const encryptedData = fs.readFileSync('file.txt.enc');
const decrypted = sm4.decrypt(encryptedData, key);
fs.writeFileSync('file-decrypted.txt', decrypted);
```
