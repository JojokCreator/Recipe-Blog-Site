const youtube = async() => {
  const response = await fetch (`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=PL03CjUtMPnpS_t9vZpxI9AU3wKpdOdMhd&key=${process.env.YOUTUBE_APP_KEY}`)
  const data = response.json()
  return data
}

export default youtube


