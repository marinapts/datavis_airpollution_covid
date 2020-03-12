#!/bin/bash
# Download time series files from github repo: https://github.com/CSSEGISandData/COVID-19

mkdir ./../data
wget -O ../data/time_series_19-covid-Confirmed.csv https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv
wget -O ../data/time_series_19-covid-Deaths.csv https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv
wget -O ../data/time_series_19-covid-Recovered.csv https://github.com/CSSEGISandData/COVID-19/raw/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv