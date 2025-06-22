

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
        case 'light intensity shower rain':
            return '/rain.svg'
        case 'heavy intensity shower rain':
            return '/rain.svg'
        case 'ragged shower rain':
            return '/rain.svg'
        case 'light intensity drizzle':
            return '/showerRain.svg'
        case 'drizzle':
            return '/showerRain.svg'
        case 'heavy intensity drizzle':
            return '/showerRain.svg'
        case 'light intensity drizzle rain':
            return '/showerRain.svg'
        case 'drizzle rain':
            return '/showerRain.svg'
        case 'heavy intensity drizzle rain':
            return '/showerRain.svg'
        case 'shower rain and drizzle':
            return '/showerRain.svg'
        case 'heavy shower rain and drizzle':
            return '/showerRain.svg'
        case 'shower drizzle':
            return '/showerRain.svg'
        case 'rain':
            return '/rain.svg'
        case 'light rain':
            return '/rain.svg'
        case 'moderate rain':
            return '/rain.svg'
        case 'heavy intensity rain':
            return '/rain.svg'
        case 'very heavy rain':
            return '/rain.svg'
        case 'extreme rain':
            return '/rain.svg'
        case 'freezing rain':
            return '/frozen.svg'
        case 'thunderstorm':
            return '/thunderstorm.svg'
        case 'thunderstorm with light rain':
            return '/thunderstorm.svg'
        case 'thunderstorm with rain':
            return '/thunderstorm.svg'
        case 'thunderstorm with heavy rain':
            return '/thunderstorm.svg'
        case 'light thunderstorm':
            return '/thunderstorm.svg'
        case 'heavy thunderstorm':
            return '/thunderstorm.svg'
        case 'ragged thunderstorm':
            return '/thunderstorm.svg'
        case 'thunderstorm with light drizzle':
            return '/thunderstorm.svg'
        case 'thunderstorm with drizzle':
            return '/thunderstorm.svg'
        case 'thunderstorm with heavy drizzle':
            return '/thunderstorm.svg'
        case 'snow':
            return '/snow.svg'
        case 'light snow':
            return '/snow.svg'
        case 'heavy snow':
            return '/snow.svg'
        case 'sleet':
            return '/snow.svg'
        case 'light shower sleet':
            return '/snow.svg'
        case 'shower sleet':
            return '/snow.svg'
        case 'light rain and snow':
            return '/snow.svg'
        case 'rain and snow':
            return '/snow.svg'
        case 'light shower snow':
            return '/snow.svg'
        case 'shower snow':
            return '/snow.svg'
        case 'heavy shower snow':
            return '/snow.svg'
        case 'mist':
            return '/wind.svg'
        case 'smoke':
            return '/wind.svg'
        case 'haze':
            return '/wind.svg'
        case 'sand/dust whirls':
            return '/wind.svg'
        case 'fog':
            return '/wind.svg'
        case 'sand':
            return '/wind.svg'
        case 'dust':
            return '/wind.svg'
        case 'volcanic ash':
            return '/wind.svg'
        case 'squalls':
            return '/wind.svg'
        case 'tornadoF':
            return '/wind.svg'
        case 'light rain':
            return '/rain.svg'
        default:
            break;
    }
}

export default returnWeatherImage;