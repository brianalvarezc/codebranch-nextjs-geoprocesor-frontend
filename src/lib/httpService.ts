export class HttpService {
  async post<T>(url: string, body: any): Promise<T> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('HTTP error ' + response.status);
    const data = await response.json();
    return data;
  }
}

export const httpService = new HttpService();
