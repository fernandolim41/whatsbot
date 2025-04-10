import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Método não permitido' });
  }

  const { nome, telefone, estabelecimento, cidade, estado, bairro } = req.body;

  if (!nome || !telefone || !estabelecimento || !cidade || !estado || !bairro) {
    return res.status(400).json({ success: false, error: 'Todos os campos são obrigatórios' });
  }

  const telefoneFormatado = telefone.replace(/\D/g, '');

  if (telefoneFormatado.length < 10 || telefoneFormatado.length > 11) {
    return res.status(400).json({ success: false, error: 'Número de telefone inválido' });
  }

  try {
    await sql`
      INSERT INTO leads (
        nome, telefone, estabelecimento, cidade, estado, bairro, status
      ) VALUES (
        ${nome}, ${telefoneFormatado}, ${estabelecimento}, ${cidade}, ${estado}, ${bairro}, 'novo'
      )
    `;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Erro no banco:', err);
    return res.status(500).json({ success: false, error: 'Erro ao salvar os dados' });
  }
}
