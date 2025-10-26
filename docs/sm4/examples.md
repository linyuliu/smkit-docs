---
title: 示例代码
icon: code
---

# SM4 示例代码

实用的 SM4 使用示例，涵盖各种工作模式和应用场景。

## 基本加密

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt } from 'smkit';

// 密钥（128位，32个十六进制字符）
const key = '0123456789abcdeffedcba9876543210';

// 加密
const plaintext = 'Hello, SM4! 你好，国密！';
const ciphertext = sm4Encrypt(key, plaintext);
console.log('密文:', ciphertext);

// 解密
const decrypted = sm4Decrypt(key, ciphertext);
console.log('明文:', decrypted); // Hello, SM4! 你好，国密！

// 使用面向对象 API
import { SM4 } from 'smkit';

const sm4 = SM4.ECB(key);
const encrypted = sm4.encrypt('Hello, SM4!');
const plain = sm4.decrypt(encrypted);
console.log('解密:', plain);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;

// 密钥（128位，32个十六进制字符）
String key = "0123456789abcdeffedcba9876543210";

// 加密（默认 ECB 模式）
String plaintext = "Hello, SM4! 你好，国密！";
String ciphertext = SM4Util.encrypt(key, plaintext);
System.out.println("密文: " + ciphertext);

// 解密
String decrypted = SM4Util.decrypt(key, ciphertext);
System.out.println("明文: " + decrypted); // Hello, SM4! 你好，国密！

// 使用面向对象 API
import io.github.smkit.sm4.SM4;

SM4 sm4 = new SM4().setKey(key).setMode("ECB");
String encrypted = sm4.encrypt("Hello, SM4!");
String plain = sm4.decrypt(encrypted);
System.out.println("解密: " + plain);
```

:::

## ECB 模式

电子密码本模式，最简单但不推荐用于大量数据：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode, PaddingMode } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';

// ECB 模式加密
const message = '重要数据';
const ciphertext = sm4Encrypt(key, message, {
  mode: CipherMode.ECB,
  padding: PaddingMode.PKCS7
});

// 解密
const plaintext = sm4Decrypt(key, ciphertext, {
  mode: CipherMode.ECB,
  padding: PaddingMode.PKCS7
});

console.log('解密结果:', plaintext);

// 使用工厂方法
import { SM4 } from 'smkit';

const sm4 = SM4.ECB(key);
const ct = sm4.encrypt('数据');
const pt = sm4.decrypt(ct);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.Map;

String key = "0123456789abcdeffedcba9876543210";

// ECB 模式加密
String message = "重要数据";
Map<String, Object> options = Map.of(
    "mode", "ECB",
    "padding", "PKCS7"
);

String ciphertext = SM4Util.encrypt(key, message, options);

// 解密
String plaintext = SM4Util.decrypt(key, ciphertext, options);
System.out.println("解密结果: " + plaintext);

// 使用面向对象 API
import io.github.smkit.sm4.SM4;

SM4 sm4 = new SM4()
    .setKey(key)
    .setMode("ECB")
    .setPadding("PKCS7");
    
String ct = sm4.encrypt("数据");
String pt = sm4.decrypt(ct);
```

:::

::: warning 安全提示
ECB 模式不推荐用于生产环境，相同的明文块会产生相同的密文块，存在安全风险。推荐使用 CBC、CTR 或 GCM 模式。
:::

## CBC 模式

密码分组链接模式，推荐的通用模式：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode, PaddingMode } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';
const iv = 'fedcba98765432100123456789abcdef'; // 初始向量（128位）

// CBC 模式加密
const message = '敏感信息需要保护';
const ciphertext = sm4Encrypt(key, message, {
  mode: CipherMode.CBC,
  padding: PaddingMode.PKCS7,
  iv
});

console.log('密文:', ciphertext);

// 解密
const plaintext = sm4Decrypt(key, ciphertext, {
  mode: CipherMode.CBC,
  padding: PaddingMode.PKCS7,
  iv
});

