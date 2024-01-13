const axios = require("axios");
const fetchRequestDetails = require("./auth_details");

async function fetchMeetingDetails() {
  const { id, headers, baseUrl } = await fetchRequestDetails();
console.log(headers);
  const { data: { meetings }} = await axios.get(`${baseUrl}/users/${id}/meetings?type=past`, { headers });
  
  for (const meeting of meetings) {
    if (meeting.join_url === "https://us02web.zoom.us/j/83907339098?pwd=bCs5VlNPVWVPQm1WdVM4SzBuMTQ2dz09") {
      const meetingUrl = `${baseUrl}/report/meetings/${meeting.id}`
      const { data } = await axios.get(meetingUrl, { headers });
      const meetingReport = data
      
      const meetingParticipantsUrl = `${baseUrl}/report/meetings/${meeting.id}/participants?page_size=100`
      const { data: { participants, page_count, next_page_token }} = await axios.get(`${meetingParticipantsUrl}`, { headers });
      let meetingParticipants = participants
      let nextPageToken = next_page_token
      let t = 0
      for(let i = 2; page_count && page_count >= i; i++) {
        const url =  `${meetingParticipantsUrl}&next_page_token=${nextPageToken}`
        const { data: { participants, next_page_token }} = await axios.get(url, { headers });
        nextPageToken = next_page_token
        
        meetingParticipants = [...meetingParticipants, ...participants]
        t++
      }
      
      console.log("MEETING REPORT:", meetingReport);
      console.log('participants length:', meetingParticipants.length);
      console.log("DONE");
    }
  }
}

setInterval(fetchMeetingDetails, process.env.FETCH_TIME)