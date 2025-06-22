

const returnWeatherImage = (weather: string, pod: string) => {
    switch (weather) {
        case 'clear sky':
            return pod === 'd' ? '/clearSky.svg' : '/clearSky-n.svg'
        case 'few clouds':
            return pod === 'd' ? '/fewClouds.svg' : '/fewClouds-n.svg'
        case 'scattered clouds':
            return '/scattered.svg'
        case 'overcast clouds':
            return '/scattered.svg'
        case 'broken clouds':
            return '/broken.svg'
        case 'shower rain':
            return '/showerRain.svg'
        case 'rain' :
            return '/rain.svg'
        case 'thunderstorm':
            return '/thunderstorm.svg'
        case 'snow':
            return '/snow.svg'
        case 'mist':
            return '/wind.svg'
        case 'light rain':
            return '/rain.svg'
        default:
            break;
    }
}

export default returnWeatherImage;