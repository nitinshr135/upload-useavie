export const exampleApiIsHit = async (): Promise<any> => {
  const res = await fetch("https://api.sampleapis.com/coffee/hot");
};
