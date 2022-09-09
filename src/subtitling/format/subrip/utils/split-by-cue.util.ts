import { BuildParts, CalculateCuesCountByPart, Parts } from '@subrip/subrip.interface';
import { errorHandler } from 'src/Helpers/error-handler.helper';

export function calculateCuesCount({
    cuesCount,
    totalPartsToSplit,
  }: CalculateCuesCountByPart
): number[] {
  try {
    const totalCuesByPart = Array<number>(totalPartsToSplit).fill(0);

    while (cuesCount > 0) {
      for (let i = 0; i < totalPartsToSplit; i++) {
        if (cuesCount > 0) {
          totalCuesByPart[i]++;
          cuesCount--;
        }
      }
    }

    return totalCuesByPart;
  } catch (error) {
    throw errorHandler('Error on calculateCuesCount', error);
  }
}

export function buildParts({
    totalCuesByPart,
  }: BuildParts
) {
  try {
    const parts: Parts[] = [];

    for (let i = 0; i < totalCuesByPart.length; i++) {
      if (i > 0) {
        totalCuesByPart[i] += totalCuesByPart.at(i - 1);
        parts.push({ from: totalCuesByPart.at(i - 1) + 1, to: totalCuesByPart.at(i) });
      } else {
        parts.push({ from: 1, to: totalCuesByPart.at(i) }); 
      }
    }

    return parts;
  } catch (error) {
    throw errorHandler('Error on build parts', error);
  }
}
