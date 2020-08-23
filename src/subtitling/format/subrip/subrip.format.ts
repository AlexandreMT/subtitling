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
    let content = ''
    this.cues.forEach((cue: SubripCue) => {
      content = content.concat(
        `${cue.getId()}\n${cue.getStart().trim()} --> ${cue.getEnd().trim()}\n${cue.getStrippedText().join('\n')}\n\n`
      )
    })

    return content
  }

  public getFirstCue(): SubripCue {
    return this.cues[0]
  }

  public getLastCue(): SubripCue {
    return this.cues[this.cues.length - 1]
  }

  public getPart(from: number, to: number): SubripCue[] {
    const partialContent: SubripCue[] = []
    this.cues.forEach((cue: SubripCue) => {
      if (cue.getId() >= from && cue.getId() <= to)
        partialContent.push(cue)
    })

    return partialContent
  }

  public getStringifiedPart(from: number, to: number): string {
    const partialContent = this.getPart(from, to)
    let content = ''
    partialContent.forEach((cue: SubripCue) => {
      content = content.concat(
        `${cue.getId()}\n${cue.getStart().trim()} --> ${cue.getEnd().trim()}\n${cue.getText().join('\n')}\n\n`
      )
    })

    return content
  }
}

export default Subrip
