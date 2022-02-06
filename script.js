const api_Key = 'RGAPI-20c3afac-f298-4331-aaed-48a2b8a3d302'

const Form = {

  playerName: document.querySelector('input#player_name').value,
  regionServer: document.querySelector('select#regions').value,

  

  async getPlayerInfo(){
    let playerUrl = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${Form.playerName}?api_key=${api_Key}`
    
    try {
      let res = await fetch(playerUrl)

      return await res.json()
    } catch (error) {
      console.log(error)
    }
  },

  async renderPlayerUUID(){

    let player = await Form.getPlayerInfo()
    let puuid = player.puuid
    return {
      puuid,
    }
  },


  async fetchMatches() {
    let {puuid} = await Form.renderPlayerUUID()
    let matchUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5&api_key=${api_Key}`

    try {
      let res = await fetch(matchUrl)
      
      return await res.json()
    } catch (error) {
      console.log(error)
    }
  },

  async fetchShortHand(){
    let matches = await Form.fetchMatches()
    let matchArray = []
    matches.forEach(match => {

      let matchesUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=${api_Key}`
     
      matchArray.push(matchesUrl)
    })
    return matchArray
  },

  async matchInfos(){
    let matchArray = await Form.fetchShortHand()
    let matchInfoArray = []
    matchArray.forEach(async arr => {
      let res = await fetch(arr).then(resp => resp.json())
      
      matchInfoArray.push(res)
    })
    return matchInfoArray
 },

 async renderMatches(){
    let matches = await Form.matchInfos()
    let test = matches[0]
   console.log(test)
 }
}


Form.renderMatches()