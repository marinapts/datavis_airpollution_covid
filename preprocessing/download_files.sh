#!/bin/bash
# Download time series files from github repo: https://github.com/CSSEGISandData/COVID-19

mkdir ./data
wget -O ./data/time_series_covid19_confirmed_global.csv https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv
wget -O ./data/time_series_covid19_deaths_global.csv https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv
wget -O ./data/time_series_covid19_recovered_global.csv https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv