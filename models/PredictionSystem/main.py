import pickle
import pandas as pd

def extractData():
    priceData = pd.read_csv("../PricePrediction/data/processed/pricesList.csv")
    priceData = priceData[priceData["Name"] == priceData['Name'].unique()[0]]
    priceData.drop(columns=["Name"], inplace=True)
    priceData.dropna(inplace=True)
    priceData["Datetime"] = pd.to_datetime(priceData[['Year', 'Month']].assign(day=(priceData["Week"]-1)*7 +1))
    priceData = priceData.set_index('Datetime')
    priceData = priceData.sort_index(ascending=False)
    priceData = priceData.head(3)
    global last_week_price
    last_week_price = priceData.get("Price").values[0]
    most_recent_date = priceData.index[0]

    newData = {}
    newData["Year"] = most_recent_date.year
    newData["Month"] = most_recent_date.month
    newData["Week"] = most_recent_date.week + 1
    if(newData["Week"] >= 5):
        newData["Week"] = 1
        newData["Month"] = newData["Month"] + 1
        if(newData["Month"] >= 13):
            newData["Month"] = 1
            newData["Year"] = newData["Year"] + 1

    # add the lag feature and the rolling mean feature to newdata
    newData["Price_Lag"] = priceData["Price"].values[0]
    newData["Price_Mean"] = priceData["Price"].mean()

    return newData

predictionData = extractData()

model_filename = '../PricePrediction/models/finalized_model.sav'
loaded_model = pickle.load(open(model_filename, 'rb'))

loaded_model.partial_fit(pd.DataFrame(predictionData, index=[0]), [last_week_price])

prediction = loaded_model.predict(pd.DataFrame(predictionData, index=[0]))