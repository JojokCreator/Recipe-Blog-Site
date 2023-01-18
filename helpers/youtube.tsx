const youtube = async() => {
  const response = await fetch (`https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCsPGY5C60Rj0-rEdZlR9HsQ&maxResults=25&key=${process.env.YOUTUBE_APP_KEY}`)
  const data = response.json()
  return data
}

export default youtube