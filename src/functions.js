import { fetchData } from './http.js';


export function getStatusIndication(character) {
    if (character.health > 50) {
        return 'healthy';
    } else if (character.health > 15) {
        return 'wounded';
    } else {
        return 'critical';
    }
}


export function sortCharactersByHealth(characters) {
    return characters.sort((a, b) => b.health - a.health);
}



export function getLevel(userId) {
  const response = fetchData(`https://server/user/${userId}`);
  
  if (response.status === 'ok') {
     return `Ваш текущий уровень: ${response.level}`; 
  }
  
  return `Информация об уровне временно недоступна`;
}
