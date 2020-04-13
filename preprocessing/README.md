# datavis_coronavirus

Navigate to the root folder of the project (datavis_coronavirus)
and run the following command to download the COVID-19 data:

```
bash preprocessing/download_files.sh
```

To create, activate and update the virtual environment with the relevant packages,
run the following three commands:
```
python3 -m venv ./preprocessing/.env
source ./preprocessing/.env/bin/activate
pip install -r ./preprocessing/requirements.txt
```

To pre-process the COVID-19 data, run:
```
python3 ./preprocessing/process_covid_data.py
```

