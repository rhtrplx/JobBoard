# JobBoard
JobBoard is a simple that makes possible to ...

## How to setup:
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

## Running services
Website: http://localhost:3000

Phpmyadmin http://localhost:8080

## Our Api
Api's routes:

### Login (POST):
    localhost:5001/api/login
- sent body: 
```
{
    "email": "rachid@example.com",
    "password": "hashed_password1"
}
```

- received:

```
{
    "message": "Success Login",
    "user": {
        "birthdate": "Thu, 03 Jan 2002 00:00:00 GMT",
        "city": "Nice",
        "contactInformations": "rachid.pro@techcompany.com",
        "country": "Île-de-France",
        "description": "Passionné de technologie et développeur expérimenté.",
        "email": "rachid@example.com",
        "id": 10,
        "lastName": "Lamkadem",
        "name": "Rachid",
        "password": "hashed_password1",
        "savedAdsIds": "1,2,3",
        "title": "Développeur Backend",
        "username": "rachidPro06",
        "zipcode": "06"
    }
}
```

### Signup (POST):
    localhost:5001/api/login
- sent body: 
```
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

```
{
    "message": "Success Signup !"
}
```

### Gets Ads (POST):
    localhost:5001/api/ads
- sent body: 
```
{
    "page": "0"
}
```

- received:

```
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
        {
            "categories": "",
            "contactInformations": "com@entrepriserh.com",
            "contractType": "CDD",
            "description": "Développer des supports de communication interne et externe.",
            "id": 31,
            "place": "Bordeaux, France",
            "publicationDate": "Thu, 19 Sep 2024 00:00:00 GMT",
            "title": "Chargé de Communication",
            "wages": "40 000 € / an",
            "workingSchedules": "Lundi à Vendredi, 9h-18h"
        },
        ...
    ]
}
```

### Apply to an ad (POST):
    localhost:5001/api/apply
- sent body: 
```
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

```
{
    "message": "Success created the application."
}
```
