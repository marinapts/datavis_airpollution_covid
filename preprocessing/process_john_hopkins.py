import json
import pandas as pd
import os
from collections import defaultdict


# TODO: add documentation


def load_dataframes(data_dir, country_list, country_colname='Country/Region'):
    # Set up paths for each csv file
    confirmed_path = os.path.join(data_dir, 'time_series_covid19_confirmed_global.csv')
    deaths_path = os.path.join(data_dir, 'time_series_covid19_deaths_global.csv')
    recovered_path = os.path.join(data_dir, 'time_series_covid19_recovered_global.csv')

    # Load the csv as dataframes and extract the relevant countries
    df_confirmed = pd.read_csv(confirmed_path)
    df_confirmed = df_confirmed.loc[df_confirmed[country_colname].isin(country_list) &
                                    df_confirmed['Province/State'].isna()]

    df_deaths = pd.read_csv(deaths_path)
    df_deaths = df_deaths.loc[df_deaths[country_colname].isin(country_list) &
                              df_deaths['Province/State'].isna()]

    df_recovered = pd.read_csv(recovered_path)
    df_recovered = df_recovered.loc[df_recovered[country_colname].isin(country_list) &
                                    df_recovered['Province/State'].isna()]

    return df_confirmed, df_deaths, df_recovered


def full_dataframe_for_day(df_confirmed, df_deaths, df_recovered, day, population_data):
    # Combine data from each dataframe into one dictionary
    d = {'Country/Region': df_confirmed['Country/Region'].values,
         'confirmed': df_confirmed[day].values,
         'deaths': df_deaths[day].values,
         'recovered': df_recovered[day].values,
         'active': df_confirmed[day].values - (df_deaths[day].values + df_recovered[day].values),
         'relative_confirmed': df_confirmed[day].values / population_data['population'].values,
         'relative_deaths': df_deaths[day].values / population_data['population'].values,
         'relative_recovered': df_recovered[day].values / population_data['population'].values,
         }

    # Convert to dataframe
    df = pd.DataFrame(data=d)

    return df


def day_dataframe_to_dict(df):
    # Transpose dataframe to have the countries as column
    df = df.transpose()

    # Replace header with country names
    new_header = df.iloc[0]
    df = df[1:]
    df.columns = new_header

    # Convert resulting dataframe to dictionary
    dictionary = df.to_dict()

    return dictionary


def main():
    output_dict = defaultdict(dict)

    data_dir = os.path.join(os.getcwd(), 'data', 'john_hopkins')
    output_filename = "john_hopkins_with_relative.json"
    output_path = os.path.join(data_dir, output_filename)

    # country_list = ['Italy', 'Spain']
    country_list = ['Austria',
                    'Belgium',
                    'Bulgaria',
                    'Croatia',
                    'Cyprus',
                    'Czechia',
                    'Denmark',
                    'Estonia',
                    'France',
                    'Germany',
                    'Greece',
                    'Hungary',
                    'Iceland',
                    'Ireland',
                    'Italy',
                    'Latvia',
                    'Lithuania',
                    'Luxembourg',
                    'Netherlands',
                    'Norway',
                    'Poland',
                    'Portugal',
                    'Romania',
                    'Slovakia',
                    'Slovenia',
                    'Spain',
                    'Sweden',
                    'Switzerland',
                    'United Kingdom']

    population_data = pd.read_csv(os.path.join('data', 'population', 'eurostat_population.csv'))
    population_data = population_data.loc[population_data['country'].isin(country_list)]
    population_data.sort_values(by='country', inplace=True)

    df_confirmed, df_deaths, df_recovered = load_dataframes(data_dir, country_list)

    # Extract list of days from header
    days = df_confirmed.columns[4:]

    # Loop over all days
    for day in days:
        day_df = full_dataframe_for_day(df_confirmed, df_deaths, df_recovered, day, population_data)
        output_dict[day] = day_dataframe_to_dict(day_df)

    # Write dictionary to JSON
    with open(output_path, 'w') as fp:
        json.dump(output_dict, fp, indent=4)


if __name__ == '__main__':
    main()
