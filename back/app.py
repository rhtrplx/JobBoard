from flask import Flask, request, jsonify, abort
import mysql.connector

# Connexion à la base de données MySQL définie dans Docker Compose
cnx = mysql.connector.connect(
    user="root",  # Nom d'utilisateur MySQL spécifié dans docker-compose.yml
    password="root_password",  # Mot de passe MySQL spécifié dans docker-compose.yml
    host="127.0.0.1",  # Utilisez '127.0.0.1' ou 'localhost' pour se connecter depuis le host
    database="JustDoItDB",  # Nom de la base de données spécifiée dans docker-compose.yml
    use_pure=False,
)

app = Flask(__name__)


@app.route("/api/login", methods=["POST"])
def login_handler():
    # Récupérer les données envoyées depuis React
    data = request.json
    print(data)
    email = data.get("email")
    password = data.get("password")

    # Vérifier que les informations sont présentes
    if not email or not password:
        return jsonify({"error": "Email et mot de passe requis"}), 400

    # Requête SQL pour vérifier les informations d'identification
    query = "SELECT * FROM users WHERE email = %s AND password = %s"
    cursor = cnx.cursor(dictionary=True)
    cursor.execute(query, (email, password))
    user = cursor.fetchone()

    # Si l'utilisateur existe, retourner un message de succès
    if user:
        return jsonify({"message": "Connexion réussie", "user": user}), 200
    else:
        return jsonify({"error": "Email ou mot de passe incorrect"}), 401


@app.route("/api/healthcheck", methods=["GET"])
def healthcheck_handler():
    return "OK", 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
