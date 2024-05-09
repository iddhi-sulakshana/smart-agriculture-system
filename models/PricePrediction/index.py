import json
import logging
import requests
import os
import PricePredictor

logging.basicConfig(level=logging.ERROR)

def handler(event, context):
    backend_url = os.environ['BACKEND_URL']

    predictor = PricePredictor.PricePredictor()
    vegetables = predictor.getUniqueVegetables()

    results = {}
    
    for vegetable in vegetables:
        predict = predictor.predictPrice(vegetable)
        vegetable_name = ""
        if vegetable == "Green_Chillies_LCVEG_1kg":
            vegetable_name = "Green Chillies"
        elif vegetable == "Leeks_UPCVEG_1kg":
            vegetable_name = "Leeks"
        elif vegetable == "BeetRoot_UPCVEG_1kg":
            vegetable_name = "BeetRoot"
        elif vegetable == "Carrot_UPCVEG_1kg":
            vegetable_name = "Carrot"

        payload = {
            "name": vegetable_name,
            "predict": predict["predict"],
            "previous": predict["previous"]
        }

        headers = {
            'ngrok-skip-browser-warning': 'ignore-warning',  # Custom header with any value
            'User-Agent': 'MyCustomAgent/1.0'  # Custom/non-standard User-Agent
        }


        response = requests.patch(backend_url + "/api/categories/price_prediction", json=payload, headers=headers)
        if response.status_code == 200:
            logging.info(f"Price prediction for {vegetable_name} is successful")
        else:
            logging.error(f"Price prediction for {vegetable_name} failed")

        results[vegetable_name] = 'Successful' if response.status_code == 200 else 'Failed'

    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }

