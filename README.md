# Hospital Management System

A web application for managing hospital appointments and patient-doctor interactions, built with React and Laravel. The system supports three types of users: Admin, Doctor, and Patient.

📝 **Note:** When a user registers through `/register`, they are automatically created with the **Patient** role and only **Admin** can create user with **Doctor** role.

## Features

### Admin Features:
- **View all doctors:** Admin can see a table of all doctors with pagination, search, and filter options.
- **Register new doctors:** Only Admin can create a new doctor in the system.
- **View patients:** Admin can see a list of all patients and their assigned doctors.

### Doctor Features:
- **Manage appointments:** Doctors can view, schedule, cancel, or mark appointments as complete. They can also search and filter appointments by patient name or status.
- **View patient details:** Doctors can access patient details, including test files uploaded by other doctors assigned to the patient. Doctors can download these test files.
- **Upload test files:** Doctors can upload test files for patients.

### Patient Features:
- **View doctors:** Patients can view a list their of doctors in a table.
- **View appointments:** Patients can view their appointments.
- **Book appointments:** Patients can book an appointment with a doctor.

## Technologies Used
- **Frontend:** React
- **Backend:** Laravel
- **Database:** MySQL
- **Authentication:** JWT for secure login and registration

# Installation Guide

This guide outlines the steps to get the backend (Laravel) and frontend (React) applications up and running.

## Backend Setup (Laravel)

1.  **Navigate to the Backend Directory:**
    ```
    cd backend
    ```

2.  **Install Composer Dependencies:**
    ```
    composer install
    ```

3.  **Configure Environment Variables:**
    * Create a `.env` file by copying the `.env.example` file:
        ```
        cp .env.example .env
        ```
    * Open the `.env` file and configure the database connection details. For example, if you're using phpMyAdmin:
        ```dotenv
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=<your_database_name>
        DB_USERNAME=<your_phpmyadmin_username>
        DB_PASSWORD=<your_phpmyadmin_password>
        ```
    * You may need to configure other environment variables as needed.

4.  **Generate Application Key:**
    ```
    php artisan key:generate
    ```

5.  **Run Migrations:**
    ```
    php artisan migrate
    ```

6.  **Seed the Database (including users):**
    ```
    php artisan db:seed
    ```

## Frontend Setup (React)

1.  **Navigate to the Frontend Directory:**
    ```
    cd frontend
    ```

2.  **Install Node Dependencies:**
    ```
    npm install
    ```

3.  **Start the Frontend Application:**
    ```
    npm start
    ```
