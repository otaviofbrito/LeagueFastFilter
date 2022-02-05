
FETCH NO SUMMONER -> GET NO PUIID -> FETCH NA LIST OF MATCHS PASSANDO PUUID -> GET NA MATCH ID -> FETCH NA MATCH ESPECIFICA PASSANDO A MATCH ID



fetch https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/FLA%20Struffer%20rx

NO SUMMONER PEGAR PLAYER ICONE + NOME + LEVEL + INFOS

passando nome + tagSERVER EXEMPLO BR1 (VAI FICAR NO select altera inicio da url)
get no puuid para buscar matches



depois disso buscar o historico de matches com fetch no
https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/8ev7N6R-5nJcUp90dp7GYfkwWEdK9dPX3m6YrR3LcMpe4SOAT2MLFT9OcCeBNhjAVBngaCKCE_bv7Q/ids?start=0&count=20
passando o puuid

depois disso pegar a match especifica exemplo BR1_2456574696
FETCH https://americas.api.riotgames.com/lol/match/v5/matches/BR1_2456574696
passando o id da match (atencao ao inicio da url passando a regiao)

com isso pegar RESULTADO + KDA + CAMPEAO + ICONE DO CAMPEAO + CS + ITEMS + SPELLs





https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/Ahri.png
PEGAR ICONES DO CAMPEAO AQUI

https://ddragon.leagueoflegends.com/cdn/12.3.1/img/item/1001.png
PEGAR ITEMS AQUI COM ID

https://ddragon.leagueoflegends.com/cdn/12.3.1/img/spell/SummonerFlash.png
PEGAR SPELLS AQUI

https://ddragon.leagueoflegends.com/cdn/12.3.1/img/profileicon/588.png
PLAYER ICONS AQUI