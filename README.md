
# API for Rehmat

API for project Rehmat, by team US, under track HealthCare, for Makeathon5.




## Tech Stack

**Server:** Django REST framework

**Database:** PostgreSQL



  
## Run Locally


Clone the project


Go to the project directory


We recommend you to use virtual environment

```bash
  python -m venv venv
```

Activate virtual environment   
For Windows PowerShell
```bash
    venv/Scripts/activate.ps1
```
For Linux and MacOS
```bash
    source venv/bin/activate
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Make sure you have installed PostgreSQL

Create *.env file* in base directory and place Security-Key and Database credentials.

Run Migrations

```
 python manage.py makemigrations
```
```
 python manage.py migrate
```

Start the server

```bash
  python manage.py runserver
```



  
## API Reference

#### Register

```http
  POST /register/
```
multipart/form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | email id (maximum length: 256) |
| `password` | `string` | password | 
| `name` | `string` | name (maximum length: 256) |
| `phone_number` | `string` | phone number (with country code) | 
| `date_of_birth` | `string` | date of birth (Format: YYYY-MM-DD) |
| `city` | `string` | city (maximum length: 128) | 
| `country` | `string` | country (maximum length: 128) |
| `role` | `string` | DR: Doctor; RF: Refugee |
| `id_proof` | `file` | ID Proof Image File |

Returns `HTTP 201 CREATED` status code for succesful execution.

Returns array of `{parameter: [error message 1, error_message 2, ...]}` objects for errors.

