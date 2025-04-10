async function handler({
  nome,
  telefone,
  estabelecimento,
  cidade,
  estado,
  bairro,
}) {
  if (!nome || !telefone || !estabelecimento || !cidade || !estado || !bairro) {
    return {
      success: false,
      error: "Todos os campos são obrigatórios",
    };
  }

  const telefoneFormatado = telefone.replace(/\D/g, "");

  if (telefoneFormatado.length < 10 || telefoneFormatado.length > 11) {
    return {
      success: false,
      error: "Número de telefone inválido",
    };
  }

  try {
    await sql`
      INSERT INTO leads (
        nome, 
        telefone, 
        estabelecimento, 
        cidade, 
        estado, 
        bairro, 
        status
      ) VALUES (
        ${nome},
        ${telefoneFormatado},
        ${estabelecimento},
        ${cidade},
        ${estado},
        ${bairro},
        'novo'
      )
    `;

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao salvar os dados",
    };
  }
}