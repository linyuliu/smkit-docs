---
title: Java 实现
icon: brands fa-java
---

# Java 实现

SMKit 提供基于标准 JCA/JCE 架构的 Java 实现。

## 特性

::: tip Java 优势
- ✅ **JCA/JCE 标准**：符合 Java 密码学架构
- ✅ **高性能**：优化的算法实现
- ✅ **易于集成**：Maven/Gradle 轻松集成
- ✅ **Spring 支持**：提供 Spring Boot Starter
:::

## 系统要求

- JDK 8 或更高版本
- Maven 3.6+ 或 Gradle 6.0+

## 安装

::: code-tabs#build

@tab:active Maven

```xml
<dependency>
    <groupId>cn.smkit</groupId>
    <artifactId>smkit-core</artifactId>
    <version>1.0.0</version>
</dependency>
```

@tab Gradle

```groovy
implementation 'cn.smkit:smkit-core:1.0.0'
```

:::

## 快速开始

```java
import cn.smkit.*;

public class Demo {
    public static void main(String[] args) {
        // SM4 对称加密
        SM4 sm4 = new SM4();
        String encrypted = sm4.encrypt("Hello", "0123456789abcdef");
        
        // SM3 哈希
        SM3 sm3 = new SM3();
        String hash = sm3.hash("Hello");
        
        // SM2 非对称加密
        SM2 sm2 = new SM2();
        SM2KeyPair keyPair = sm2.generateKeyPair();
    }
}
```

## Spring Boot 集成

```java
@Configuration
public class SMKitConfig {
    @Bean
    public SM2 sm2() {
        return new SM2();
    }
    
    @Bean
    public SM4 sm4() {
        return new SM4(Mode.GCM);
    }
}
```

## 深入学习

::: tip 继续了解
- 📦 [安装配置](./installation.md)
- 🚀 [快速开始](./quickstart.md)
- 📚 [API 文档](./api.md)
:::
