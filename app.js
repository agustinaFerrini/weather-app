window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector (".temperature-description");
    let temperatureDegree = document.querySelector (".temperature-degree");
    let locationTimeZone = document.querySelector (".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            //const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${long},${lat}?key=LAJCEF75LSYTA9BKR9TULK9YR&taskId=682b8b20423f809daaaeeb67e3cab9ac`

            fetch(api)
              .then(response => {
                return response.json();
              })
              .then(data => {
                console.log(data);
                const{ temp, icon, description} = data.currentConditions;
                //set DOM elements from the API
                temperatureDegree.textContent = data.currentConditions.temp;
                locationTimeZone.textContent = data.timezone;
                temperatureDescription.textContent = data.description;
                //set Icon
                setIcons(icon, document.querySelector(".icon"));
                
                
               

               

              //Change temperature to Celsius/Farenheit
               temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F" ) {
                  temperatureSpan.textContent = "C";
                  const celsius = (temp - 32) * (5 / 9);
                  temperatureDegree.textContent = Math.floor(celsius);
                } else {
                  temperatureSpan.textContent = "F";
                  temperatureDegree.textContent = temp;
                  
                }
              });  
            });
             
          });


           

        };

       
     function setIcons(icon, iconID) {
      const skycons = new Skycons({color:"white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconID, Skycons[currentIcon]);
     }     

    });

