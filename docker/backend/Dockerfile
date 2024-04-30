# Build Stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage
FROM amazoncorretto:17
ARG PROFILE=dev
ARG APP_VERSION=1.0.3

WORKDIR /app
COPY --from=build /build/target/book-network-*.jar /app/

EXPOSE 8088

ENV DB_URL=jdbc:postgresql://postgres-sql-bsn/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=missing_hostname
ENV EMAIL_USER_NAME=missing_username
ENV EMAIL_PASSWORD=missing_password

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL}  book-network-${JAR_VERSION}.jar
