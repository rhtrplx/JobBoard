# JobBoard
JobBoard is a simple that makes possible to ...

## How to deploy this project:
### 1. Downlaod and extract the project:
- Downlaod link: https://github.com/rhtrplx/JobBoard/archive/refs/heads/main.zip
### 1. Install Docker:
- Linux: https://docs.docker.com/desktop/install/linux
- Windows: https://docs.docker.com/desktop/install/windows-install
- MacOS: https://docs.docker.com/desktop/install/mac-install
### 2. Install Docker Compose: 
- Linux: https://docs.docker.com/desktop/install/linux
- Windows: https://docs.docker.com/desktop/install/windows-install
- MacOS: https://docs.docker.com/desktop/install/mac-install
### 3. Run the Docker stack:
    docker-compose -f docker-compose.yml up
or
    
    docker-compose -f docker-compose.yml up -d

## Services' UI
JobBoard: http://localhost:3000

PhpMyAdmin http://localhost:8080

## Our API
API's routes:

### Login (POST):
    localhost:5001/api/login
- sent body: 
```json
{
    "email": "admin@admin.com",
    "password": "admin123"
}
```

- received:

```json
{
    "message": "Success Login",
    "user": {
        "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
        "city": "Nice",
        "contactInformations": "admin.contact@admin.com",
        "country": "France",
        "description": "Admin Description",
        "email": "admin@admin.com",
        "id": 21,
        "isAdmin": true,
        "lastName": "admin",
        "name": "admin",
        "password": "$2b$12$KEAuFViqlZx71rHoMAL.BO1gxFgAa8t5HLQa4f.lny677Pfukv.CC",
        "savedAdsIds": "1",
        "title": "AdminTitle",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIxLCJuYW1lIjoiYWRtaW4iLCJuaWNrbmFtZSI6IkFkbWluVXNlck5hbWUwNiIsImlzQWRtaW4iOnRydWV9.-Qlm6Iub4mdPn0PsVNkLlk8GLWl3JpDhpiAOhVQuM3E",
        "username": "AdminUserName06",
        "zipcode": "06000"
    }
}
```

### Signup (POST):
    localhost:5001/api/login
- sent body: 
```json
{
    "email": "rachid@example.com",
    "password": "hashed_password1",
    "name": "Rachid",
    "lastName": "Lamkadem",
    "city": "Nice",
    "country": "Île-de-France",
    "zipcode": "06",
    "description": "Passionné de technologie et développeur expérimenté.",
    "birthdate": "2002-01-03",
    "title": "Développeur Backend",
    "contactInformations": "rachid.pro@techcompany.com",
    "savedAdsIds": "1,2,3",
    "username": "rachidPro06"
}
```

- received:

```json
{
    "message": "Success Signup!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYWNoaWRAZXhhbXBsZS5jb20iLCJuYW1lIjoiUmFjaGlkIiwibmlja25hbWUiOiJyYWNoaWRQcm8wNiJ9.I_pNxf3w_VFhmhlMB6l2koPPtzZfjYOOHk9EsFcUfvY",
    "user": {
        "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
        "city": "Nice",
        "contactInformations": "rachid.pro@techcompany.com",
        "country": "Île-de-France",
        "description": "Passionné de technologie et développeur expérimenté.",
        "email": "rachid@example.com",
        "id": 28,
        "lastName": "Lamkadem",
        "name": "Rachid",
        "password": "$2b$12$LdkQJMEtjAuWLDuwA71LreQaEO1wVvJjzrVVWfWWUuy6C0KsaeptS",
        "savedAdsIds": "1",
        "title": "Développeur Backend",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyYWNoaWRAZXhhbXBsZS5jb20iLCJuYW1lIjoiUmFjaGlkIiwibmlja25hbWUiOiJyYWNoaWRQcm8wNiJ9.I_pNxf3w_VFhmhlMB6l2koPPtzZfjYOOHk9EsFcUfvY",
        "username": "rachidPro06",
        "zipcode": "06"
    }
}
```

### Gets Ads (GET):
    localhost:5001/api/ads
- sent body: 
```json
{
    "page": "0"
}
```

- received:

```json
{
    "ads": [
        {
            "categories": "",
            "contactInformations": "support@supportfirm.com",
            "contractType": "CDI",
            "description": "Gérer les équipes support et assurer la satisfaction des clients.",
            "id": 32,
            "place": "Nice, France",
            "publicationDate": "Wed, 18 Sep 2024 00:00:00 GMT",
            "title": "Responsable Service Client",
            "wages": "45 000 € / an",
            "workingSchedules": "Lundi à Vendredi, 10h-19h"
        },
        ...
    ]
}
```