console.log('明文:', plaintext);

// 使用工厂方法
import { SM4 } from 'smkit';

const sm4 = SM4.CBC(key, iv);
const encrypted = sm4.encrypt('数据');
const decrypted = sm4.decrypt(encrypted);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.Map;

String key = "0123456789abcdeffedcba9876543210";
String iv = "fedcba98765432100123456789abcdef"; // 初始向量（128位）

// CBC 模式加密
String message = "敏感信息需要保护";
Map<String, Object> options = Map.of(
    "mode", "CBC",
    "padding", "PKCS7",
    "iv", iv
);

String ciphertext = SM4Util.encrypt(key, message, options);
System.out.println("密文: " + ciphertext);

// 解密
String plaintext = SM4Util.decrypt(key, ciphertext, options);
System.out.println("明文: " + plaintext);

// 使用面向对象 API
import io.github.smkit.sm4.SM4;

SM4 sm4 = new SM4()
    .setKey(key)
    .setMode("CBC")
    .setIv(iv)
    .setPadding("PKCS7");
    
String encrypted = sm4.encrypt("数据");
String decrypted = sm4.decrypt(encrypted);
```

:::

## CTR 模式

计数器模式，流密码模式，支持并行处理：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';
const counter = '00000000000000000000000000000000'; // 计数器初始值

// CTR 模式加密（无需填充）
const message = '流密码模式数据';
const ciphertext = sm4Encrypt(key, message, {
  mode: CipherMode.CTR,
  iv: counter
});

// 解密
const plaintext = sm4Decrypt(key, ciphertext, {
  mode: CipherMode.CTR,
  iv: counter
});

console.log('明文:', plaintext);

// 使用工厂方法
import { SM4 } from 'smkit';

const sm4 = SM4.CTR(key, counter);
const encrypted = sm4.encrypt('数据');
const decrypted = sm4.decrypt(encrypted);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.Map;

String key = "0123456789abcdeffedcba9876543210";
String counter = "00000000000000000000000000000000"; // 计数器初始值

// CTR 模式加密（无需填充）
String message = "流密码模式数据";
Map<String, Object> options = Map.of(
    "mode", "CTR",
    "iv", counter
);

String ciphertext = SM4Util.encrypt(key, message, options);

// 解密
String plaintext = SM4Util.decrypt(key, ciphertext, options);
System.out.println("明文: " + plaintext);

// 使用面向对象 API
import io.github.smkit.sm4.SM4;

SM4 sm4 = new SM4()
    .setKey(key)
    .setMode("CTR")
    .setIv(counter);
    
String encrypted = sm4.encrypt("数据");
String decrypted = sm4.decrypt(encrypted);
```

:::

::: tip CTR 模式优势
- 支持并行加密和解密
- 不需要填充
- 可以随机访问加密数据
- 适合流式数据处理
:::

## GCM 模式

认证加密模式，同时提供加密和完整性验证：

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';
const iv = '000000000000000000000000'; // GCM 使用 96位 IV

// 可选的附加认证数据（AAD）
const aad = 'Additional Authenticated Data';

// GCM 模式加密
const message = '需要认证加密的数据';
const result = sm4Encrypt(key, message, {
  mode: CipherMode.GCM,
  iv,
  aad
});

console.log('密文:', result.ciphertext);
console.log('认证标签:', result.tag);

// 解密和验证
const plaintext = sm4Decrypt(key, result, {
  mode: CipherMode.GCM,
  iv,
  aad
});

console.log('明文:', plaintext);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import io.github.smkit.SmKitUtil;
import java.util.Map;

String key = "0123456789abcdeffedcba9876543210";
String iv = "000000000000000000000000"; // GCM 使用 96位 IV

// 可选的附加认证数据（AAD）
byte[] aad = "Additional Authenticated Data".getBytes();

// GCM 模式加密
String message = "需要认证加密的数据";
Map<String, Object> options = Map.of(
    "mode", "GCM",
    "iv", iv,
    "aad", aad,
    "tagLength", 128
);

String ciphertext = SM4Util.encrypt(key, message, options);

// 解密和验证
String plaintext = SM4Util.decrypt(key, ciphertext, options);
System.out.println("明文: " + plaintext);

// 使用面向对象 API
import io.github.smkit.sm4.SM4;

SM4 sm4 = new SM4()
    .setKey(key)
    .setMode("GCM")
    .setIv(iv)
    .setAad(aad)
    .setTagLength(128);
    
String encrypted = sm4.encrypt("数据");
String decrypted = sm4.decrypt(encrypted);
```

:::

::: tip GCM 模式优势
- ✅ 认证加密（AEAD）：同时保证机密性和完整性
- ✅ 高性能：支持硬件加速
- ✅ 并行处理：加密和解密可并行
- ✅ 防篡改：自动检测数据是否被修改
:::

## 文件加密

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode } from 'smkit';
import * as fs from 'fs';
import * as crypto from 'crypto';

// 生成随机密钥和 IV
const key = crypto.randomBytes(16).toString('hex');
const iv = crypto.randomBytes(16).toString('hex');

console.log('密钥:', key);
console.log('IV:', iv);

// === 加密文件 ===

// 读取文件
const fileData = fs.readFileSync('document.pdf');
const fileHex = fileData.toString('hex');

// 使用 CBC 模式加密
const encrypted = sm4Encrypt(key, fileHex, {
  mode: CipherMode.CBC,
  iv
});

// 保存加密文件
fs.writeFileSync('document.pdf.enc', encrypted);
console.log('文件已加密');

// === 解密文件 ===

// 读取加密文件
const encryptedData = fs.readFileSync('document.pdf.enc', 'utf-8');

// 解密
const decrypted = sm4Decrypt(key, encryptedData, {
  mode: CipherMode.CBC,
  iv
});

// 转换回二进制并保存
const decryptedBuffer = Buffer.from(decrypted, 'hex');
fs.writeFileSync('document-decrypted.pdf', decryptedBuffer);
console.log('文件已解密');
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import io.github.smkit.SmKitUtil;
import java.nio.file.*;
import java.security.SecureRandom;
import java.util.Map;

// 生成随机密钥和 IV
SecureRandom random = new SecureRandom();
byte[] keyBytes = new byte[16];
byte[] ivBytes = new byte[16];
random.nextBytes(keyBytes);
random.nextBytes(ivBytes);

String key = SmKitUtil.bytesToHex(keyBytes);
String iv = SmKitUtil.bytesToHex(ivBytes);

System.out.println("密钥: " + key);
System.out.println("IV: " + iv);

// === 加密文件 ===

// 读取文件
byte[] fileData = Files.readAllBytes(Paths.get("document.pdf"));
String fileHex = SmKitUtil.bytesToHex(fileData);

// 使用 CBC 模式加密
Map<String, Object> options = Map.of(
    "mode", "CBC",
    "iv", iv
);

String encrypted = SM4Util.encrypt(key, fileHex, options);

// 保存加密文件
Files.write(Paths.get("document.pdf.enc"), encrypted.getBytes());
System.out.println("文件已加密");

// === 解密文件 ===

// 读取加密文件
String encryptedData = Files.readString(Paths.get("document.pdf.enc"));

// 解密
String decrypted = SM4Util.decrypt(key, encryptedData, options);

// 转换回二进制并保存
byte[] decryptedBytes = SmKitUtil.hexToBytes(decrypted);
Files.write(Paths.get("document-decrypted.pdf"), decryptedBytes);
System.out.println("文件已解密");
```

:::

## 数据库字段加密

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode } from 'smkit';

// 密钥管理（实际应用中应使用密钥管理服务）
const DB_ENCRYPT_KEY = process.env.DB_ENCRYPT_KEY || 'your-secret-key-here-32-chars';
const IV = 'fedcba98765432100123456789abcdef';

