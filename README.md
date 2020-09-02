# Subtitling
------
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) ![Version](https://img.shields.io/github/package-json/v/AlexandreMT/subtitling)

> A subtitle parser written in TypeScript

```s
# yarn
yarn add subtitling

# npm
npm i --save subtitling
```

## Subrip
------

```typescript
import fs from 'fs'
import { Subrip } from 'subtitling'

const file = fs.readFileSync('path/to/subtitle.srt')

const subtitle = new Subrip(file)
console.log(subtitle.getFirstCue())
```

Output

```json
SubripCue {
  cue: {
    id: 1,
    time: {
      startTime: '00:00:23,046',
      endTime: '00:00:27,546',
      startTimeMS: 23046,
      endTimeMS: 27546
    },
    text: [ 'This is the first line.', 'This is the second line.' ]
  }
}
```
There are methods for cues, like: `getCPS()`, `getDuration()` and many others.

## Supported formats
- [x] Subrip (.srt)
- [ ] WebVTT (.vtt)