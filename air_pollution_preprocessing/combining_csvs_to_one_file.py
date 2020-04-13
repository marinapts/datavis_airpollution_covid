import os
import csv, glob

Dir = r"D:\Data Vis\Data\Final_csv" #where the csv's for json creation are present
Avg_Dir = r"D:\Data Vis"  #where you want the JSON to be created

csv_file_list = glob.glob(os.path.join(Dir, '*.csv')) # returns the file list
print (csv_file_list)

with open(os.path.join(Avg_Dir, 'air_pollution_data.csv'), 'w+', newline='') as f:
	wf = csv.writer(f, lineterminator='\n')
	i=0
	for files in csv_file_list:
		with open(files, 'r') as r:
			if i!=0:
				next(r)
			i = 1
			rr = csv.reader(r)
			for row in rr:
				wf.writerow(row)