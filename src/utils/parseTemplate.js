export function parseTemplate(templateText) {
  const regex = /#{([^}]+)}/g;
  const variableNames = new Set();

  let match;
  while ((match = regex.exec(templateText)) !== null) {
    variableNames.add(match[1]);
  }

  return Array.from(variableNames);
}
