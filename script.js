

const Form = {

  playerName: document.querySelector('input#player_name').value,
  regionServer: document.querySelector('select#regions').value,

  

  async getPlayerInfo(){
    let playerUrl = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${Form.playerName}?api_key=RGAPI-df6f50e8-a9dc-4525-b871-0808cd2b92c9`
    
    try {
      let res = await fetch(playerUrl)

      return await res.json()
    } catch (error) {
      console.log(error)
    }
  },

  async renderPlayerInfo(){

    let player = await Form.getPlayerInfo()
    let puuid = player.puuid
    let name = player.name
    let playerIcon = player.profileIconId
    return {
      puuid,
      name,
      playerIcon
    }
  }
  

}


console.log()