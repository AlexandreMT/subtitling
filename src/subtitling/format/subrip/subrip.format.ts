import Subtitle from '@subtitling/subtitle'
import SubripCue from '@subtitling/format/subrip/cue/subrip-cue.format'
import { subripParser } from '@subtitling/parser/subrip.parser'

class Subrip extends Subtitle {
  private content: SubripCue[] = []

  constructor(
    protected file: Buffer,
    protected encoding = 'utf-8' as BufferEncoding
  ) {
    super(file, encoding)

    this.setEncoding(this.encoding)
    this.parser()
  }

  public parser(): void {
    this.content = subripParser(this.getRawContent())
  }

  public setContent(content: SubripCue[]): this {
    this.content = content
    return this
  }

  public getContent(): SubripCue[] {
    return this.content
  }

  public getStrippedContent(): SubripCue[] {    
    const strippedContent = this.content.map((cue: SubripCue) => {
      return new SubripCue({
        id: cue.getId(),
        time: cue.getTime(),
        text: cue.getStrippedText()
      })
    })

    return strippedContent
  }

  public getRawStrippedContent(): string {
    let content = ''
    this.content.forEach((cue: SubripCue) => {
      content = content.concat(
        `${cue.getId()}\n${cue.getStart().trim()} --> ${cue.getEnd().trim()}\n${cue.getStrippedText().join('\n')}\n\n`
      )
    })

    return content
  }

  public getFirstCue(): SubripCue {
    return this.content[0]
  }

  public getLastCue(): SubripCue {
    return this.content[this.content.length - 1]
  }

  public getPart(from: number, to: number): SubripCue[] {
    const partialContent: SubripCue[] = []
    this.content.forEach((cue: SubripCue) => {
      if (cue.getId() >= from && cue.getId() <= to)
        partialContent.push(cue)
    })

    return partialContent
  }

  public getRawPart(from: number, to: number): string {
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
