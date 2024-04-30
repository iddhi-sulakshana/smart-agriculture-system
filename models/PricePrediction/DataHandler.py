import requests
import json
import pandas as pd
import os
import logging

class DataHandler:
    def __init__(self):
        self.url = "http://www.statistics.gov.lk/DashBoard/Prices/Prices_Data.php"
        self.output_dir = "./data/processed"
        self.month_map = {
            '': 0, 'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5,
            'Jun': 6, 'June': 6, 'Jul': 7, 'July': 7, 'Aug': 8,
            'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
        }
        os.makedirs(self.output_dir, exist_ok=True)

    def fetch_data(self):
        logging.info("Fetching data from the statistics website")
        response = requests.get(self.url)
        if response.status_code == 200:
            logging.info("Complete fetching data")
            return response.content.decode('utf-8-sig')
        else:
            raise Exception("Failed to fetch data: HTTP status code {}".format(response.status_code))
        
    def process_data(self):
        raw_data = self.fetch_data()
        logging.info("Processing raw data")
        filtered_data = raw_data.split("// ")
        modified_data = {}
        for i in range(len(filtered_data)):
            if(i == 0):
                continue
            modified_data[i] = '\n'.join(line for line in filtered_data[i].split('\n') if not line.startswith("Data for"))
            modified_data[i] = '\n'.join(line for line in modified_data[i].split('\n') if not line.startswith("var"))
            modified_data[i] = '\n'.join(line for line in modified_data[i].split('\n') if not line.startswith("]"))
            # wrap modified data with square brackets
            modified_data[i] = "[" + modified_data[i] + "]"
            # remove empty values
            modified_data[i] = modified_data[i].replace("''", "null")
        logging.info("Complete processing raw data")
        return modified_data
    
    def process_prices(self, price_data):
        logging.info("Process prices data")
        price_data = json.loads(price_data)
        names, prices, weeks, months, years = [], [], [], [], []
        for week_data in price_data:
            date_parts = week_data['Date'].split('.')
            week = int(date_parts[0][1:])
            month = self.month_map.get(date_parts[1])
            year = int(date_parts[2])

            for item_name, price in week_data.items():
                if item_name == 'Date' or self.should_skip_item(item_name):
                    continue

                names.append(item_name)
                prices.append(price)
                weeks.append(week)
                months.append(month)
                years.append(year)

        logging.info("Complete process price data creating dataframe")
        return pd.DataFrame({
            'Name': names, 'Price': prices, 'Week': weeks, 
            'Month': months, 'Year': years
        })
    
    def should_skip_item(self, item_name):
        skip_keywords = ["Imported", "SPICES", "FISH", "MEAT", "BAKERY", "MILK", 
                         "COCONUT", "EGGS", "FLOUR"]
        selected_items = ["Carrot_UPCVEG_1kg", "Leeks_UPCVEG_1kg", 
                          "Green_Chillies_LCVEG_1kg", "BeetRoot_UPCVEG_1kg"]
        return any(kw in item_name for kw in skip_keywords) or all(si not in item_name for si in selected_items)

    
    def getPricesDataFrame(self):
        data = self.process_data()
        price_data = self.process_prices(data[2])
        return price_data