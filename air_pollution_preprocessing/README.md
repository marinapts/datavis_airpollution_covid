# Air Pollution Data - Preprocessing

# CSV Download and Column Extraction
* Separate air pollution data CSVs for each country are downloaded.
* From the multiple columns of the csv data, only the necessary columns namely LatitudeOfMeasurementStation, LongitudeOfMeasurementStation, AirQualityLevel and datebegin are needed.
* These columns are extracted through `extract_columns_csv.py`.
* The above columns must be extracted for all the CSVs, hence the below shell script `extract_columns_script.sh` would come in handy.
Script is executed inside the folder where all CSVs are located.
```bash
for f in *.csv; do python3 extract_columns_csv.py $f; done
```
* The ouptut of the script would be the CSV files with only the above mentioned columns.

## Adding AirQualityCategory 
* `AirQualityCategory` would be the measure to prepare heatmap for the visualization.
* For each of the CSV files created from the above section, `AirQualityCategory` must be added as another column
* The column is appended to the CSVs through `create_air_quality_category.py`.
* The above column must be added for all the CSVs, hence the below shell script `create_air_quality_category_script.sh` would come in handy.
Script is executed inside the folder where all CSVs are located.
```bash
for f in *.csv; do python3 create_air_quality_category.py $f; done
```
* The ouptut of the script would be the CSV files with a additional column `AirQualityCategory`.

## Combining CSVs to one
* To facilitate the ease of JSON creation, the CSV files are combined to a single csv through `combining_csvs_to_one_file.py`
* The code would produce a final data file named `air_pollution_data.csv`.
  
## Creating JSON file
* `air_pollution_json_creation.py` is used to create the JSON file with the following format
```bash
{
	date_1:{
		Data:{
		 Country_1:[
		 { Latitude: ... , Longitude: ..., AirQualityLevel: ..., AirQualityCategory: ...},
		 { ... },
		 ],
		 Country_2:[
		 { Latitude: ... , Longitude: ..., AirQualityLevel: ..., AirQualityCategory: ...},
		 { ... },
		 ],
		 ...
		},
		Updated: ...
	},
	...
}
```
* `air_pollution_data.json` is the ouput of the code with all the data for the front-end.
