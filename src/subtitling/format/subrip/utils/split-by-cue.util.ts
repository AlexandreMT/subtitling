import { BuildParts, CalculateCuesCountByPart, Parts } from '@subrip/subrip.interface';

export function calculateCuesCount({
    cuesCount,
    totalPartsToSplit,
  }: CalculateCuesCountByPart
): number[] {
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
}

export function buildParts({
    totalCuesByPart,
  }: BuildParts
) {
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
}
