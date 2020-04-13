import argparse
import pandas as pd
import json


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Convert csv to json')
    parser.add_argument('--csv', type=str, help='the path to the csv file to convert')
    parser.add_argument('--json', help='the path for the json file to be created')

    args = parser.parse_args()
    print(args)
    data = pd.read_csv(args.csv)

    dates = {}

    for idx, row in data.iterrows():  # Loop through all the rows of the csv file
        month, day, year = row['datebegin'].split('/')
        date = month + '/' + day + '/' + '20'
        day_data = {
            'AirQualityLevel': row['AirQualityLevel'],
            'Latitude': row['LatitudeOfMeasurementStation'],
            'Longitude': row['LongitudeOfMeasurementStation'],
            'Country': row['Country']
        }

        if date in dates:
            dates[date].append(day_data)
        else:
            dates[date] = [day_data]

    with open(args.json, 'w') as f:
        json.dump(dates, f)
