
import { getStatusIndication, sortCharactersByHealth } from '../functions.js';
import { getLevel } from '../functions.js';

import { fetchData } from '../http.js';


jest.mock('../http.js');


const characters = [
  { name: 'мечник', health: 10 },
  { name: 'маг', health: 100 },
  { name: 'лучник', health: 80 },
  { name: 'лучник', health: 49 },
];


test.each([
  [characters[0], 'critical'],
  [characters[1], 'healthy'],
  [characters[2], 'healthy'],
  [characters[3], 'wounded'],
])(
  'getStatusIndication(%o) should return %s',
  (character, expected) => {
    expect(getStatusIndication(character)).toBe(expected);
  },
);

test('sortCharactersByHealth should return characters sorted by health', () => {
  const expected = [
    { name: 'маг', health: 100 },
    { name: 'лучник', health: 80 },
    { name: 'лучник', health: 49 },
    { name: 'мечник', health: 10 },
  ];

  expect(sortCharactersByHealth(characters)).toEqual(expected);
});


test("should return user level when status is ok", () => {
   fetchData.mockReturnValue({status: "ok", level: 5});
   const result = getLevel(123);
   expect(result).toBe("Ваш текущий уровень: 5");
});


test("should call fetchData with correct URL", () => {
    const userId = 123;
    getLevel(userId);
    expect(fetchData).toHaveBeenCalledWith(`https://server/user/${userId}`);
});


test("should retrun unavailable message when status is not ok", () => {
    fetchData.mockReturnValue({status: "error"});
    const result = getLevel(123);
    expect(result).toBe("Информация об уровне временно недоступна");
});