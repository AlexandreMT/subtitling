export interface ISubripCue {
  id: number;
  time: ISubripCueTime;
  text: string[];
}

export interface ISubripCueTime {
  startTime: string;
  endTime: string;
  startTimeMS: number;
  endTimeMS: number;
}