### Gets Specific Ad (GET):
    localhost:5001/api/ads/5
- sent body: 
```json
{}
```

- received:

```json
{
    "categories": "1",
    "contactInformations": "security@consultingfirm.com",
    "contractType": "CDI",
    "description": "Consultant en cybersécurité recherché pour effectuer des audits et mettre en place des solutions de sécurité.",
    "id": 5,
    "place": "Bordeaux, France",
    "publicationDate": "Tue, 08 Oct 2024 00:00:00 GMT",
    "title": "Consultant en Cybersécurité",
    "wages": "55 000 € par an",
    "workingSchedules": "Lundi à Vendredi, 10h - 19h"
}
```

### Gets All Users (GET):
    localhost:5001/api/users
- sent body: 
```json
{}
```

- received:

```json
{
    "users": [
        {
            "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
            "city": "Nice",
            "contactInformations": "admin.contact@admin.com",
            "country": "France",
            "description": "Admin Description",
            "email": "admin@admin.com",
            "id": 21,
            "lastName": "admin",
            "name": "admin",
            "title": "AdminTitle",
            "username": "AdminUserName06",
            "zipcode": "06000"
        },
        {
            "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
            "city": "rachid",
            "contactInformations": "rachid",
            "country": "rachid",
            "description": "rachid",
            "email": "rachid@rachid.com",
            "id": 22,
            "lastName": "rachid",
            "name": "rachid",
            "title": "rachid",
            "username": "rachid",
            "zipcode": "123"
        },
        {
            "birthdate": "Sat, 31 Dec 1222 00:00:00 GMT",
            "city": "aze",
            "contactInformations": "aze",
            "country": "aze",
            "description": "&é\"",
            "email": "john.doe@example.com",
            "id": 24,
            "lastName": "rachid",
            "name": "rachid",
            "title": "&é\"",
            "username": "&é\"",
            "zipcode": "123"
        },
        {
            "birthdate": "Wed, 02 Oct 2024 00:00:00 GMT",
            "city": "nice",
            "contactInformations": "rachid@contact.com",
            "country": "france",
            "description": "azeazeaze",
            "email": "rachid@okoko.jhug",
            "id": 25,
            "lastName": "rachid",
            "name": "rachid",
            "title": "azeazea",
            "username": "rachidName123",
            "zipcode": "06000"
        },
        {
            "birthdate": "Tue, 15 Oct 2024 00:00:00 GMT",
            "city": "nice",
            "contactInformations": "rachid",
            "country": "france",
            "description": "rachid",
            "email": "rachid@qsd",
            "id": 26,
            "lastName": "rachid",
            "name": "rachid",
            "title": "rachid",
            "username": "rachid123",
            "zipcode": "06000"
        },
        {
            "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
            "city": "Nice",
            "contactInformations": "melody.pro@techcompany.com",
            "country": "Île-de-France",
            "description": "Passionné de technologie et développeur expérimenté.",
            "email": "racjid@qsdqsnvdfqshdsqh.com",
            "id": 27,
            "lastName": "Paras",
            "name": "Melody",
            "title": "Développeur Backend",
            "username": "melodyPro060606",
            "zipcode": "06000"
        },
        {
            "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
            "city": "Nice",
            "contactInformations": "rachid.pro@techcompany.com",
            "country": "Île-de-France",
            "description": "Passionné de technologie et développeur expérimenté.",
            "email": "rachid@example.com",
            "id": 28,
            "lastName": "Lamkadem",
            "name": "Rachid",
            "title": "Développeur Backend",
            "username": "rachidPro06",
            "zipcode": "06"
        }
    ]
}
```

### Get All Admins (GET):
    localhost:5001/api/admins
- sent body: 
```json
{}
```

- received:

```json
{
    "admins": [
        {
            "email": "admin@admin.com",
            "id": 3
        },
        {
            "email": "rachid@rachid.com",
            "id": 4
        }
    ]
}
```
### Apply To An Ad (POST):
    localhost:5001/api/apply
- sent body: 
```json
{
    "adId": 1,
    "publisherId": 2,
    "userId": 3,
    "name": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phoneNumber": "1234567890",
    "city": "Paris",
    "country": "France",
    "zipcode": "75001",
    "message": "Je suis très intéressé par cette opportunité.",
    "resume": "Expérience: Développeur Backend chez XYZ. Compétences: Python, Flask, SQL."
}
```

- received:

```json
{
    "message": "Success created the application."
}
```

### Update An Account (PUT):
    localhost:5001/api/apply
