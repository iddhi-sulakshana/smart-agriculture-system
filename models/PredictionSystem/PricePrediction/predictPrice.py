from catboost import CatBoostRegressor
from sklearn.impute import SimpleImputer
import pandas as pd

class pricePredictor:
    def __init__(self):
        self.priceData = None
        self.extractData()
        self.FEATURES = ["Year", "Month", "Week", "Price_Lag", "Price_Mean"]

    def extractData(self):
        self.priceData = pd.read_csv("../../PricePrediction/data/processed/pricesList.csv")
        self.priceData["Datetime"] = pd.to_datetime(self.priceData[['Year', 'Month']].assign(day=(self.priceData["Week"]-1)*7 +1))
        self.priceData = self.priceData.set_index('Datetime')

    def getUniqueVegetables(self):
        return self.priceData["Name"].unique()

    def preprocessData(self, data):
        data2 = data.copy()
        imputer = SimpleImputer(missing_values = pd.NA, strategy ='mean')
        imputer.fit(data2[["Price"]])
        data2["Price"] = imputer.transform(data2[["Price"]])
        data2["Price"] = data2["Price"].round(2)

        data2["Price_Lag"] = data2["Price"].shift(1)
        data2["Price_Mean"] = data2["Price"].rolling(window=3).mean().shift(1)
        data2.dropna(inplace=True)

        return data2

    def predictPrice(self, vegetable):
        data = self.priceData[self.priceData["Name"] == vegetable].copy()
        data.drop(columns=["Name"], inplace=True)
        data = self.preprocessData(data)

        # for high accuracy
        # CB_reg =  CatBoostRegressor(iterations=100000, depth=1, learning_rate=0.001, loss_function='RMSE')
        CB_reg =  CatBoostRegressor(iterations=1000, depth=1, learning_rate=0.1, loss_function='RMSE')
        CB_reg.fit(data[self.FEATURES], data["Price"], verbose=False)

        newData = {}
        newData["Year"] = data.index[-1].year
        newData["Month"] = data.index[-1].month
        newData["Week"] = data.index[-1].week + 1
        if(newData["Week"] >= 5):
            newData["Week"] = 1
            newData["Month"] = newData["Month"] + 1
            if(newData["Month"] >= 13):
                newData["Month"] = 1
                newData["Year"] = newData["Year"] + 1
        newData["Price_Lag"] = data["Price"].values[-1]
        newData["Price_Mean"] = data["Price"].rolling(window=3).mean().values[-1]

        prediction = CB_reg.predict(pd.DataFrame(newData, index=[0]))
        
        return {"predict": prediction[0].round(2), "previous": data["Price"].values[-1]}