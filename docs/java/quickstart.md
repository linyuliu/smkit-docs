---
title: 快速开始
icon: rocket
---

# Java 快速开始

快速上手 SMKit Java 库。

## 基本用法

```java
import cn.smkit.SM4;

SM4 sm4 = new SM4();
String encrypted = sm4.encrypt("Hello", "key");
String decrypted = sm4.decrypt(encrypted, "key");
```

## Spring Boot 集成

```java
@Autowired
private SM2 sm2;

public void example() {
    SM2KeyPair keyPair = sm2.generateKeyPair();
}
```
