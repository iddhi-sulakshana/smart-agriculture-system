import pickle
from flask import Flask, request, jsonify

app = Flask(__name__)

# import the model
model_path = "../../CropRecommendation/models/finalized_model.sav"
with open(model_path, 'rb') as file:
    model = pickle.load(file)

@app.route('/predict', methods=['POST'])
def predict():
    # check if the request body is json
    if not request.is_json:
        return 'Request body must be JSON', 400
    
    # get the request body
    data = request.get_json()

    # check for the features in the request body
    if 'N' not in data or 'P' not in data or 'K' not in data or 'temperature' not in data or 'humidity' not in data or 'ph' not in data or 'rainfall' not in data:
        return 'Features not found in the request body', 400
    
    # check the values are numbers
    for key in data:
        if not isinstance(data[key], (int, float)):
            return 'Values must be numbers', 400

    # ['N' 'P' 'K' 'temperature' 'humidity' 'ph' 'rainfall']
    # input data
    input = [[data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]]
    prediction = model.predict(input)

    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(port=2000, debug=True)



