import csv
import sys


def process(f):
    with open(f, 'r') as csvinput:
        list = f.split("_")
        country = list[2].split('.')
        new_file = 'air_pollution_' + country[0] + '_appended.csv'
        with open(new_file, 'w') as csvoutput:
            writer = csv.writer(csvoutput, lineterminator='\n')
            reader = csv.reader(csvinput)
            in_iter = ((r[3], r[12], r[13], r[22]) for r in reader)
            writer.writerows(in_iter)


process(sys.argv[1])
