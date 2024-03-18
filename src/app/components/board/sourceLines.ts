// import BaseComponent from '../baseComponent/baseComponent';
// import SourceLine from './resultLine/resultLine';

// export default class LevelSources extends BaseComponent {
//   private sentences: string[];

//   public sourceLines: SourceLine[];

//   constructor(sentences: string[]) {
//     super({ tag: 'div' });
//     this.sentences = sentences;
//     this.sourceLines = [];
//     this.generateSourceLines();
//   }

//   private generateSourceLines(): void {
//     this.sentences.forEach((sentence: string) => {
//       const wordNum = sentence.split(' ').length;
//       const sourceLine = new SourceLine(wordNum, ['source-block']);
//       sourceLine.setAttribute('draggable', 'true');
//       this.sourceLines.push(sourceLine);
//     });
//   }
// }
