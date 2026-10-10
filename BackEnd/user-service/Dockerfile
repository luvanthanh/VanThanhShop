#FROM eclipse-temurin:21-jre
#WORKDIR /app
#COPY target/*.jar app.jar
#EXPOSE 8082
#ENTRYPOINT ["java","-jar","app.jar"]



# Giai đoạn 1: Build ứng dụng
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Sao chép cấu hình Maven
COPY pom.xml .

# Tải các thư viện cần thiết
RUN mvn -B dependency:go-offline

# Sao chép source code
COPY src ./src

# Build file JAR
RUN mvn -B clean package -DskipTests

# Giai đoạn 2: Chạy ứng dụng
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/target/user-service-0.0.1-SNAPSHOT.jar app.jar

# Port mặc định của user-service
EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
