import { NextResponse } from 'next/server';
import { env } from '@/src/config/envs.config';

export async function POST(request: Request) {
  try {
    const { points } = await request.json();
  // Obtiene la URL del microservicio desde la variable de entorno
  const microserviceUrl = `${env.geoProcesorApiUrl}/${env.geoProcesorApiPath}` || 'http://127.0.0.1:3000/api/v1/interceptor';
    const res = await fetch(microserviceUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ points }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Microservice error' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}



export async function GET() {
  return NextResponse.json({ message: 'API ready' });
}