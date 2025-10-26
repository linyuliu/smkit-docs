---
title: 示例代码
icon: code
---

# SM3 示例代码

实用的 SM3 使用示例，涵盖常见使用场景。

## 基本哈希计算

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { digest } from 'smkit';

// 计算字符串哈希
const message = 'Hello, SM3!';
const hash = digest(message);
console.log('哈希值:', hash);
console.log('长度:', hash.length); // 64 (256位，32字节)

// 计算中文哈希
const chineseText = '你好，世界！';
const chineseHash = digest(chineseText);
console.log('中文哈希:', chineseHash);

// 使用面向对象 API
import { SM3 } from 'smkit';

const hasher = new SM3();
const hash2 = SM3.digest('Hello, SM3!');
console.log('哈希值:', hash2);
```

@tab Java

```java
import io.github.smkit.sm3.SM3Util;

// 计算字符串哈希
String message = "Hello, SM3!";
String hash = SM3Util.digest(message);
System.out.println("哈希值: " + hash);
System.out.println("长度: " + hash.length()); // 64 (256位，32字节)

// 计算中文哈希
String chineseText = "你好，世界！";
String chineseHash = SM3Util.digest(chineseText);
System.out.println("中文哈希: " + chineseHash);

// 使用字节数组
byte[] data = message.getBytes();
String hash2 = SM3Util.digest(data);
System.out.println("哈希值: " + hash2);
```

:::

## HMAC 消息认证

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { hmac } from 'smkit';

// 计算 HMAC
const key = 'my-secret-key';
const message = 'Important message';
const mac = hmac(key, message);
console.log('HMAC:', mac);

// 验证 HMAC
const receivedMac = '...'; // 接收到的 MAC
const computedMac = hmac(key, message);
const isValid = receivedMac === computedMac;
console.log('验证结果:', isValid);

// 使用不同的密钥
const mac1 = hmac('key1', 'data');
const mac2 = hmac('key2', 'data');
console.log('不同密钥产生不同 MAC:', mac1 !== mac2);
```

@tab Java

```java
import io.github.smkit.sm3.SM3Util;

// 计算 HMAC
String key = "my-secret-key";
String message = "Important message";
String mac = SM3Util.hmac(key, message);
System.out.println("HMAC: " + mac);

// 验证 HMAC
String receivedMac = "..."; // 接收到的 MAC
String computedMac = SM3Util.hmac(key, message);
boolean isValid = receivedMac.equals(computedMac);
System.out.println("验证结果: " + isValid);

// 使用不同的密钥
String mac1 = SM3Util.hmac("key1", "data");
String mac2 = SM3Util.hmac("key2", "data");
System.out.println("不同密钥产生不同 MAC: " + !mac1.equals(mac2));
```

:::

## 文件完整性校验

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { digest } from 'smkit';
import * as fs from 'fs';
import * as crypto from 'crypto';

// === 计算文件哈希 ===

// 小文件：直接读取
const smallFile = fs.readFileSync('small-file.txt', 'utf-8');
const smallFileHash = digest(smallFile);
console.log('小文件哈希:', smallFileHash);

// 大文件：流式处理
import { SM3 } from 'smkit';

function hashLargeFile(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const sm3 = new SM3();
    const stream = fs.createReadStream(filePath);
    
    stream.on('data', (chunk) => {
      sm3.update(chunk.toString('hex'));
    });
    
    stream.on('end', () => {
      resolve(sm3.digest());
    });
    
    stream.on('error', reject);
  });
}

// 使用示例
hashLargeFile('large-file.bin').then(hash => {
  console.log('大文件哈希:', hash);
  
  // 保存哈希值
  fs.writeFileSync('large-file.bin.sha256', hash);
});

// === 验证文件完整性 ===

const originalHash = fs.readFileSync('large-file.bin.sha256', 'utf-8');
hashLargeFile('large-file.bin').then(currentHash => {
  if (currentHash === originalHash) {
    console.log('✓ 文件完整');
  } else {
    console.log('✗ 文件已被篡改或损坏');
  }
});
```

@tab Java

```java
import io.github.smkit.sm3.SM3;
import io.github.smkit.sm3.SM3Util;
import java.nio.file.*;
import java.io.*;

// === 计算文件哈希 ===

// 小文件：直接读取
String smallFile = Files.readString(Paths.get("small-file.txt"));
String smallFileHash = SM3Util.digest(smallFile);
System.out.println("小文件哈希: " + smallFileHash);

