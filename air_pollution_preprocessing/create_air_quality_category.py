import csv
import sys


def process(f):
    with open(f,'r') as csvinput:
        country = f.split("_")
        print(country)
        new_file = 'air_pollution_' + country[3] + '_final.csv'
        with open('./new_csv/' + new_file, 'w') as csvoutput:
            writer = csv.writer(csvoutput, lineterminator='\n')
            reader = csv.reader(csvinput)

            all = []
            row = next(reader)
            row.append('AirQualityCategory')
            row.append('Country')
            all.append(row)

            for row in reader:
                if (0 <= float(row[0]) <= 50):
                    row.append(1)
                elif (50 < float(row[0]) <= 100):
                    row.append(2)
                elif (100 < float(row[0]) <= 150):
                    row.append(3)
                elif (150 < float(row[0]) <= 200):
                    row.append(4)
                elif (200 < float(row[0]) <= 300):
                    row.append(5)
                else:
                    row.append(6)
                row.append(country[3])
                all.append(row)

            writer.writerows(all)


process(sys.argv[1])
