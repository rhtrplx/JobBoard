from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import mysql.connector, time
import jwt
import bcrypt  # Importation de bcrypt pour le hachage des mots de passe

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


# Génération d'un hash sécurisé pour le mot de passe
def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())


# Vérification d'un mot de passe avec le hash
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode("utf-8"), hashed)


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

    # Vérifier que les informations sont présentes
    if not email or not password:
        return jsonify({"error": "You must enter an email and a password."}), 400

    # Requête SQL pour vérifier les informations d'identification
    query = "SELECT * FROM users WHERE email = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(query, (email,))
    user = cursor.fetchone()

    # Vérifier si l'utilisateur existe
    if not user:
        return jsonify({"error": "Email or Password incorrect."}), 401

    # Vérifiez que le hash du mot de passe est bien récupéré
    hashed_password = user.get("password")

    if not hashed_password:
        return jsonify({"error": "Password not found in database."}), 500

    # Assurez-vous que hashed_password est de type string
    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode("utf-8")  # Encoder le hash pour bcrypt

    # Vérifiez si le mot de passe est correct
    if not check_password(password, hashed_password):
        return jsonify({"error": "Email or Password incorrect."}), 401

    # Vérifier si l'utilisateur est un administrateur
    admin_query = "SELECT * FROM adminUsers WHERE email = %s"
    cursor.execute(admin_query, (email,))
    admin_user = cursor.fetchone()

    isAdmin = False
    if admin_user:
        isAdmin = (
            True  # Si l'utilisateur est trouvé dans adminUsers, il est administrateur
        )

    # Génération du token JWT
    payload_data = {
        "sub": user["id"],
        "name": user["name"],
        "nickname": user["username"],
        "isAdmin": isAdmin,  # Ajouter cette information au token
    }

    my_secret = "rachidleplusbeau"
    token = jwt.encode(payload=payload_data, key=my_secret)

    # Ajouter le token au dictionnaire de l'utilisateur
    user["token"] = token
    user["isAdmin"] = isAdmin  # Ajouter l'indicateur isAdmin dans la réponse

    # Mettre à jour le token dans la base de données
    update_query = "UPDATE users SET token = %s WHERE id = %s"
    cursor.execute(update_query, (token, user["id"]))
    cnx.commit()  # Confirmer l'insertion du token

    # Retourner les informations de l'utilisateur avec le token mis à jour et isAdmin
    return jsonify({"message": "Success Login", "user": user}), 200


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
        return jsonify({"error": "This email is already used."}), 409

    # TODO try if this works
    # Vérifier si le nom d'utilisateur existe déjà
    check_query = "SELECT * FROM users WHERE username = %s"
    cursor.execute(check_query, (username,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"error": "This username is already used."}), 409

    # Hacher le mot de passe avant de l'enregistrer dans la base de données
    hashed_password = hash_password(password)

    # Génération du token JWT
    payload_data = {
        "sub": email,  # Utilisation de l'email comme identifiant du souscripteur
        "name": name,
        "nickname": username,
    }

    my_secret = "rachidleplusbeau"
    token = jwt.encode(payload=payload_data, key=my_secret)

    # Insérer le nouvel utilisateur dans la base de données avec le token
    insert_query = """
        INSERT INTO `users` (`id`, `email`, `password`, `name`, `lastName`, `city`, `country`, `zipcode`, `description`, `birthdate`, `title`, `contactInformations`, `savedAdsIds`, `username`, `token`)
        VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(
            insert_query,
            (
                email,
                hashed_password.decode("utf-8"),  # Stocker le hash en tant que string
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
                token,  # Stocker le token dans la base de données
            ),
        )
        cnx.commit()  # Confirmer l'insertion

        # Retourner les informations de l'utilisateur avec le token

        query = "SELECT * FROM users WHERE token = %s"
        cursor = cnx.cursor(dictionary=True)
        cursor.execute(query, (token,))
        user = cursor.fetchone()
        return (
            jsonify({"message": "Success Signup!", "token": token, "user": user}),
            201,
        )
    except mysql.connector.Error as err:
        print(f"An error occurred while accessing the DB: {err}")
        cnx.rollback()  # Annuler l'insertion si une erreur survient
        return jsonify({"error": "An error occurred on Signup."}), 500
    finally:
        cursor.close()


@app.route("/api/update_account", methods=["PUT"])
def update_account_handler():
    cnx = mysql.connector.connect(
        user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
        password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
        host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
        database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
        use_pure=False,
    )

    # Récupérer le token envoyé dans les headers
    token = request.headers.get("Authorization")

    if not token:
        return jsonify({"error": "Authorization token required"}), 401

    # Récupérer les données envoyées depuis React
    data = request.json

    # Vérifier si l'utilisateur existe en utilisant le token
    check_query = "SELECT * FROM users WHERE token = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(check_query, (token,))
    existing_user = cursor.fetchone()

    if not existing_user:
        return jsonify({"error": "User not found."}), 404

    # Validation de la date (YYYY-MM-DD)
    def is_valid_date(date_string):
        try:
            from datetime import datetime

            datetime.strptime(date_string, "%Y-%m-%d")
            return True
        except ValueError:
            return False

    # Validation du mot de passe (au moins 8 caractères, une lettre, un chiffre)
    def is_valid_password(password):
        import re

        password_rules = re.compile(r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$")
        return password_rules.match(password) is not None

    # Utiliser les anciennes valeurs si certaines données sont manquantes ou invalides
    email = data.get("email", existing_user["email"])

    password = data.get("password")
    if password and is_valid_password(password):
        hashed_password = hash_password(password)
    else:
        hashed_password = existing_user[
            "password"
        ]  # Garder l'ancien mot de passe si non fourni ou non valide

    name = data.get("name", existing_user["name"])
    lastName = data.get("lastName", existing_user["lastName"])
    city = data.get("city", existing_user["city"])
    country = data.get("country", existing_user["country"])
    zipcode = data.get("zipcode", existing_user["zipcode"])
    description = data.get("description", existing_user["description"])

    birthdate = data.get("birthdate")
    if birthdate and is_valid_date(birthdate):
        formatted_birthdate = birthdate
    else:
        formatted_birthdate = existing_user[
            "birthdate"
        ]  # Garder l'ancienne date si non fournie ou non valide

    title = data.get("title", existing_user["title"])
    contactInformations = data.get(
        "contactInformations", existing_user["contactInformations"]
    )
    savedAdsIds = existing_user["savedAdsIds"]  # Static, ne change pas ici
    username = data.get("username", existing_user["username"])

    # Mettre à jour l'utilisateur dans la base de données
    update_query = """
        UPDATE `users`
        SET `email` = %s, `password` = %s, `name` = %s, `lastName` = %s, `city` = %s, `country` = %s, `zipcode` = %s, `description` = %s, 
            `birthdate` = %s, `title` = %s, `contactInformations` = %s, `savedAdsIds` = %s, `username` = %s
        WHERE `token` = %s
    """
    try:
        cursor.execute(
            update_query,
            (
                email,
                hashed_password,
                name,
                lastName,
                city,
                country,
                zipcode,
                description,
                formatted_birthdate,
                title,
                contactInformations,
                savedAdsIds,
                username,
                token,
            ),
        )
        cnx.commit()  # Confirmer la mise à jour
        return jsonify({"message": "Account updated successfully!"}), 200
    except mysql.connector.Error as err:
        print(f"An error occurred while accessing the DB: {err}")
        cnx.rollback()  # Annuler la mise à jour si une erreur survient
        return jsonify({"error": "An error occurred during update."}), 500
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

    # TODO add check if missing information.

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


@app.route("/api/users", methods=["GET"])
def users_handler():
    # Connexion à la base de données
    cnx = mysql.connector.connect(
        user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
        password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
        host="db",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
        database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
        use_pure=False,
    )

    # Suppression de request.get_json() car GET ne devrait pas recevoir de corps
    # data = request.get_json()  # Supprimé
    # print(f"Request Data: {data}")  # Supprimé

    # Récupérer le token d'authentification dans les headers
    token = request.headers.get("Authorization")
    print(f"Authorization Token: {token}")

    # Vérifier si le token est présent
    if not token:
        print("Aucun token fourni dans les en-têtes.")
        return jsonify({"error": "Authorization token required"}), 401

    # Requête SQL pour vérifier les informations d'identification
    query = "SELECT * FROM users WHERE token = %s"
    cursor = cnx.cursor(dictionary=True)

    try:
        print(f"Executing query: {query} with token: {token}")
        cursor.execute(query, (token,))
        user = cursor.fetchone()
        print(f"Query Result: {user}")

        # Si l'utilisateur existe, retourner un message de succès
        if user:
            print("Utilisateur trouvé, retour des informations utilisateur.")
            return jsonify({"user": user}), 200
        else:
            print("Token non valide, utilisateur introuvable.")
            return jsonify({"error": "Token incorrect."}), 401
    except mysql.connector.Error as err:
        print(f"Database error: {err}")
        return (
            jsonify({"error": "An error occurred while accessing the database."}),
            500,
        )
    finally:
        cursor.close()
        cnx.close()


@app.route("/api/healthcheck", methods=["GET"])
def healthcheck_handler():
    return "OK", 200


if __name__ == "__main__":
    # while True:
    #     try:
    app.run(host="0.0.0.0", port=5001)
    # except Exception as e:
    #     print(f"Erreur détectée : {e}. Redémarrage dans 5 secondes...")
    #     time.sleep(5)  # Pause avant de redémarrer l'application
