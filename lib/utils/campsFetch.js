const fetch =  require('node-fetch');
// import fetch from 'node-fetch';

async function fetchCampgroundFacilitiesByState(state){
  const array = [];
  const url = `https://ridb.recreation.gov/api/v1/facilities?query=campground&limit=50&offset=0&state=${state}`;
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.RECREATION_GOV_API_KEY
    },
  });
  const res = await data.json();
  res.RECDATA.map((facility) => {
    array.push({
      facilityID: facility.FacilityID,
      facilityName: facility.FacilityName,
      facilityDescription: facility.FacilityDescription,
      facilityDirections: facility.FacilityDirections,
      facilityPhone: facility.FacilityPhone,
      facilityLongitude: facility.FacilityLongitude,
      facilityLatitude: facility.FacilityLatitude
    });
  });
  const countPerState = Number(res.METADATA.RESULTS.TOTAL_COUNT);
  const campgroundCount = 50;
  const loops = Math.floor(countPerState / campgroundCount);
  console.log(loops);
  //set number starting at 0, mulitples of 50 times(loops)
  //   console.log(res.METADATA.RESULTS.TOTAL_COUNT);
  for (let i = 1; i < loops; i++){
    const offset = i * campgroundCount;
    const offsetUrl = `https://ridb.recreation.gov/api/v1/facilities?query=campground&limit=50&offset=${offset}&state=${state}`;
    const offsetData = await fetch(offsetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.RECREATION_GOV_API_KEY
      },
    });
    const offsetRes = await offsetData.json();
    offsetRes.RECDATA.map((facility) => {
      array.push({
        facilityID: facility.FacilityID,
        facilityName: facility.FacilityName,
        facilityDescription: facility.FacilityDescription,
        facilityDirections: facility.FacilityDirections,
        facilityPhone: facility.FacilityPhone,
        facilityLongitude: facility.FacilityLongitude,
        facilityLatitude: facility.FacilityLatitude
      });
    });
  }
  return array;

}

async function fetchAllCampgroundFacilities(){
  const url = 'https://ridb.recreation.gov/api/v1/facilities?query=campground&limit=50&offset=0';
  const data = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'apikey': process.env.RECREATION_GOV_API_KEY
    },
  });
  const res = await data.json();
  const vitalInfo = res.RECDATA.map((facility) => {
    return {
      facilityID: facility.FacilityID,
      facilityName: facility.FacilityName,
      facilityDescription: facility.FacilityDescription,
      facilityDirections: facility.FacilityDirections,
      facilityPhone: facility.FacilityPhone,
      facilityLongitude: facility.FacilityLongitude,
      facilityLatitude: facility.FacilityLatitude
    };
  });
  return vitalInfo;
}
module.exports = { fetchCampgroundFacilitiesByState, fetchAllCampgroundFacilities };
