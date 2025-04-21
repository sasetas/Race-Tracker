# Project Summary
The project focuses on processing GPS data from races to create a structured JSON file suitable for visualization. It aims to enhance data analysis and visualization capabilities for race tracking, ensuring accurate representation of boat movements and metrics.

# Project Module Description
The main functional module involves data parsing and transformation of GPS data into a GeoJSON format. Key tasks include handling timestamps correctly, managing data types, and structuring the output for visualization.

# Directory Tree
```
.
├── code.ipynb              # Interactive notebook for data processing
├── data                    # Contains processed data files
│   └── race_data.json      # JSON file with structured race data
└── uploads                 # Directory for uploaded data files
    └── gpsdata.csv         # Raw GPS data for processing
```

# File Description Inventory
- **code.ipynb**: Interactive notebook where data processing code is executed.
- **data/race_data.json**: Output file containing processed GPS data in a structured format for visualization.
- **uploads/gpsdata.csv**: Input file with raw GPS data to be processed.

# Technology Stack
- Python
- GeoJSON
- Jupyter Notebook

# Usage
To set up and run the project:
1. Install necessary dependencies.
2. Open the `code.ipynb` in a Jupyter Notebook environment.
3. Execute the code cells to process the GPS data and generate the `race_data.json` file.
