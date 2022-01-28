# Leaflet-Challenge
![USGS Logo](/images/1-Logo.png)<br><br>
## Visualizing Data with Leaflet
"Welcome to the United States Geological Survey, or USGS for short. The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!<br><br>
The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet."

### Data set
The USGS provides earthquake data in a number of different formats, updated every 5 minutes. From the [USGS GeoJSON Feed page](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) the  "All Earthquakes from the Past 7 Days" data was selected for this assignment. To visualize techtonic plates and their relationship to seismic activity additonal data was pulled from the following GitHub page https://github.com/fraxen/tectonicplates. 

### Import & Visualize the Data
I created a map using Leaflet that plots all of the earthquakes from from the past 7 days based on their longitude and latitude.

- Data markers were created to reflect the magnitude of each earthquake by their size and the depth of the earthquake by color. 
  - Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color.
  - Popups on each marker provide additional information about the earthquake when a marker is clicked.
- Multiple base maps: Greyscale, Satelite, Default
- Tectonic plate layer created. 
- Tectonic plate and Earthquake layers are overlays that can be turned on and off independently. 
- Legend created to provide context for the map data.

![Map Image](/images/map_Screenshot.png)
