from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import requests
from geopy.distance import geodesic

app = Flask(__name__)

# Store points as a list of dictionaries
locations = []  # This list will reset every time the server restarts

# Geocoding function to convert address to latitude and longitude
def geocode_address(address):
    api_key = "AIzaSyAf7z9qAsU1_yzblAX8aNNJsQJsYtVkujs"  # Replace with your actual API key
    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}"
    response = requests.get(geocode_url)
    result = response.json()

    if response.status_code == 200 and result['status'] == 'OK':
        location = result['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    else:
        return None, None

# Function to calculate the optimized route using a simple nearest neighbor approach
def optimize_route(locations):
    optimized_locations = []
    if not locations:
        return optimized_locations
    
    # Start with the first location
    current_location = locations[0]
    optimized_locations.append(current_location)
    remaining_locations = locations[1:]

    while remaining_locations:
        # Find the closest location to the current location
        closest_location = min(remaining_locations, key=lambda loc: geodesic((current_location['lat'], current_location['lng']), (loc['lat'], loc['lng'])).km)
        optimized_locations.append(closest_location)
        remaining_locations.remove(closest_location)
        current_location = closest_location
    
    return optimized_locations

@app.route('/', methods=['GET', 'POST'])
def index():
    global locations
    if request.method == 'POST':
        # Handle adding locations manually (you can extend this to handle other POST requests)
        address = request.form['address'].strip()  # Remove extra spaces
        if address:
            lat, lng = geocode_address(address)
            if lat and lng:
                locations.append({"lat": lat, "lng": lng})

        return redirect(url_for('index'))

    return render_template('index.html', locations=locations)

@app.route('/clear', methods=['POST'])
def clear_locations():
    """Clear all stored locations."""
    global locations
    locations = []  # Reset list
    return redirect(url_for('index'))

@app.route('/optimize', methods=['GET'])
def get_optimized_route():
    """Returns the optimized route (order of locations)."""
    optimized_locations = optimize_route(locations)
    return jsonify(optimized_locations)

if __name__ == '__main__':
    app.run(debug=True)
