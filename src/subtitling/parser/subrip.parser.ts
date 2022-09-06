import SubripCue from '@subtitling/format/subrip/cue/subrip-cue.format';
import { timestampToMilliseconds } from '@utils/time-converter.util';

export function subripParser(subtitle: string): SubripCue[] {
  const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
  subtitle = subtitle.replace(/\r/g, '');
  const splittedSubtitle = subtitle.split(regex);
  splittedSubtitle.shift();

  const cues: SubripCue[] = [];
  try {
    for (let i = 0; i < splittedSubtitle.length; i += 4) {
      const text = splittedSubtitle[i + 3]
        .split('\n')
        .filter((text: string) => text !== '');
  
      cues.push(new SubripCue({
        id: Number(splittedSubtitle[i].trim()),
        time: {
          startTime: splittedSubtitle[i + 1].trim(),
          endTime: splittedSubtitle[i + 2].trim(),
          startTimeMS: timestampToMilliseconds(splittedSubtitle[i + 1].trim()),
          endTimeMS: timestampToMilliseconds(splittedSubtitle[i + 2].trim()),
        },
        text,
      }));
    }
  
    return cues;
  } catch (error) {
    if (error instanceof Error) throw { error: error.message };
    throw error;
  }
}
