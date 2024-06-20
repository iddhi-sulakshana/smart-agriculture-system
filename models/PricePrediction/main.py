import PricePredictor
import requests
import logging
import os

def main():
    logging.basicConfig(level=logging.INFO)

    backend_url = os.getenv("BACKEND_URL", "http://localhost:5000")

    predictor = PricePredictor.PricePredictor()
    vegetables = predictor.getUniqueVegetables()

    for vegetable in vegetables:
        predict = predictor.predictPrice(vegetable)
        vegetable_name = ""
        if(vegetable == "Green_Chillies_LCVEG_1kg"):
            vegetable_name = "Green Chillies"
        elif(vegetable == "Leeks_UPCVEG_1kg"):
            vegetable_name = "Leeks"
        elif(vegetable == "BeetRoot_UPCVEG_1kg"):
            vegetable_name = "BeetRoot"
        elif(vegetable == "Carrot_UPCVEG_1kg"):
            vegetable_name = "Carrot"

        payload = {
            "name": vegetable_name,
            "predict": predict["predict"],
            "previous": predict["previous"]
        }
        response = requests.patch(backend_url + "/api/categories/price_prediction", json=payload, verify=False)
        if(response.status_code == 200):
            logging.info("Price prediction for " + vegetable_name + " is successful")
        else:
            logging.error("Price prediction for " + vegetable_name + " failed")
    return 0

if __name__ == "__main__":
    main()