// 加密数据库字段
function encryptField(value: string): string {
  return sm4Encrypt(DB_ENCRYPT_KEY, value, {
    mode: CipherMode.CBC,
    iv: IV
  });
}

// 解密数据库字段
function decryptField(encryptedValue: string): string {
  return sm4Decrypt(DB_ENCRYPT_KEY, encryptedValue, {
    mode: CipherMode.CBC,
    iv: IV
  });
}

// 使用示例
interface User {
  id: number;
  username: string;
  email: string;
  phone: string; // 需要加密
  idCard: string; // 需要加密
}

// 保存用户时加密敏感字段
const user: User = {
  id: 1,
  username: 'zhangsan',
  email: 'zhangsan@example.com',
  phone: '13800138000',
  idCard: '110101199001011234'
};

const encryptedUser = {
  ...user,
  phone: encryptField(user.phone),
  idCard: encryptField(user.idCard)
};

console.log('加密后:', encryptedUser);

// 从数据库读取后解密
const decryptedUser = {
  ...encryptedUser,
  phone: decryptField(encryptedUser.phone),
  idCard: decryptField(encryptedUser.idCard)
};

console.log('解密后:', decryptedUser);
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.Map;

public class DatabaseEncryption {
    // 密钥管理（实际应用中应使用密钥管理服务）
    private static final String DB_ENCRYPT_KEY = 
        System.getenv("DB_ENCRYPT_KEY") != null 
            ? System.getenv("DB_ENCRYPT_KEY") 
            : "your-secret-key-here-32-chars";
    private static final String IV = "fedcba98765432100123456789abcdef";
    
    private static final Map<String, Object> OPTIONS = Map.of(
        "mode", "CBC",
        "iv", IV
    );
    
    // 加密数据库字段
    public static String encryptField(String value) {
        return SM4Util.encrypt(DB_ENCRYPT_KEY, value, OPTIONS);
    }
    
    // 解密数据库字段
    public static String decryptField(String encryptedValue) {
        return SM4Util.decrypt(DB_ENCRYPT_KEY, encryptedValue, OPTIONS);
    }
    
    // 用户实体类
    static class User {
        int id;
        String username;
        String email;
        String phone;  // 需要加密
        String idCard; // 需要加密
        
        User(int id, String username, String email, String phone, String idCard) {
            this.id = id;
            this.username = username;
            this.email = email;
            this.phone = phone;
            this.idCard = idCard;
        }
    }
    
    public static void main(String[] args) {
        // 保存用户时加密敏感字段
        User user = new User(
            1,
            "zhangsan",
            "zhangsan@example.com",
            "13800138000",
            "110101199001011234"
        );
        
        User encryptedUser = new User(
            user.id,
            user.username,
            user.email,
            encryptField(user.phone),
            encryptField(user.idCard)
        );
        
        System.out.println("加密后手机号: " + encryptedUser.phone);
        System.out.println("加密后身份证: " + encryptedUser.idCard);
        
        // 从数据库读取后解密
        User decryptedUser = new User(
            encryptedUser.id,
            encryptedUser.username,
            encryptedUser.email,
            decryptField(encryptedUser.phone),
            decryptField(encryptedUser.idCard)
        );
        
        System.out.println("解密后手机号: " + decryptedUser.phone);
        System.out.println("解密后身份证: " + decryptedUser.idCard);
    }
}
```

:::

## 批量加密

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, CipherMode } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';
const iv = 'fedcba98765432100123456789abcdef';

// 批量加密数据
const messages = [
  '消息1',
  '消息2',
  '消息3',
  '消息4',
  '消息5'
];

// 使用 map 并行加密
const encrypted = messages.map(msg => 
  sm4Encrypt(key, msg, {
    mode: CipherMode.CBC,
    iv
  })
);

console.log('加密完成:', encrypted.length, '条');

// 异步批量加密（大数据量）
async function batchEncrypt(items: string[]) {
  const results = await Promise.all(
    items.map(item => 
      Promise.resolve(sm4Encrypt(key, item, {
        mode: CipherMode.CBC,
        iv
      }))
    )
  );
  return results;
}

batchEncrypt(messages).then(results => {
  console.log('异步加密完成:', results.length);
});
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.*;
import java.util.stream.Collectors;

String key = "0123456789abcdeffedcba9876543210";
String iv = "fedcba98765432100123456789abcdef";

Map<String, Object> options = Map.of(
    "mode", "CBC",
    "iv", iv
);

// 批量加密数据
List<String> messages = Arrays.asList(
    "消息1", "消息2", "消息3", "消息4", "消息5"
);

// 使用 Stream 并行加密
List<String> encrypted = messages.parallelStream()
    .map(msg -> SM4Util.encrypt(key, msg, options))
    .collect(Collectors.toList());

System.out.println("加密完成: " + encrypted.size() + " 条");

// 顺序加密
List<String> encryptedSeq = messages.stream()
    .map(msg -> SM4Util.encrypt(key, msg, options))
    .collect(Collectors.toList());

System.out.println("顺序加密完成: " + encryptedSeq.size() + " 条");
```

