import Subtitle from '@subtitling/subtitle'
import SubripCue from '@subtitling/format/subrip/cue/subrip-cue.format'
import { subripParser } from '@subtitling/parser/subrip.parser'

class Subrip extends Subtitle {
  private cues: SubripCue[] = []

  constructor(
    protected file: Buffer,
    protected encoding = 'utf-8' as BufferEncoding
  ) {
    super(file, encoding)

    this.setEncoding(this.encoding)
    this.parser()
  }

  public parser(): void {
    this.cues = subripParser(this.stringify())
  }

  public setCues(content: SubripCue[]): this {
    this.cues = content
    return this
  }

  public getCues(): SubripCue[] {
    return this.cues
  }

  public getCue(index: number): SubripCue {
    return this.cues[index]
  }

  public getStrippedCues(): SubripCue[] {    
    const strippedContent = this.cues.map((cue: SubripCue) => {
      return new SubripCue({
        id: cue.getId(),
        time: cue.getTime(),
        text: cue.getStrippedText()
      })
    })

    return strippedContent
  }

  public getStringifiedStrippedCues(): string {
    const content = []
    this.cues.forEach((cue: SubripCue) => {
      content.push(
        `${cue.getId()}\n${cue.getStart().trim()} --> ${cue.getEnd().trim()}\n${cue.getStrippedText().join('\n')}\n\n`
      )
    })

    return content.join('')
  }

  public getFirstCue(): SubripCue {
    return this.cues[0]
  }

  public getLastCue(): SubripCue {
    return this.cues[this.cues.length - 1]
  }

  public getPart(from: number, to: number): SubripCue[] {
    const partialContent: SubripCue[] = []
    for (let i = from - 1; i <= to - 1; i++) {
      partialContent.push(this.cues[i])
    }

    return partialContent
  }

  public getStringifiedPart(from: number, to: number): string {
    const partialContent = this.getPart(from, to)
    const content = []
    partialContent.forEach((cue: SubripCue) => {
      content.push(
        `${cue.getId()}\n${cue.getStart().trim()} --> ${cue.getEnd().trim()}\n${cue.getText().join('\n')}\n\n`
      )
    })

    return content.join('')
  }

  public getAllCuesCPS(): number[] {
    return this.cues.map((cue: SubripCue) => cue.getCPS())
  }

  public getMaxCPS(): number {
    const cuesCPS = this.getAllCuesCPS()
    return Math.max(...cuesCPS)
  }

  public getMinCPS(): number {
    const cuesCPS = this.getAllCuesCPS()
    return Math.min(...cuesCPS)
  }

  public getCPSAverage(): number {
    const allCuesCPS = this.getAllCuesCPS()
    const CPSSum = allCuesCPS.reduce((p: number, c: number) => p + c, 0)

    const average = (CPSSum / allCuesCPS.length).toFixed(2)
    return Number(average)
  }

  public getAllCuesDuration(): number[] {
    return this.cues.map((cue: SubripCue) => cue.getDuration())
  }

  public getMaxDuration(): number {
    const cuesDuration = this.getAllCuesDuration()
    return Math.max(...cuesDuration)
  }

  public getMinDuration(): number {
    const cuesDuration = this.getAllCuesDuration()
    return Math.min(...cuesDuration)
  }

  public getDurationAverage(): number {
    const allCuesDuration = this.getAllCuesDuration()
    const durationSum = allCuesDuration.reduce((p: number, c: number) => p + c, 0)

    const average = (durationSum / allCuesDuration.length).toFixed(0)
    return Number(average)
  }
}

export default Subrip
