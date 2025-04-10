import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

async function handler({
  nome,
  telefone,
  estabelecimento,
  cidade,
  estado,
  bairro,
}) {
  // Validação
  if (!nome || !telefone || !estabelecimento || !cidade || !estado || !bairro) {
    return { success: false, error: 'Todos os campos são obrigatórios' };
  }

  const telefoneFormatado = telefone.replace(/\D/g, '');

  if (telefoneFormatado.length < 10 || telefoneFormatado.length > 11) {
    return { success: false, error: 'Número de telefone inválido' };
  }

  try {
    await sql`
      INSERT INTO leads (
        nome, telefone, estabelecimento, cidade, estado, bairro, status
      ) VALUES (
        ${nome}, ${telefoneFormatado}, ${estabelecimento}, ${cidade}, ${estado}, ${bairro}, 'novo'
      )
    `;

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Erro ao salvar os dados' };
  }
}

// 👉 Aqui está o que estava faltando:
export async function POST(req) {
  try {
    const body = await req.json();
    const result = await handler(body);

    return NextResponse.json(result); // 🔥 Aqui é o segredo!
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Erro inesperado no servidor' },
      { status: 500 }
    );
  }
}
