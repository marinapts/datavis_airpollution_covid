import os
import csv
import glob
import argparse


parser = argparse.ArgumentParser(description='Combine csv files into one')
parser.add_argument('--csv_folder', type=str, help='where the csv\'s for json creation are present')
parser.add_argument('--dest_folder', help='the folder to put the combined csv file')
args = parser.parse_args()
print(args)

csv_file_list = glob.glob(os.path.join(args.csv_folder, '*.csv'))  # returns the file list
print (csv_file_list)

with open(os.path.join(args.dest_folder, 'air_pollution_data.csv'), 'w+') as f:
    wf = csv.writer(f, lineterminator='\n')
    i = 0
    for files in csv_file_list:
        with open(files, 'r') as r:
            if i != 0:
                next(r)
            i = 1
            rr = csv.reader(r)
            for row in rr:
                wf.writerow(row)
