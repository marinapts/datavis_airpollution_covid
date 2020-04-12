import pandas as pd
from datetime import date, timedelta	
import json
import os

dict = {}
data = pd.read_csv(os.path.join("air_pollution_data.csv"))
data['datebegin'] = pd.to_datetime(data['datebegin'],infer_datetime_format=False)
data = data.sort_values(by='datebegin',ascending=True)
while not data.empty:
	start = data['datebegin'].iloc[0]
	date_key = start.strftime('{0}/{1}'.format(start.month, start.day))
	date_key = date_key+ "/20"
	dict[date_key] = {}
	end =  start + timedelta(weeks=1)
	filtered = data[(start <= data['datebegin']) &(data['datebegin'] < end)]
	data = data[~((start <= data['datebegin']) &(data['datebegin'] < end))]
	country_list = filtered['Country'].unique().tolist()
	dict[date_key]["Data"] = {}
	for country in country_list:
		country_name = country.capitalize()
		content = []
		final = filtered[filtered['Country'] == country ]
		for index, row in final.iterrows():
			info = {
				"Latitude":    row['LatitudeOfMeasurementStation'],
				"Longitude": row['LongitudeOfMeasurementStation'],
				"AirQualityLevel":  row['AirQualityLevel'],
				"AirQualityCategory":  row['AirQualityCategory'],
			}
			content.append(info)
		dict[date_key]["Data"][country_name] = content	
		dict[date_key]["Updated"] = "true"
		
	new_date = start
	for i in range(1,7):
		new_date = new_date + timedelta(days=1)
		new_date_key = new_date.strftime('{0}/{1}'.format(new_date.month, new_date.day))
		new_date_key = new_date_key + "/20"
		dict[new_date_key] = {}
		dict[new_date_key]["Data"] = dict[date_key]["Data"]
		dict[new_date_key]["Updated"] = "false"

with open('air_pollution_data.json', 'w', encoding='utf-8') as f:
	json.dump(dict, f)