      console.log("kaise ho dost");

      const API_KEY = "cfcea8431fed3e88a07ae29b7df3f912";

      document.querySelector(".surch").addEventListener("click", () => {
        getWeather();
      });

      document.querySelector(".input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") getWeather();
      });

      async function getWeather() {
        let city = document.querySelector(".input").value.trim();
        const box = document.querySelector(".data");

        if (!city) {
          box.innerHTML = "Pehle city ka naam to daal bdk";
          return;
        }

        box.innerHTML = `<div class="loading">Fetching weather...</div>`;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`;

        try {
          const res = await fetch(url);

          if (!res.ok) {
            box.innerHTML = "City nahi mili, sahi name daal bro";
            return;
          }

          const data = await res.json();

          const temp = data.main.temp;
          const feels = data.main.feels_like;
          const desc = data.weather[0].description;
          const name = data.name;
          const country = data.sys.country;

          let emoji = "🌍";
          if (desc.includes("cloud")) emoji = "☁️";
          if (desc.includes("rain")) emoji = "🌧️";
          if (desc.includes("clear")) emoji = "☀️";
          if (desc.includes("snow")) emoji = "❄️";

          box.innerHTML = `
            <div class="emoji">${emoji}</div>
            <p><strong>${name}, ${country}</strong></p>
            <p>Temperature: ${temp} °C</p>
            <p>Feels Like: ${feels} °C</p>
            <p>Condition: ${desc}</p>
          `;
        } catch (error) {
          box.innerHTML = "Error fetching data, net check kar le bhai";
        }
      }