---
title: HMAC 消息认证码
icon: shield
---

# SM3-HMAC

基于 SM3 的消息认证码。

```typescript
import { SM3 } from '@smkit/core';

const sm3 = new SM3();
const hmac = sm3.hmac('message', 'secret-key');
console.log('HMAC:', hmac);
```
