---
title: 示例代码
icon: code
---

# SM3 示例代码

实用的 SM3 使用示例。

## 文件哈希

```typescript
import { SM3 } from '@smkit/core';
import fs from 'fs';

const sm3 = new SM3();
const fileData = fs.readFileSync('file.dat');
const hash = sm3.hash(fileData);
console.log('文件哈希:', hash);
```