// 大文件：流式处理
public static String hashLargeFile(String filePath) throws IOException {
    SM3 sm3 = new SM3();
    
    try (FileInputStream fis = new FileInputStream(filePath);
         BufferedInputStream bis = new BufferedInputStream(fis)) {
        
        byte[] buffer = new byte[8192];
        int bytesRead;
        
        while ((bytesRead = bis.read(buffer)) != -1) {
            byte[] chunk = new byte[bytesRead];
            System.arraycopy(buffer, 0, chunk, 0, bytesRead);
            sm3.update(chunk);
        }
    }
    
    return sm3.digest();
}

// 使用示例
String hash = hashLargeFile("large-file.bin");
System.out.println("大文件哈希: " + hash);

// 保存哈希值
Files.writeString(Paths.get("large-file.bin.sha256"), hash);

// === 验证文件完整性 ===

String originalHash = Files.readString(Paths.get("large-file.bin.sha256"));
String currentHash = hashLargeFile("large-file.bin");

if (currentHash.equals(originalHash)) {
    System.out.println("✓ 文件完整");
} else {
    System.out.println("✗ 文件已被篡改或损坏");
}
```

:::

## 增量哈希计算

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { SM3 } from 'smkit';

// 创建哈希实例
const sm3 = new SM3();

// 分批次更新数据
sm3.update('Hello, ');
sm3.update('World! ');
sm3.update('This is SM3.');

// 完成计算
const hash = sm3.digest();
console.log('增量哈希:', hash);

// 重置后重新计算
sm3.reset();
sm3.update('New data');
const newHash = sm3.digest();
console.log('新哈希:', newHash);

// 等价于一次性计算
import { digest } from 'smkit';
const directHash = digest('Hello, World! This is SM3.');
console.log('是否相同:', hash === directHash); // true
```

@tab Java

```java
import io.github.smkit.sm3.SM3;

// 创建哈希实例
SM3 sm3 = new SM3();

// 分批次更新数据
sm3.update("Hello, ");
sm3.update("World! ");
sm3.update("This is SM3.");

// 完成计算
String hash = sm3.digest();
System.out.println("增量哈希: " + hash);

// 重置后重新计算
sm3.reset();
sm3.update("New data");
String newHash = sm3.digest();
System.out.println("新哈希: " + newHash);

// 等价于一次性计算
import io.github.smkit.sm3.SM3Util;
String directHash = SM3Util.digest("Hello, World! This is SM3.");
System.out.println("是否相同: " + hash.equals(directHash)); // true
```

:::

## 密码存储

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { digest, hmac } from 'smkit';
import * as crypto from 'crypto';

// === 注册时存储密码 ===

function hashPassword(password: string): { salt: string; hash: string } {
  // 生成随机盐值
  const salt = crypto.randomBytes(16).toString('hex');
  
  // 使用盐值哈希密码
  const hash = digest(salt + password);
  
  return { salt, hash };
}

// 用户注册
const userPassword = 'user123456';
const stored = hashPassword(userPassword);
console.log('盐值:', stored.salt);
console.log('哈希:', stored.hash);

// 存储到数据库
// db.users.insert({ username: 'user', salt: stored.salt, passwordHash: stored.hash });

// === 登录时验证密码 ===

function verifyPassword(
  password: string, 
  storedSalt: string, 
  storedHash: string
): boolean {
  const hash = digest(storedSalt + password);
  return hash === storedHash;
}

// 用户登录
const loginPassword = 'user123456';
const isValid = verifyPassword(loginPassword, stored.salt, stored.hash);
console.log('密码验证:', isValid ? '✓ 正确' : '✗ 错误');

// 使用 HMAC 的方式（更安全）
function hashPasswordWithHmac(password: string, salt: string): string {
  return hmac(salt, password);
}

const hmacHash = hashPasswordWithHmac(userPassword, stored.salt);
console.log('HMAC 哈希:', hmacHash);
```

@tab Java

```java
import io.github.smkit.sm3.SM3Util;
import io.github.smkit.SmKitUtil;
import java.security.SecureRandom;

// === 注册时存储密码 ===

class PasswordHash {
    String salt;
    String hash;
    
    PasswordHash(String salt, String hash) {
        this.salt = salt;
        this.hash = hash;
    }
}

public static PasswordHash hashPassword(String password) {
    // 生成随机盐值
    SecureRandom random = new SecureRandom();
    byte[] saltBytes = new byte[16];
    random.nextBytes(saltBytes);
    String salt = SmKitUtil.bytesToHex(saltBytes);
    
    // 使用盐值哈希密码
    String hash = SM3Util.digest(salt + password);
    
    return new PasswordHash(salt, hash);
}

