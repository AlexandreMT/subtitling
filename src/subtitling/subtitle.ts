class Subtitle {
  private fileName = 'subtitling'

  constructor(
    protected file: Buffer,
    protected encoding = 'utf-8' as BufferEncoding
  ) {}

  public setFileName(name: string): boolean | string {
    if (!name) return false

    this.fileName = name
    return this.fileName
  }

  public getFileName(): string {
    return this.fileName
  }

  public getRawContent(): string {
    return this.file.toString(this.encoding)
  }

  public setEncoding(encoding: BufferEncoding): string {
    this.encoding = encoding
    return this.getRawContent()
  }

  public getEncoding(): string {
    return this.encoding
  }
}

export default Subtitle
