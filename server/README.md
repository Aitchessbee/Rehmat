
# API for Rehmat

API for project Rehmat, by team US, under track HealthCare, for Makeathon5.




## Tech Stack

**Server:** Django REST framework

**Database:** SQLite



  
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

Create *.env file* in base directory and place Security-Key and Database File Path (db.sqlite3).

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

#### Register (for Doctor)

```http
  POST /auth/register/
```
multipart/form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | email id (maximum length: 256) |
| `password` | `string` | password | 
| `name` | `string` | name (maximum length: 256) |
| `phone_number` | `string` | phone number (with country code) | 
| `city` | `string` | city (maximum length: 128) | 
| `country` | `string` | country (maximum length: 128) |
| `role` | `string` | DR: Doctor; RF: Refugee |
| `id_proof` | `file` | ID Proof Image File |

Returns `HTTP 201 CREATED` status code for succesful execution.

Returns array of `{parameter: [error message 1, error_message 2, ...]}` objects for errors.


#### Card verification (for Refugee)

```http
  POST /auth/verify/
```
multipart/form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id_proof` | `file` | ID Proof Image File |

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID for temp id proof entry |
| `unhrc_number` | `string` | UNHRC Number |
| `name` | `string` | Name of Refugee |
| `date_of_birth` | `string` | Format: DD/MM/YYYY |
| `country` | `string` | Country of Refugee |

Returns array of `{parameter: [error message 1, error_message 2, ...]}` objects for errors.


#### Register (for Refugee)

```http
  POST /auth/register/
```
multipart/form-data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | email id (maximum length: 256) |
| `password` | `string` | password | 
| `name` | `string` | name (maximum length: 256) |
| `phone_number` | `string` | phone number (with country code) |
| `city` | `string` | city (maximum length: 128) | 
| `country` | `string` | country (maximum length: 128) |
| `role` | `string` | DR: Doctor; RF: Refugee |
| `unhrc_number` | `string` | maximum length 128 |
| `id` | `int` | ID for temp id proof entry |

Returns `HTTP 201 CREATED` status code for succesful execution.

Returns array of `{parameter: [error message 1, error_message 2, ...]}` objects for errors.


#### Login (for both Doctor and Refugee)

```http
  POST /auth/login/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `token` | `string` | API key |
| `name` | `string` | Name |
| `role` | `string` | DR: Doctor, RF: Refugee |

Returns `{"error": "Invalid Credentials!"}` for invalid login credentials.


#### Free Slots of Logged In Doctor

```http
  GET /slot/view/available/doctor/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |


#### Scheduled Slots of Logged In Doctor

```http
  GET /slot/view/scheduled/doctor/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |


#### Scheduled Slots of Logged In Refugee

```http
  GET /slot/view/scheduled/refugee/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |


#### Prescriptions given by Logged In Doctor

```http
  GET /slot/view/prescription/doctor/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |
| `text` | `string` | Prescription Description |


#### Previous Presecriptions of Logged In Refugee

```http
  GET /slot/view/prescription/refugee/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |
| `text` | `string` | Prescription Description |

#### Available Slots for booking (for refugee)

```http
  GET /slot/available-slots/
```
JSON Response Object format:
`{"YYYY-MM-DD": ["HH:mm:SS", "HH:mm:SS", ...]}`


#### Add free slot (for Doctor)

```http
  POST /slot/add-free/
```
JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `date` | format: YYYY-MM-DD |
| `time` | `time` | format: HH:mm:ss |

Returns `201 CREATED` status code for succesful execution.


#### Schedule slot (for Refugee)

```http
  POST /slot/schedule/
```
JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `date` | `date` | format: YYYY-MM-DD |
| `time` | `time` | format: HH:mm:ss |

Returns `201 CREATED` status code for succesful execution.


#### Previous Presecriptions of Refugee with given slot

```http
  GET /slot/patient-previous-prescriptions/<int:id>/
```
Here id is ID of Scheduled Slot Object

JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |
| `text` | `string` | Prescription Description |


#### Cancel Scheduled Slot (for both Doctor and Refugee)

```http
  POST /slot/cancel/
```
JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of Scheduled Slot Object |

Returns `200 OK` status code for succesful execution.


#### Cancel Free Slot (for Doctor)

```http
  POST /slot/cancel-doctor-free/
```
JSON Request Data
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of Scheduled Slot Object |

Returns `200 OK` status code for succesful execution.


#### Meeting Token (for both Doctor and Refugee)

```http
  GET /slot/meeting-token/
```
JSON Response
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `int` | ID of record |
| `patient` | `string` | Patient Name |
| `doctor` | `string` | Doctor Name |
| `time` | `datetime` | format: YYYY-MM-DD HH:mm:ss |
| `token` | `string` | Meeting Token |
| `channel` | `string` | Meeting Channel Name |
