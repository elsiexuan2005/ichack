from flask import Flask, render_template, request, redirect, url_for
import json
import requests

app = Flask(__name__)

# Store points as a list of dictionaries
locations = []  # This list will reset every time the server restarts

# Geocoding function to convert address to latitude and longitude
def geocode_address(address):
    api_key = "YOUR_GOOGLE_API_KEY"  # Replace with your actual API key
    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}"
    response = requests.get(geocode_url)
    result = response.json()

    if response.status_code == 200 and result['status'] == 'OK':
        location = result['results'][0]['geometry']['location']
        return location['lat'], location['lng']
    else:
        return None, None

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

if __name__ == '__main__':
    app.run(debug=True)
