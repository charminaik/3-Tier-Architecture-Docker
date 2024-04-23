To create a 3-tier architecture with a MySQL database, a backend server using Express.js, and a frontend using HTML/CSS, Docker will be used to containerize each component. Let's create a README file detailing the steps to accomplish this:

---

# 3-Tier Architecture Setup Using Docker

This guide provides step-by-step instructions to set up a 3-tier architecture consisting of a MySQL database, a backend server using Express.js, and a frontend using HTML/CSS. Each component will be containerized using Docker, and they will communicate within the same Docker network named 'cloud'.

## Prerequisites

- Docker installed on your machine. You can download and install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).

## Steps

### 1. Backend Setup

#### 1.1. Build the Backend Docker Image

```bash
cd backend
docker build -t backend .


#### 1.2. Run the Backend Container

bash
docker run -d --name backend --network cloud backend


### 2. MySQL Setup

#### 2.1. Run the MySQL Container

bash
docker run -d --name mysql --network cloud -e MYSQL_ROOT_PASSWORD=12345678 mysql:latest


#### 2.2. Create Database and Table

- Access the MySQL container shell:

bash
docker exec -it mysql bash


- Once inside the container, access MySQL:

bash
mysql -uroot -p


- Enter the password (12345678).

- Execute the following SQL commands to create the database and table:

sql
CREATE DATABASE cn;
USE cn;
CREATE TABLE Persons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL
);


### 3. Frontend Setup

#### 3.1. Build the Frontend Docker Image

bash
cd ../frontend
docker build -t frontend .


#### 3.2. Run the Frontend Container

bash
docker run -d --name frontend --network cloud -p 80:80 frontend


### 4. Access the Application

Open your web browser and navigate to http://localhost to access the frontend. You can submit the form, and the data will be stored in the MySQL database via the backend.

---

This README file outlines the steps to create and run each component of the 3-tier architecture using Docker containers. Let me know if you need further assistance!
