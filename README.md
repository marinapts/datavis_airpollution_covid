# Data Visualisation Project

In this interactive visualisation project, we plot the air pollution data (NO<sub>2</sub>) of 29 European countries from the day that
the first Covid-19 confirmed cases appeared (\~24 January) until today. We also plot the confirmed cases
of Covid-19 in these countries and we attempt to show how air pollution has been affected since the first
appearance of Covid-19.

We use data from two different sources:

* Air pollution: https://www.eea.europa.eu/themes/air/air-quality-and-covid19/monitoring-covid-19-impacts-on
* Covid-19: https://github.com/CSSEGISandData/COVID-19

We preprocess the data in the folders `air_pollution_preprocessing` and `preprocessing`, where one can find instructions
on how to run the scripts.

The visualisation project is built with React and can be found in the `visualisation` project.
To run this, you should have both the air pollution and covid json files, and place them in `visualisation/src/data`:

`visualisation/src/data/air_pollution_data.json`

`visualisation/src/data/covid.json`

## Node installation
We use [npm](https://www.npmjs.com/) as a package manager for the JavaScript platform, so you should have
the latest [Node](https://nodejs.org/en/download/) version installed on your machine before running the application.


## Run the application

```bash
cd visualisation
npm install
npm run start
```
The application should start running in localhost:3000
