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


@app.route("/api/login", methods=["POST"])
def login_handler():
    # Récupérer les données envoyées depuis React
    data = request.json
    print(data)
    email = data.get("email")
    password = data.get("password")

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
    # Récupérer les données envoyées depuis React
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Vérifier que les informations sont présentes
    if not email or not password:
        return jsonify({"error": "You must enter an email and a password."}), 400

    # Vérifier si l'utilisateur existe déjà dans la base de données
    check_query = "SELECT * FROM users WHERE email = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(check_query, (email,))
    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({"error": "This email is alread used."}), 409

    # Insérer le nouvel utilisateur dans la base de données
    insert_query = "INSERT INTO users (email, password) VALUES (%s, %s)"
    try:
        cursor.execute(insert_query, (email, password))
        cnx.commit()  # Confirmer l'insertion
        return jsonify({"message": "Sucess Signup !"}), 201
    except mysql.connector.Error as err:
        print(f"An error occured while accessing the DB : {err}")
        cnx.rollback()  # Annuler l'insertion si une erreur survient
        return jsonify({"error": "An error occured on Signup."}), 500
    finally:
        cursor.close()


@app.route("/api/healthcheck", methods=["GET"])
def healthcheck_handler():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
