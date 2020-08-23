import {
  ISubripCue,
  ISubripCueTime
} from '@subtitling/format/subrip/cue/subrip-cue.interface'

class SubripCue {
  constructor(private cue: ISubripCue) {}

  public getId(): number {
    return this.cue.id
  }

  public getTime(): ISubripCueTime {
    return this.cue.time
  }

  public setText(text: string[]): string[] {
    this.cue.text = text
    return this.cue.text
  }

  public getText(): string[] {
    return this.cue.text
  }

  public getStrippedText(): string[] {
    const positioningPattern = /{[^}]+}/g
    const tagsPattern = /(<([^>]+)>)/gi

    const strippedText = this.cue.text.map((text: string) => {
      return text.replace(positioningPattern, '').replace(tagsPattern, '')
    })

    return strippedText
  }

  public getRawText(): string {
    return this.getText().join('\n')
  }

  public getStart(): string {
    return this.cue.time.startTime
  }

  public getEnd(): string {
    return this.cue.time.endTime
  }

  public getStartMS(): number {
    return this.cue.time.startTimeMS
  }

  public getEndMS(): number {
    return this.cue.time.endTimeMS
  }

  public getDuration(): number {
    return this.cue.time.endTimeMS - this.cue.time.startTimeMS
  }

  public getTextLength(): number {
    const strippedCues = this.getStrippedText()
    return strippedCues.join('').length
  }

  public getCPS(): number {
    const cps = this.getTextLength() / (this.getDuration() / 1000)
    return Number(cps.toFixed(2))
  }
}

export default SubripCue
