const axios = require("axios");
const fetchToken = require("./token");

async function fetchMe() {
  const { access_token } = await fetchToken()
  
  const getMeRequest = await axios.get(
      `https://api.zoom.us/v2/users/me`,
      {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${access_token}` },
      }
    );
  // console.log('Request Account:', getMeRequest.data);
  return {...getMeRequest.data, access_token }
}

async function fetchMeetings() {
  const { id, access_token } = await fetchMe()
  
  const getMeetingsRequest = await axios.get(
      `https://api.zoom.us/v2/users/${id}/meetings?type=past`,
      {
        headers: { 
          "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${access_token}` },
      }
    );
  const data = getMeetingsRequest.data

  for (const meeting of data.meetings) {
    const getPastMeetingsRequest = await axios.get(
      `https://api.zoom.us/v2/report/meetings/${meeting.id}`,
      {
        headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${access_token}` },
      }
    );

    const getPastMeetingParticipants = await axios.get(
      `https://api.zoom.us/v2/report/meetings/${meeting.id}/participants`,
      {
        headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${access_token}` },
      }
    );

    console.log('MEETINGS:', meeting);
    console.log('PAST MEETING RESULTS:', getPastMeetingsRequest.data);
    console.log('PAST MEETING PARTICIPANTS:',  getPastMeetingParticipants.data);
  }
}

setInterval(fetchMeetings, 10000)