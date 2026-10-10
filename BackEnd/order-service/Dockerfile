#FROM ubuntu:latest
#LABEL authors="dell G15"
#ENTRYPOINT ["top", "-b"]


# Giai đoạn 1: Build ứng dụng Spring Boot
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Sao chép file cấu hình Maven
COPY pom.xml .

# Tải các dependency
RUN mvn -B dependency:go-offline

# Sao chép source code
COPY src ./src

# Build thành file JAR
RUN mvn -B clean package -DskipTests

# Giai đoạn 2: Chạy ứng dụng
FROM eclipse-temurin:21-jre

WORKDIR /app

# Sao chép file JAR từ giai đoạn build
COPY --from=build /app/target/order-service-0.0.1-SNAPSHOT.jar app.jar

# Port của Order Service
EXPOSE 8085

# Khởi chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]
