window.addEventListener('load', () => {
  let long;
  let lat;
  let tempDescBox = document.querySelector('.temperature-description');
  let tempDegreeBox = document.querySelector('.temperature-degree');
  let timeZoneBox = document.querySelector('.location-timezone');
  let nextDays = document.querySelector('.next-days');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `https://api.darksky.net/forecast/473eddfe2f2be871cff19a335194e540/${lat},${long}`;
      fetch(api)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          const {
            temperature,
            summary,
            icon
          } = data.currently; // data.currently.temperature;

          //next days
          const daysArr = data.daily.data;
          console.log(daysArr);

          let output = '';

          daysArr.forEach((element, index) => {
            output += `
            <div class="day day-${index}">
            <div class="day-temperature">${element.temperatureMax}</div>
            <div class="day-summary">${element.summary}</div>
            </div>`;
            console.log(output);
          });

          // nextDays.appendChild(output);
          // Set DOM Element from the API
          tempDegreeBox.textContent = Math.floor((temperature - 32) * (5 / 9));
          tempDescBox.textContent = summary;
          timeZoneBox.textContent = data.timezone;
          //Set Icon
          setIcons(icon, document.querySelector('.icon'));
        });
    });
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({
      color: "#EFEFEF"
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
})