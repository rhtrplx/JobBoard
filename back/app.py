from flask import Flask, request, Response, abort

# TODO use flask cors

app = Flask(__name__)


@app.route("/api/login")
def login_handler():
    return "OK"


@app.route("/api/healthcheck")
def healthcheck_handler():
    return "OK"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)
