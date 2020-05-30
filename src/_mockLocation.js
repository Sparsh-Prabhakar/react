import * as Location from 'expo-location'

const tenMetersWithDegrees = 0.001

const getLocation = increment => {
    return {
        timestamp: 10000000,
        coords: {
            speed: 0,
            heading: 0,
            accuracy: 5,
            altitudeAccuracy: 5,
            altitude: 5,
            longitude: 72.8688347 + increment * tenMetersWithDegrees,
            latitude: 19.108896 + increment * tenMetersWithDegrees
        }
    }      
}

let counter = 0
setInterval( () => {
    Location.EventEmitter.emit('Expo.locationChanged', {
        watchId: Location._getCurrentWatchId(),
        Location: getLocation(counter)
    })
    counter++
}, 1000) 