// 用户注册
String userPassword = "user123456";
PasswordHash stored = hashPassword(userPassword);
System.out.println("盐值: " + stored.salt);
System.out.println("哈希: " + stored.hash);

// === 登录时验证密码 ===

public static boolean verifyPassword(
    String password, 
    String storedSalt, 
    String storedHash
) {
    String hash = SM3Util.digest(storedSalt + password);
    return hash.equals(storedHash);
}

// 用户登录
String loginPassword = "user123456";
boolean isValid = verifyPassword(loginPassword, stored.salt, stored.hash);
System.out.println("密码验证: " + (isValid ? "✓ 正确" : "✗ 错误"));

// 使用 HMAC 的方式（更安全）
public static String hashPasswordWithHmac(String password, String salt) {
    return SM3Util.hmac(salt, password);
}

String hmacHash = hashPasswordWithHmac(userPassword, stored.salt);
System.out.println("HMAC 哈希: " + hmacHash);
```

:::

## 数据完整性保护

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { digest } from 'smkit';

// 计算数据哈希
interface DataWithHash {
  data: any;
  hash: string;
}

function protectData(data: any): DataWithHash {
  const jsonData = JSON.stringify(data);
  const hash = digest(jsonData);
  
  return { data, hash };
}

// 验证数据完整性
function verifyData(dataWithHash: DataWithHash): boolean {
  const jsonData = JSON.stringify(dataWithHash.data);
  const computedHash = digest(jsonData);
  
  return computedHash === dataWithHash.hash;
}

// 使用示例
const originalData = {
  id: 12345,
  name: '张三',
  amount: 1000.00,
  timestamp: Date.now()
};

// 保护数据
const protected = protectData(originalData);
console.log('受保护的数据:', protected);

// 验证数据（未被篡改）
console.log('验证结果:', verifyData(protected)); // true

// 篡改数据
const tampered = { ...protected };
tampered.data.amount = 9999.99;
console.log('篡改后验证:', verifyData(tampered)); // false
```

@tab Java

```java
import io.github.smkit.sm3.SM3Util;
import com.google.gson.Gson;

// 数据保护类
class DataWithHash<T> {
    T data;
    String hash;
    
    DataWithHash(T data, String hash) {
        this.data = data;
        this.hash = hash;
    }
}

class DataProtector {
    private static final Gson gson = new Gson();
    
    // 计算数据哈希
    public static <T> DataWithHash<T> protectData(T data) {
        String jsonData = gson.toJson(data);
        String hash = SM3Util.digest(jsonData);
        
        return new DataWithHash<>(data, hash);
    }
    
    // 验证数据完整性
    public static <T> boolean verifyData(DataWithHash<T> dataWithHash) {
        String jsonData = gson.toJson(dataWithHash.data);
        String computedHash = SM3Util.digest(jsonData);
        
        return computedHash.equals(dataWithHash.hash);
    }
}

// 数据类
class Transaction {
    int id;
    String name;
    double amount;
    long timestamp;
    
    Transaction(int id, String name, double amount) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.timestamp = System.currentTimeMillis();
    }
}

// 使用示例
Transaction originalData = new Transaction(12345, "张三", 1000.00);

// 保护数据
DataWithHash<Transaction> protected = DataProtector.protectData(originalData);
System.out.println("受保护的数据: " + new Gson().toJson(protected));

// 验证数据（未被篡改）
System.out.println("验证结果: " + DataProtector.verifyData(protected)); // true
```

:::

## 性能测试

::: code-tabs#lang

@tab:active TypeScript

```typescript
import { digest } from 'smkit';

// 测试哈希计算性能
function benchmarkHash(dataSize: number, iterations: number) {
  const data = 'A'.repeat(dataSize);
  
  const startTime = Date.now();
  for (let i = 0; i < iterations; i++) {
    digest(data);
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
benchmarkHash(1024, 1000);      // 1KB × 1000次
benchmarkHash(1024 * 1024, 10); // 1MB × 10次
```

@tab Java

```java
import io.github.smkit.sm3.SM3Util;

public class SM3Benchmark {
    public static void benchmarkHash(int dataSize, int iterations) {
        String data = "A".repeat(dataSize);
        
        long startTime = System.currentTimeMillis();
        for (int i = 0; i < iterations; i++) {
            SM3Util.digest(data);
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
        benchmarkHash(1024, 1000);      // 1KB × 1000次
        benchmarkHash(1024 * 1024, 10); // 1MB × 10次
    }
}
```

:::

## 相关链接

- [SM3 算法原理](./algorithm.md)
- [哈希计算详解](./hash.md)
- [HMAC 详解](./hmac.md)