- sent body: 
```json
{
    "email": "racjid@qsdqsnvdfqshdsqh.com",
    "password": "password",
    "name": "Melody",
    "lastName": "Paras",
    "city": "Nice",
    "country": "Île-de-France",
    "zipcode": "06000",
    "description": "Passionné de technologie et développeur expérimenté.",
    "birthdate": "2002-01-03",
    "title": "Développeur Backend",
    "contactInformations": "melody.pro@techcompany.com",
    "savedAdsIds": "1,2,3",
    "username": "melodyPro060606"
}
```

- received:

```json
{
    "message": "Account updated successfully!"
}
```

### Delete An Account (DELETE):
    localhost:5001/api/users/1
- sent body: 
```json
{}
```

- received:

```json
{
    "message": "User deleted successfully!"
}
```

### Delete An Admin (DELETE):
    localhost:5001/api/admins/1
- sent body: 
```json
{}
```

- received:

```json
{
    "message": "Admin deleted successfully!"
}
```

### Delete An Ad (DELETE):
    localhost:5001/api/ads/1
- sent body: 
```json
{}
```

- received:

```json
{
    "message": "Ad deleted successfully!"
}
```

### Delete A Publisher (DELETE):
    localhost:5001/api/publishers/1
- sent body: 
```json
{}
```

- received:

```json
{
    "message": "Publisher deleted successfully!"
}
```


## Unit Tests Overview

| **Feature**                  | **Unit Test**                                              | **Test Description**                                                                                                                                | **Expected Result**                      |
|------------------------------|------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| User Management              | Fetch users (`GET /api/users`)                            | Verify that the API returns all users with HTTP status 200.                                                                                         | List of users + Status 200              |
|                              | Update a user (`PUT /api/users/<id>`)                     | Test updating user information with valid data and check errors for invalid cases.                                                                 | Success message + Status 200            |
|                              | Delete a user (`DELETE /api/users/<id>`)                  | Verify successful deletion of a user and check the response for a non-existent ID.                                                                 | Success or error message + Status 200/404 |
| Ads Management               | Create an ad (`POST /api/ads`)                            | Test ad creation with complete, valid data and check for errors with missing or incorrect data.                                                    | Success message + Status 201            |
|                              | Fetch ads (`GET /api/ads`)                                | Verify that ads are returned with pagination, and that the API responds with status 200 for a valid request.                                        | List of ads + Status 200                |
|                              | Update an ad (`PUT /api/ads/<id>`)                        | Verify that ad information is correctly updated and check for errors with non-existent IDs.                                                        | Success message + Status 200 or error   |
|                              | Delete an ad (`DELETE /api/ads/<id>`)                     | Test the deletion of an ad with a valid ID and check the response for a non-existent ID.                                                            | Success message + Status 200 or error   |
| Admin Accounts               | Create an admin (`POST /api/admins`)                      | Verify admin account creation with a valid email and test errors for already existing emails.                                                      | Success message + Status 201            |
|                              | Delete an admin (`DELETE /api/admins/<id>`)               | Verify the deletion of an admin by ID and check for errors with a non-existent ID.                                                                 | Success message + Status 200 or error   |
| Login & Signup               | User signup (`POST /api/signup`)                          | Test user signup with valid information and check for errors with already used email/username.                                                     | Success message + Status 201 or error   |
|                              | User login (`POST /api/login`)                            | Verify login with correct email and password, and test errors for incorrect login credentials.                                                     | JWT Token + Status 200 or error         |
| Applications (`apply`)       | Create an application (`POST /api/apply`)                 | Verify the creation of an application with complete data and test errors for missing or incorrect information.                                     | Success message + Status 201            |
|                              | Update an application (`PUT /api/apply/<id>`)             | Test updating an application and check for errors with a non-existent ID.                                                                          | Success message + Status 200 or error   |
|                              | Delete an application (`DELETE /api/apply/<id>`)          | Verify the deletion of an application with a valid ID and check the response for a non-existent ID.                                                | Success message + Status 200 or error   |
| Security                     | Password hashing (`hash_password`)                        | Test that the password is correctly hashed and secure.                                                                                             | Hashed password                         |
|                              | Password verification (`check_password`)                  | Verify that password verification works correctly for both correct and incorrect passwords.                                                        | Boolean true/false result               |
|                              | JWT token validation                                      | Test that JWT tokens are correctly generated and contain the right information, and verify that protected requests fail without a valid token.     | Correct token or error response         |
| Miscellaneous                | System check (`GET /api/healthcheck`)                     | Test that the health check route returns "OK" with HTTP status 200.                                                                                | "OK" response + Status 200              |
