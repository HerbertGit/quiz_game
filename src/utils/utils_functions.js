function scoreColor(score, maxScore) {
  const colorStep = 255 / maxScore;
  let red = 255;
  let green = 0;

  red = red - colorStep * score;
  green = green + colorStep * score;

  console.log(`score color: rgb(${red},${green},0) `);
  return `rgb(${red},${green}, 100)`;
}

export { scoreColor };
