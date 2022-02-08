const api_Key = 'RGAPI-5bc29a38-e274-4121-ba4c-b2df6ea95db5'


runForm = {
  playerName: document.querySelector('input#player_name'),
  regionServer: document.querySelector('select#regions'),

  getvalues(){
    return {
      playerName: runForm.playerName.value,
      regionServer: runForm.regionServer.value
    }
  },

     submit(event){
     event.preventDefault()
  
     try {
      const {playerName} = runForm.getvalues()
      Form.testinfo(playerName)  
      Form.renderMatches()
     } catch(error){
       alert(error.message)
     }
   }
}




const Form = {

  testinfo(infos1){
    let playerUrl = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${infos1}?api_key=${api_Key}`
    console.log(infos1)
    return playerUrl
  },

  async getPlayerInfo(){
    let playerUrl = Form.testinfo()
    
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
    let {puuid} = await Form.renderPlayerUUID()
    let html = ''
    setTimeout(() => {
      matches.forEach(mtch => {
        let player = mtch.info.participants.find(m => m.puuid === puuid)
        console.log(player)


        if(player.item === 0){
          console.log(teste)
        }

        let htmlSegment = 
        `
        <div class="match_item win_${player.win}">
        <div class="match_champ"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${player.championName}.png" alt="champion image"></div>
        <div class="match_kda">${player.kills}<span>/</span>${player.deaths}<span>/</span>${player.assists}</div>
        <div class="match_build">
          <ul>
            <li class="item"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item0}.png" alt=''></li>
            <li class="item"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item1}.png" alt=''></li>
            <li class="item"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item2}.png" alt=''></li>
            <li class="item"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item3}.png" alt=''></li>
            <li class="item"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item4}.png" alt=''></li>
            <li class="item"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item5}.png" alt=''></li>
            <li class="trinket"><img src="https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/${player.item6}.png" alt="trinket" alt=''></li>
          </ul>
        </div>
        <div class="cs">${player.neutralMinionsKilled + player.totalMinionsKilled}</div>
        <div class="match_spells">
          <ul>
            <li class="spell"><img src="/assets/spells/Summoner${player.summoner1Id}.png" alt=""></li>
            <li class="spell"><img src="/assets/spells/Summoner${player.summoner2Id}.png" alt=""></li>
          </ul>
        </div>
      </div>
        `
        
        html += htmlSegment
        let matchItem = document.querySelector('.history_section')
        matchItem.innerHTML = html
      })
    }, 5000)
    
 },
 


}




