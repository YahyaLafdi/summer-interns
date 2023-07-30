


FROM openjdk:17-jdk-slim
WORKDIR /app
COPY *.jar /app/app.jar
EXPOSE 8082
ENTRYPOINT ["sh", "-c"]
CMD ["java -jar app.jar"]

