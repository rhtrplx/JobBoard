from flask import Flask, request, jsonify, abort
from flask_cors import CORS
import mysql.connector, time
import jwt
import bcrypt  # Importation de bcrypt pour le hachage des mots de passe

# Connexion à la base de données MySQL définie dans Docker Compose

time.sleep(5)

app = Flask(__name__)
CORS(app)


def connectToDb():
    cnx = mysql.connector.connect(
        user="root",
        password="root_password",
        host="db",
        database="JustDoItDB",
        use_pure=False,
    )
    return cnx


cnx = connectToDb()


# Génération d'un hash sécurisé pour le mot de passe
def hash_password(password):
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())


# Vérification d'un mot de passe avec le hash
def check_password(password, hashed):
    return bcrypt.checkpw(password.encode("utf-8"), hashed)


# Route pour récupérer les utilisateurs
@app.route("/api/users", methods=["GET"])
def get_users():
    cnx = connectToDb()
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT id, name, lastName, email, city, country, zipcode, description, birthdate, title, contactInformations, username FROM users"
    cursor.execute(query)
    users = cursor.fetchall()
    return jsonify({"users": users}), 200


# Route pour récupérer les publicateurs (publishers)
@app.route("/api/publishers", methods=["GET"])
def get_publishers():
    cnx = connectToDb()
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT id, name, title, place, contactInformations, lastLoginDate, signupDate FROM publishers"
    cursor.execute(query)
    publishers = cursor.fetchall()
    return jsonify({"publishers": publishers}), 200


# Route pour récupérer les applications
@app.route("/api/apply", methods=["GET"])
def get_applications():
    cnx = connectToDb()
    cursor = cnx.cursor(dictionary=True)
    query = """
        SELECT id, adId, publisherId, userId, name, lastName, email, phoneNumber, city, country, zipcode, message, resume 
        FROM applications
    """
    cursor.execute(query)
    applications = cursor.fetchall()
    return jsonify({"applications": applications}), 200


# Route pour récupérer les administrateurs (adminUsers)
@app.route("/api/admins", methods=["GET"])
def get_admins():
    cnx = connectToDb()
    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM adminUsers"
    cursor.execute(query)
    admins = cursor.fetchall()
    return jsonify({"admins": admins}), 200


@app.route("/api/users/<int:id>", methods=["PUT"])
def update_user(id):
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    update_query = """
        UPDATE users SET
        name = %s, lastName = %s, email = %s, city = %s, country = %s, zipcode = %s,
        description = %s, birthdate = %s, title = %s, contactInformations = %s, username = %s
        WHERE id = %s
    """
    cursor.execute(
        update_query,
        (
            data.get("name"),
            data.get("lastName"),
            data.get("email"),
            data.get("city"),
            data.get("country"),
            data.get("zipcode"),
            data.get("description"),
            data.get("birthdate"),
            data.get("title"),
            data.get("contactInformations"),
            data.get("username"),
            id,
        ),
    )
    cnx.commit()
    return jsonify({"message": "User updated successfully!"}), 200