:::

## 性能测试

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { sm4Encrypt, sm4Decrypt, CipherMode } from 'smkit';

const key = '0123456789abcdeffedcba9876543210';
const iv = 'fedcba98765432100123456789abcdef';

function benchmarkEncryption(dataSize: number, iterations: number) {
  const data = 'A'.repeat(dataSize);
  
  const startTime = Date.now();
  for (let i = 0; i < iterations; i++) {
    sm4Encrypt(key, data, {
      mode: CipherMode.CBC,
      iv
    });
  }
  const endTime = Date.now();
  
  const totalTime = endTime - startTime;
  const avgTime = totalTime / iterations;
  const throughput = (dataSize * iterations) / (totalTime / 1000);
  
  console.log(`数据大小: ${dataSize} 字节`);
  console.log(`迭代次数: ${iterations}`);
  console.log(`总时间: ${totalTime} ms`);
  console.log(`平均时间: ${avgTime.toFixed(2)} ms`);
  console.log(`吞吐量: ${(throughput / 1024 / 1024).toFixed(2)} MB/s`);
}

// 运行测试
benchmarkEncryption(1024, 1000);      // 1KB × 1000次
benchmarkEncryption(1024 * 1024, 10); // 1MB × 10次
```

@tab Java

```java
import io.github.smkit.sm4.SM4Util;
import java.util.Map;

public class SM4Benchmark {
    public static void benchmarkEncryption(int dataSize, int iterations) {
        String key = "0123456789abcdeffedcba9876543210";
        String iv = "fedcba98765432100123456789abcdef";
        
        Map<String, Object> options = Map.of(
            "mode", "CBC",
            "iv", iv
        );
        
        String data = "A".repeat(dataSize);
        
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < iterations; i++) {
            SM4Util.encrypt(key, data, options);
        }
        long endTime = System.currentTimeMillis();
        
        long totalTime = endTime - startTime;
        double avgTime = (double) totalTime / iterations;
        double throughput = (dataSize * iterations) / ((double) totalTime / 1000);
        
        System.out.println("数据大小: " + dataSize + " 字节");
        System.out.println("迭代次数: " + iterations);
        System.out.println("总时间: " + totalTime + " ms");
        System.out.println("平均时间: " + String.format("%.2f", avgTime) + " ms");
        System.out.println("吞吐量: " + 
            String.format("%.2f", throughput / 1024 / 1024) + " MB/s");
    }
    
    public static void main(String[] args) {
        // 运行测试
        benchmarkEncryption(1024, 1000);      // 1KB × 1000次
        benchmarkEncryption(1024 * 1024, 10); // 1MB × 10次
    }
}
```

:::

## 相关链接

- [SM4 算法原理](./algorithm.md)
- [工作模式详解](./modes.md)
- [加密详解](./encrypt.md)
- [解密详解](./decrypt.md)
