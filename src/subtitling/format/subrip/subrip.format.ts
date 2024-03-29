import Subtitle from '@subtitling/subtitle';
import SubripCue from '@subrip/cue/subrip-cue.format';
import { subripParser } from '@subrip/parser/subrip.parser';
import { calculateCuesCount, buildParts } from '@subrip/utils/split-by-cue.util';
import { Parts } from './subrip.interface';

class Subrip extends Subtitle {
  private cues: SubripCue[] = [];
  private parts: Parts[] = [];

  constructor(
    protected file: Buffer,
    protected encoding = 'utf-8' as BufferEncoding
  ) {
    super(file, encoding);

    this.setEncoding(this.encoding);
    this.parser();
  }

  public parser(): void {
    this.cues = subripParser(this.stringify());
  }

  public setCues(content: SubripCue[]): this {
    this.cues = content;
    return this;
  }

  public getCues(): SubripCue[] {
    return this.cues;
  }

  public getCue(index: number): SubripCue {
    return this.cues.at(index - 1);
  }

  public getStrippedCues(): SubripCue[] {    
    const strippedContent = this.cues.map((cue: SubripCue) => {
      return new SubripCue({
        id: cue.getId(),
        time: cue.getTime(),
        text: cue.getStrippedText()
      });
    });

    return strippedContent;
  }

  public getStringifiedStrippedCues(): string {
    const content = [];
    this.cues.forEach((cue: SubripCue) => {
      content.push(
        `${cue.getId()}\n${cue.getStart().trim()} --> ${cue.getEnd().trim()}\n${cue.getStrippedText().join('\n')}\n\n`
      );
    });

    return content.join('');
  }

  public getFirstCue(): SubripCue {
    return this.cues.at(0);
  }

  public getLastCue(): SubripCue {
    return this.cues.at(-1);
  }

  public getCuesCount(): number {
    return this.cues.length;
  }

  public getPart(from: number, to: number): SubripCue[] {
    const partialContent = this.cues.slice(from - 1, to);
    return partialContent;
  }

  public getSplittedParts(): Parts[] {
    return this.parts;
  }

  public getStringifiedPart(from: number, to: number): string {
    const partialContent = this.getPart(from, to);
    const content = [];

    partialContent.forEach((cue: SubripCue) => content.push(cue.stringify()));

    return content.join('\n\n');
  }

  public getAllCuesCPS(): number[] {
    return this.cues.map((cue: SubripCue) => cue.getCPS());
  }

  public getMaxCPS(): number {
    const cuesCPS = this.getAllCuesCPS();
    return Math.max(...cuesCPS);
  }

  public getMinCPS(): number {
    const cuesCPS = this.getAllCuesCPS();
    return Math.min(...cuesCPS);
  }

  public getCPSAverage(): number {
    const allCuesCPS = this.getAllCuesCPS();
    const CPSSum = allCuesCPS.reduce((p: number, c: number) => p + c, 0);

    const average = (CPSSum / allCuesCPS.length).toFixed(2);
    return Number(average);
  }

  public getAllCuesDuration(): number[] {
    return this.cues.map((cue: SubripCue) => cue.getDuration());
  }

  public getMaxDuration(): number {
    const cuesDuration = this.getAllCuesDuration();
    return Math.max(...cuesDuration);
  }

  public getMinDuration(): number {
    const cuesDuration = this.getAllCuesDuration();
    return Math.min(...cuesDuration);
  }

  public getDurationAverage(): number {
    const allCuesDuration = this.getAllCuesDuration();
    const durationSum = allCuesDuration.reduce((p: number, c: number) => p + c, 0);

    const average = (durationSum / allCuesDuration.length).toFixed(0);
    return Number(average);
  }

  public splitByCues(totalPartsToSplit: number): Parts[] {
    const totalCuesByPart = calculateCuesCount({ cuesCount: this.getCuesCount(), totalPartsToSplit });
    this.parts = buildParts({ totalCuesByPart });

    return this.parts;
  }

  public getStringifiedBuiltParts(): string[] {
    const stringifiedParts = [];

    this.parts.forEach((part: Parts) => {
      const partialContent = this.getPart(part.from, part.to);
      const content = [];

      partialContent.forEach((cue: SubripCue, cueIndex: number) => content.push(cue.stringify(cueIndex + 1)));

      stringifiedParts.push(content.join('\n\n'));
    });

    return stringifiedParts;
  }
}

export default Subrip;
