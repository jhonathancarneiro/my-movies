export function formatdate(data: string) {
  if (typeof data !== "string" || data.length < 10) {
    return "Data Inválida";
  }

  return data.substring(0, 10);
}
