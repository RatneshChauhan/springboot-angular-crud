Spring Framework & Spring Boot
===========================
The problems with Spring
===============================
You need to hunt for all the compatible libraries for the specific Spring version and configure them
95% of the times we configure the DataSource, EntitymanagerFactory,TransactionManager etc beans in the same way. Wouldn’t it be great if Spring can do it for us automatically
Similarly we configure SpringMVC beans like ViewResolver, MessageSource etc in the same way most of the times
So basically you want Spring to do things automatically but provide the flexibility to override the default configuration in a simpler way?

Well, you are about to enter into the world of SpringBoot where your dreams come true!!!

![alt text](https://github.com/RatneshChauhan/springboot-data-rest-jpa/blob/master/spring.png)

Spring Boot – Simplifying Spring for Everyone
==================================
* Spring Boot makes it easy to create a Spring Data REST JPA starter project using Spring Initializr – https://start.spring.io/
* Spring Boot saves you a lot of boilerplate code building microservices.
* You can use it to create stand-alone Java applications that can be started using ‘java -jar’ or more traditional WAR deployments.
1. Easy dependency Management
First thing to observe is we are using two boot dependencies named spring-boot-starter-data-jpa and spring-boot-starter-data-rest. So when you add spring-boot-starter-data-rest, which is a part of springboot-starter-web dependency, by default it will pull all the commonly used libraries for Spring MVC applications such as spring-webmvc, jackson-json, validation-api and tomcat. We have also added spring-boot-starter-data-jpa dependency. This pulls all the spring-data-jpa dependencies and also adds Hibernate libraries because the majority of the applications use Hibernate as JPA implementation.
2.  Auto Configuration
Not only the spring-boot-starter-web adds all these libraries but also configures the commonly registered beans like DispatcherServlet, ResourceHandlers, MessageSource etc beans with sensible defaults. We haven’t defined any of the DataSource, EntityManagerFactory, TransactionManageretc beans but they are automatically gets created. How? If we have any in-memory database drivers like H2 or HSQL in our classpath then SpringBoot will automatically create an in-memory DataSource and then registers EntityManagerFactory, TransactionManager beans automatically with sensible defaults. But we are using MySQL, so we need to explicitly provide MySQL connection details. We have configured those MySQL connection details in application.properties file and SpringBoot creates a DataSource using these properties.
3.  Embedded Servlet Container Support
The most important and surprising thing is we have created a simple Java class annotated with some magical annotation @SpringApplication having a main method and by running that main we are able to run the application and access it at http://localhost:8080/.

Where does the servlet container come from? We have added spring-boot-starter-rest which is a part of spring-boot-starter-web and pulls the spring-boot-starter-tomcat automatically and when we run the main() method it starts up tomcat as an embedded container so that we don’t have to deploy our application on any externally installed tomcat server.

By the way have you observed that our packaging type in pom.xml is ‘jar’ not ‘war’. Wonderful!

Ok, but what if I want to use Jetty server instead of tomcat? Simple, exclude spring-bootstarter-tomcat from spring-boot-starter-web and include spring-boot-starter-jetty.

That’s it.

Here's how to create Spring Boot Data REST JPA project
==========================================================

Step 1: Create a Maven-Based Spring Boot Starter Project using Eclipse or STS or any other appropriate IDE of your choice

Step 2: Configure Datasource/JPA Properties in application.properties

Step 3: Create a JPA Entity and Spring Data JPA Repository Interface for the Entity

Step 4: Create a RESTful endpoint controller to serves the request by calling JPA repository methods

Security: User Authentication and Authorization using Spring Boot Security and JWT
=================================================================================
JSON Web Token (JWT) is a way to generate auth tokens. It’s is an open standard (RFC 7519) that defines a simple way for securely transmitting information between client and server as a JSON object.

JWT Tokens V/S Cookies
===================================
Since HTTP is a stateless protocol, after you login (via username/password, OAuth 2 etc), for every future request to the server, you need to keep telling the server that you have already logged in so it can allow you to perform authenticated/authorized actions. One way to do this is via “session” cookies and other way is to use “auth” tokens.

The token is composed of 
* a header
* a payload and
* a signature

JWT offers many benefits over using session cookies but the 2 major ones are
============================================================================

* Server doesn’t need to ask DB to know who the user is because the user info is embedded inside the token itself! #performance!

* It works the same for both native mobile apps and browser clients. i.e. servers don’t need to implement two different mechanisms (browser v/s native).

To support both authentication and authorization in our application, we are going to

* Implement an authentication filter to issue JWTs to users sending credentials

* Implement an authorization filter to validate all requests containing JWTs

* Create a custom implementation of UserDetailsService to help Spring Security loading user-specific data in the framework

* And extend the WebSecurityConfigurerAdapter class to customize the security framework to our needs

Finally
========
git clone https://github.com/RatneshChauhan/springboot-data-rest-jpa.git

import as maven project in Eclipse or STS or whatever..

maven build it and boot run it

Generate JWT token using postman as show below. A valid token must be present in each call to REST API

![alt text](https://github.com/RatneshChauhan/springboot-data-rest-jpa/blob/master/postman.png)

http://localhost:8080/api/customer/all

There you go, Spring Data JPA repositories are now exposed as REST API secured with Spring security and JWT 

Author
============
Ratnesh Chauhan, Full Stack Developer

Note: Everything is tested on Windows environment

License
===========
The MIT License (MIT)

Copyright (c) 2018 Ratnesh Chauhan

Permission is hereby granted, free of charge, to any person obtaining a copy of this application and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so.
