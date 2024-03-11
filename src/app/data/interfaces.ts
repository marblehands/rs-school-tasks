export interface Data {
  rounds: Round[];
  roundsCount: number;
}

export interface Round {
  levelData: LevelData;
  words: Word[];
}

export interface LevelData {
  id: string;
  name: string;
  imageSrc: string;
  cutSrc: string;
  author: string;
  year: string;
}

export interface Word {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
  id: number;
  word: string;
  wordTranslate: string;
}

export interface WordFiltered {
  audioExample: string;
  textExample: string;
  textExampleTranslate: string;
}

export interface LevelFiltered {
  roundData: LevelData;
  sentences: WordFiltered[];
}
