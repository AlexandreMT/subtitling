import SubripCue from '@subrip/cue/subrip-cue.format';
import { timestampToMilliseconds } from '@subrip/utils/time-converter.util';

export function subripParser(subtitle: string): SubripCue[] {
  const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
  subtitle = subtitle.replace(/\r/g, '');
  const splittedSubtitle = subtitle.split(regex);
  splittedSubtitle.shift();

  const cues: SubripCue[] = [];
  try {
    for (let i = 0; i < splittedSubtitle.length; i += 4) {
      const text = splittedSubtitle.at(i + 3)
        .split('\n')
        .filter((text: string) => text !== '');

      cues.push(new SubripCue({
        id: Number(splittedSubtitle.at(i).trim()),
        time: {
          startTime: splittedSubtitle.at(i + 1).trim(),
          endTime: splittedSubtitle.at(i + 2).trim(),
          startTimeMS: timestampToMilliseconds(splittedSubtitle.at(i + 1).trim()),
          endTimeMS: timestampToMilliseconds(splittedSubtitle.at(i + 2).trim()),
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