@app.route("/api/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    cnx = connectToDb()
    cursor = cnx.cursor()
    delete_query = "DELETE FROM users WHERE id = %s"
    cursor.execute(delete_query, (id,))
    cnx.commit()
    return jsonify({"message": "User deleted successfully!"}), 200


@app.route("/api/ads/<int:id>", methods=["PUT"])
def update_ad(id):
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    update_query = """
        UPDATE ads SET
        title = %s, wages = %s, description = %s, contactInformations = %s, contractType = %s, 
        place = %s, workingSchedules = %s, publicationDate = %s, categories = %s
        WHERE id = %s
    """
    cursor.execute(
        update_query,
        (
            data.get("title"),
            data.get("wages"),
            data.get("description"),
            data.get("contactInformations"),
            data.get("contractType"),
            data.get("place"),
            data.get("workingSchedules"),
            data.get("publicationDate"),
            data.get("categories"),
            id,
        ),
    )
    cnx.commit()
    return jsonify({"message": "Ad updated successfully!"}), 200


@app.route("/api/ads/<int:id>", methods=["GET"])
def get_ad(id):
    cnx = connectToDb()
    cursor = cnx.cursor(dictionary=True)

    # SQL query to fetch ad details by id
    query = "SELECT * FROM ads WHERE id = %s"
    cursor.execute(query, (id,))

    ad = cursor.fetchone()  # Fetch one ad
    if ad:
        return jsonify(ad), 200  # Return the ad details as JSON if found
    else:
        return jsonify({"error": "Ad not found"}), 404  # Return an error if not found


@app.route("/api/ads/<int:id>", methods=["DELETE"])
def delete_ad(id):
    cnx = connectToDb()
    cursor = cnx.cursor()
    delete_query = "DELETE FROM ads WHERE id = %s"
    cursor.execute(delete_query, (id,))
    cnx.commit()
    return jsonify({"message": "Ad deleted successfully!"}), 200


@app.route("/api/admins/<int:id>", methods=["DELETE"])
def delete_admin(id):
    cnx = connectToDb()
    cursor = cnx.cursor()
    delete_query = "DELETE FROM adminUsers WHERE id = %s"
    cursor.execute(delete_query, (id,))
    cnx.commit()
    return jsonify({"message": "Admin deleted successfully!"}), 200


@app.route("/api/apply/<int:id>", methods=["PUT"])
def update_application(id):
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    update_query = """
        UPDATE applications SET
        adId = %s, publisherId = %s, userId = %s, name = %s, lastName = %s, email = %s, 
        phoneNumber = %s, city = %s, country = %s, zipcode = %s, message = %s, resume = %s
        WHERE id = %s
    """
    cursor.execute(
        update_query,
        (
            data.get("adId"),
            data.get("publisherId"),
            data.get("userId"),
            data.get("name"),
            data.get("lastName"),
            data.get("email"),
            data.get("phoneNumber"),
            data.get("city"),
            data.get("country"),
            data.get("zipcode"),
            data.get("message"),
            data.get("resume"),
            id,
        ),
    )
    cnx.commit()
    return jsonify({"message": "Application updated successfully!"}), 200


@app.route("/api/apply/<int:id>", methods=["DELETE"])
def delete_application(id):
    cnx = connectToDb()
    cursor = cnx.cursor()
    delete_query = "DELETE FROM applications WHERE id = %s"
    cursor.execute(delete_query, (id,))
    cnx.commit()
    return jsonify({"message": "Application deleted successfully!"}), 200


@app.route("/api/publishers/<int:id>", methods=["PUT"])
def update_publisher(id):
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    update_query = """
        UPDATE publishers SET
        name = %s, title = %s, place = %s, contactInformations = %s, lastLoginDate = %s, signupDate = %s
        WHERE id = %s
    """
    cursor.execute(
        update_query,
        (
            data.get("name"),
            data.get("title"),
            data.get("place"),
            data.get("contactInformations"),
            data.get("lastLoginDate"),
            data.get("signupDate"),
            id,
        ),
    )
    cnx.commit()
    return jsonify({"message": "Publisher updated successfully!"}), 200


@app.route("/api/publishers/<int:id>", methods=["DELETE"])
def delete_publisher(id):
    cnx = connectToDb()
    cursor = cnx.cursor()
    delete_query = "DELETE FROM publishers WHERE id = %s"
    cursor.execute(delete_query, (id,))
    cnx.commit()
    return jsonify({"message": "Publisher deleted successfully!"}), 200


@app.route("/api/login", methods=["POST"])
def login_handler():
    cnx = connectToDb()
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
    cnx = connectToDb()
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
    cnx = connectToDb()

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


# Route to handle both fetching ads (GET) and creating a new ad (POST)
@app.route("/api/ads", methods=["GET", "POST"])
def ads_handler():
    cnx = connectToDb()
    cursor = cnx.cursor(dictionary=True)

    # Handle GET request: Fetch ads with pagination
    if request.method == "GET":
        # Get 'page' parameter from the query string (defaults to 0 if not provided)
        page = request.args.get("page", 0)
        try:
            page = int(page)
        except:
            return jsonify({"error": "Page is not an int."}), 409

        if page < 0:
            return jsonify({"error": "Page negative."}), 409

        # Define the number of ads per page
        ads_per_page = 50
        offset = page * ads_per_page

        # Query to fetch ads with pagination
        select_query = "SELECT * FROM ads ORDER BY id DESC LIMIT %s OFFSET %s"

        try:
            cursor.execute(select_query, (ads_per_page, offset))
            ads = cursor.fetchall()  # Fetch all ads
            return jsonify({"ads": ads}), 200  # Return ads in JSON format
        except mysql.connector.Error as err:
            print(f"An error occurred while accessing the DB: {err}")
            return jsonify({"error": "An error occurred while fetching ads."}), 500
        finally:
            cursor.close()

    # Handle POST request: Create a new ad
    elif request.method == "POST":
        # Retrieve data sent from React
        data = request.json

        # Query to insert a new ad
        insert_query = """
            INSERT INTO ads (title, wages, description, contactInformations, contractType, place, workingSchedules, publicationDate, categories)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        try:
            cursor.execute(
                insert_query,
                (
                    data.get("title"),
                    data.get("wages"),
                    data.get("description"),
                    data.get("contactInformations"),
                    data.get("contractType"),
                    data.get("place"),
                    data.get("workingSchedules"),
                    data.get("publicationDate"),
                    data.get("categories"),
                ),
            )
            cnx.commit()
            return jsonify({"message": "Ad created successfully!"}), 201
        except mysql.connector.Error as err:
            print(f"An error occurred while creating the ad: {err}")
            return jsonify({"error": "An error occurred while creating the ad."}), 500
        finally:
            cursor.close()


@app.route("/api/apply", methods=["POST"])
def apply_handler():
    cnx = connectToDb()
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


# Route pour récupérer les informations d'un utilisateur via le token Authorization
@app.route("/api/user", methods=["GET"])
def get_user_by_token():
    cnx = connectToDb()
    # Récupérer le token d'authentification dans les headers
    token = request.headers.get("Authorization")
    print(f"Authorization Token: {token}")

    if not token:
        return jsonify({"error": "Authorization token required"}), 401

    cursor = cnx.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE token = %s"
    cursor.execute(query, (token,))
    user = cursor.fetchone()

    if user:
        return jsonify({"user": user}), 200
    else:
        return jsonify({"error": "User not found."}), 404


# Route to create a new user with password hashing
@app.route("/api/users", methods=["POST"])
def create_user():
    cnx = connectToDb()
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


# Route to create a new publisher
@app.route("/api/publishers", methods=["POST"])
def create_publisher():
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    insert_query = """
        INSERT INTO publishers (name, title, place, contactInformations, lastLoginDate, signupDate)
        VALUES (%s, %s, %s, %s, %s, %s)
    """
    cursor.execute(
        insert_query,
        (
            data.get("name"),
            data.get("title"),
            data.get("place"),
            data.get("contactInformations"),
            data.get("lastLoginDate"),
            data.get("signupDate"),
        ),
    )
    cnx.commit()
    return jsonify({"message": "Publisher created successfully!"}), 201


# Route to create a new application
@app.route("/api/apply", methods=["POST"])
def create_application():
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    insert_query = """
        INSERT INTO applications (adId, publisherId, userId, name, lastName, email, phoneNumber, city, country, zipcode, message, resume)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(
        insert_query,
        (
            data.get("adId"),
            data.get("publisherId"),
            data.get("userId"),
            data.get("name"),
            data.get("lastName"),
            data.get("email"),
            data.get("phoneNumber"),
            data.get("city"),
            data.get("country"),
            data.get("zipcode"),
            data.get("message"),
            data.get("resume"),
        ),
    )
    cnx.commit()
    return jsonify({"message": "Application created successfully!"}), 201


# Route to create a new admin user
@app.route("/api/admins", methods=["POST"])
def create_admin_user():
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    insert_query = """
        INSERT INTO adminUsers (email)
        VALUES (%s)
    """
    cursor.execute(insert_query, (data.get("email"),))
    cnx.commit()
    return jsonify({"message": "Admin user created successfully!"}), 201


# Route to update an existing admin user's email
@app.route("/api/admins/<int:id>", methods=["PUT"])
def update_admin_user(id):
    cnx = connectToDb()
    data = request.json
    cursor = cnx.cursor()

    # Vérifier que l'email est fourni dans la requête
    new_email = data.get("email")
    if not new_email:
        return jsonify({"error": "Email is required."}), 400

    # Vérifier si l'admin avec l'ID existe
    check_query = "SELECT * FROM adminUsers WHERE id = %s"
    cursor.execute(check_query, (id,))
    existing_admin = cursor.fetchone()

    if not existing_admin:
        return jsonify({"error": "Admin user not found."}), 404

    # Mettre à jour l'email de l'admin
    update_query = """
        UPDATE adminUsers
        SET email = %s
        WHERE id = %s
    """
    try:
        cursor.execute(update_query, (new_email, id))
        cnx.commit()
        return jsonify({"message": "Admin user's email updated successfully!"}), 200
    except mysql.connector.Error as err:
        print(f"An error occurred while updating the admin: {err}")
        cnx.rollback()  # Annuler les modifications en cas d'erreur
        return jsonify({"error": "An error occurred during the update."}), 500
    finally:
        cursor.close()


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
