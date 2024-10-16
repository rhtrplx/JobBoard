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