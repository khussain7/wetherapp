const CityName = document.getElementById("CityName");
const submitBtn = document.getElementById("submitBtn");
const cityNameDiv = document.getElementById("city_name");
const currentDay = document.getElementById("day");
const currentDate = document.getElementById("today_date");
const tempStatus = document.getElementById("temp_status");
const currentTemp= document.getElementById("temp");

const getCurrentDay = () => {
            
  var weekDay = Array(7);
  weekDay[0] = 'Sun';
  weekDay[1] = 'Mon';
  weekDay[2] = 'Tue';
  weekDay[3] = 'Wed';
  weekDay[4] = 'Thur';
  weekDay[5] = 'Fri';
  weekDay[6] = 'Sat';

  let currentTime = new Date();
  return weekDay[currentTime.getDay()];
};

const getCurrentTime = (num) => {
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
  
  var now = new Date();
  var month = months[now.getMonth() + 1];
  var date = now.getDate();

  let hours = now.getHours();
  let mins = now.getMinutes();

  let periods = "AM";

  if (hours > 11) {
  periods = "PM";
  if (hours > 12) hours -= 12;
  }
  if (mins < 10) {
  mins = "0" + mins;
  }

  return `${month} ${date} | ${hours}:${mins}${periods}`;
};

currentDay.innerHTML = getCurrentDay() + " , " 
currentDate.innerHTML =  getCurrentTime();

const getInfo = async (event) =>{
    event.preventDefault();
    let cityVal = CityName.value;
    if(cityVal === ""){
        cityNameDiv.innerHTML = `Please enter name before search!`;
    }
    else
    {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=b5da410f1781b5fb1aad30d307354d59`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      currentTemp.innerHTML = arrData[0].main.temp+'<sup>o</sup>C';
      cityNameDiv.innerHTML = arrData[0].name+', '+ arrData[0].sys.country;
      const tempLiveStatus = arrData[0].weather[0].main;
      if (tempLiveStatus == "Sunny") {
        tempStatus.innerHTML ="<i class='fas  fa-sun' style='color: #eccc68;'></i>";
      } else if (tempLiveStatus == "Clouds") {
        tempStatus.innerHTML ="<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempLiveStatus == "Rainy") {
        tempStatus.innerHTML ="<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
      }else if (tempLiveStatus == "Haze") {
        tempStatus.innerHTML ="<i class='fas fa-smog' style='color: #f1f2f6;'></i>";
      } 
      else {
        tempStatus.innerHTML ="<i class='fas  fa-cloud-rain' style='color:#f1f2f6;'></i>";
      }

    }
};

submitBtn.addEventListener("click", getInfo);