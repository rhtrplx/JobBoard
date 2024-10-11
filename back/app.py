from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import mysql.connector, time

# Connexion à la base de données MySQL définie dans Docker Compose

time.sleep(5)

cnx = mysql.connector.connect(
    user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
    password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
    host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
    database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
    use_pure=False,
)

app = Flask(__name__)
CORS(app)  # Permettre toutes les origines par défaut
# flask jwt


@app.route("/api/login", methods=["POST"])
def login_handler():
    cnx = mysql.connector.connect(
        user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
        password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
        host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
        database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
        use_pure=False,
    )
    # Récupérer les données envoyées depuis React
    data = request.json
    print(data)
    email = data.get("email")
    password = data.get("password")

    # print(
    #     request.headers["Authorization"]
    # )  # return after check and check on other routes

    # Vérifier que les informations sont présentes
    if not email or not password:
        return jsonify({"error": "You must enter an email and a password."}), 400

    # Requête SQL pour vérifier les informations d'identification
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    # Si l'utilisateur existe, retourner un message de succès
    if user:
        return jsonify({"message": "Success Login", "user": user}), 200
    else:
        return jsonify({"error": "Email or Password incorrect."}), 401


@app.route("/api/signup", methods=["POST"])
def signup_handler():
    cnx = mysql.connector.connect(
        user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
        password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
        host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
        database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
        use_pure=False,
    )
    # Récupérer les données envoyées depuis React
    data = request.json
    # TODO support profile pictures
    email = data.get("email")
    password = data.get("password")
    # confirmPassword = data.get("confirmPassword")
    name = data.get("name")
    lastName = data.get("lastName")
    city = data.get("city")
    country = data.get("country")
    zipcode = data.get("zipcode")
    description = data.get("description")
    birthdate = data.get("birthdate")
    title = data.get("title")
    contactInformations = data.get("contactInformations")
    savedAdsIds = 1
    username = data.get("username")
    # xxx = data.get("xxx")

    # email, password, confirmPassword, name, lastName, city, country, zipcode, description, birthdate, title, contactInformations, username
    # Vérifier que les informations sont présentes
    if (
        not email
        or not password
        or not name
        or not lastName
        or not city
        or not country
        or not zipcode
        or not description
        or not birthdate
        or not title
        or not contactInformations
        or not savedAdsIds
        or not username
    ):
        return jsonify({"error": "Please provide every info."}), 400

    # Vérifier si l'utilisateur existe déjà dans la base de données
    check_query = "SELECT * FROM users WHERE email = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(check_query, (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"error": "This email is alread used."}), 409

    # TODO try if this works
    check_query = "SELECT * FROM users WHERE username = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(check_query, (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"error": "This username is alread used."}), 409

    # Insérer le nouvel utilisateur dans la base de données
    insert_query = "INSERT INTO `users` (`id`, `email`, `password`, `name`, `lastName`, `city`, `country`, `zipcode`, `description`, `birthdate`, `title`, `contactInformations`, `savedAdsIds`, `username`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    try:
        cursor.execute(
            insert_query,
            (
                email,
                password,
                name,
                lastName,
                city,
                country,
                zipcode,
                description,
                birthdate,
                title,
                contactInformations,
                savedAdsIds,
                username,
            ),
        )
        cnx.commit()  # Confirmer l'insertion
        return jsonify({"message": "Success Signup !"}), 201
    except mysql.connector.Error as err:
        print(f"An error occured while accessing the DB : {err}")
        cnx.rollback()  # Annuler l'insertion si une erreur survient
        return jsonify({"error": "An error occured on Signup."}), 500
    finally:
        cursor.close()


@app.route("/api/ads", methods=["POST"])
def ads_handler():
    cnx = mysql.connector.connect(
        user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
        password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
        host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
        database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
        use_pure=False,
    )
    # Récupérer les données envoyées depuis React
    data = request.json
    page = data["page"]  # Défaut à 0 si "page" n'est pas fourni
    try:
        page = int(page)
    except:
        return jsonify({"error": "Page is not an int."}), 409

    if page < 0:
        return jsonify({"error": "Page negative."}), 409

    # Définir le nombre d'annonces par page
    ads_per_page = 50
    offset = page * ads_per_page

    # Requête pour récupérer les annonces en fonction de la page
    select_query = "SELECT * FROM ads ORDER BY id DESC LIMIT %s OFFSET %s"
    cursor = cnx.cursor(dictionary=True)

    try:
        cursor.execute(select_query, (ads_per_page, offset))
        ads = cursor.fetchall()  # Récupérer toutes les annonces

        return jsonify({"ads": ads}), 200  # Retourner les annonces en format JSON
    except mysql.connector.Error as err:
        print(f"An error occurred while accessing the DB: {err}")
        return jsonify({"error": "An error occurred while fetching ads."}), 500
    finally:
        cursor.close()


@app.route("/api/apply", methods=["POST"])
def apply_handler():
    cnx = mysql.connector.connect(
        user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
        password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
        host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
        database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
        use_pure=False,
    )
    # Récupérer les données envoyées depuis React
    data = request.json
    adId = data["adId"]
    publisherId = data["publisherId"]
    userId = data["userId"]
    name = data["name"]
    lastName = data["lastName"]
    email = data["email"]
    phoneNumber = data["phoneNumber"]
    city = data["city"]
    country = data["country"]
    zipcode = data["zipcode"]
    message = data["message"]
    resume = data["resume"]

    try:
        adId = int(adId)
        publisherId = int(publisherId)
        userId = int(userId)
    except:
        return jsonify({"error": "an Id is not an int."}), 409

    if adId < 0 or publisherId < 0 or userId < 0:
        return jsonify({"error": "an Id is negative."}), 409

    # Requête pour récupérer les annonces en fonction de la page
    select_query = "INSERT INTO `applications` (`id`, `adId`, `publisherId`, `userId`, `name`, `lastName`, `email`, `phoneNumber`, `city`, `country`, `zipcode`, `message`, `resume`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    cursor = cnx.cursor(dictionary=True)

    try:
        cursor.execute(
            select_query,
            (
                adId,
                publisherId,
                userId,
                name,
                lastName,
                email,
                phoneNumber,
                city,
                country,
                zipcode,
                message,
                resume,
            ),
        )
        # TODO check here is execute is sucessful...
        cnx.commit()

        return (
            jsonify({"message": "Success created the application."}),
            200,
        )  # Retourner les annonces en format JSON
    except mysql.connector.Error as err:
        print(f"An error occurred while creating the application: {err}")
        return (
            jsonify({"error": "An error occurred while creating the application:"}),
            500,
        )
    finally:
        cursor.close()


# TODO functions to use filers


@app.route("/api/healthcheck", methods=["GET"])
def healthcheck_handler():
    return "OK", 200


if __name__ == "__main__":
    while True:
        try:
            app.run(host="0.0.0.0", port=5001)
        except Exception as e:
            print(f"Erreur détectée : {e}. Redémarrage dans 5 secondes...")
            time.sleep(5)  # Pause avant de redémarrer l'application
