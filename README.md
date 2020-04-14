## Interactive Visualisation of Air Pollution in Europe During the COVID-19 Pandemic


### Description
In this interactive visualisation project, we present the relationship between the current COVID-19 outbreak
and the air pollution levels in Europe. Since the outbreak, many European countries have gone into a lockdown
with varying levels of severity, impacting both traffic and industry. Thus, the choice has been made to make
a visualisation that shows if and where air pollution levels have changed in Europe since the first cases arose.

On the map we plot the air pollution data (NO<sub>2</sub>) of 29 European countries from the day the first COVID-19
confirmed cases appeared (24 January 2020) until the recently updated date (5 April 2020). We also plot the confirmed
cases of COVID-19 for all countries per day and the average NO<sub>2</sub> level of pullution on the right panel.

The visualisation can be accessed here: https://datavis-project.herokuapp.com/

### Data
We first collected the NO<sub>2</sub> air pollution data from https://www.eea.europa.eu/themes/air/air-quality-and-covid19/monitoring-covid-19-impacts-on
from the beginning of 2020 until now and filtered out the days initial days of January for which there were still no
confirmed COVID-19 cases in Europe. We then collected the COVID-19 data from https://github.com/CSSEGISandData/COVID-19
and preprocessed both datasets into JSON objects

### Tools Used
The webpage was created using the React.js library. For the map we used the Google Maps JavaScript API and for the
charts we used react-chartjs-2, which is a wrapper for Chart.js
