import pandas as pd
import os

if __name__ == '__main__':
    data_path = os.path.join(os.getcwd(), "data", "EEA", "Graph_2_data.csv")
    df = pd.read_csv(data_path, sep="\t", encoding="utf-16", engine="python")
