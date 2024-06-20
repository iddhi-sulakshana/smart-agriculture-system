from flask import Flask
import main

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return 'Health Check', 200

@app.route('/predict', methods=['POST'])
def predict():
    success = main.main()
    if success == 1:
        return 'Prediction Failed', 500
    return 'Prediction Successful', 200

if __name__ == '__main__':
    app.run(port=2000, debug=True)