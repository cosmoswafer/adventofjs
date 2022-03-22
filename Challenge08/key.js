const params = (new URL(document.location)).searchParams;
export const api_key = params.get('key');
