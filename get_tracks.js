const tracks = [ 'frontend', 'backend', 'web3', 'product design' ]
const devs = [ 'frontend', 'backend', 'web3' ]

function getMeetingTrack(topic) {
    if(topic.toLowerCase().includes('l23d')) return devs
    if(topic.toLowerCase().includes('l23e')) return tracks
    if(topic.toLowerCase().includes('l23f')) return [ 'frontend' ]
    if(topic.toLowerCase().includes('l23b')) return [ 'backend' ]
    if(topic.toLowerCase().includes('l23p')) return [ 'product design' ]
    return []
}

console.log(getMeetingTrack('Q&A Session L23'))