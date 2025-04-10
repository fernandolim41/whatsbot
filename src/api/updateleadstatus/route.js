async function handler({ leadId, status }) {
  if (!leadId || !status) {
    return {
      success: false,
      error: "ID do lead e status são obrigatórios",
    };
  }

  const validStatus = [
    "novo",
    "contatado",
    "qualificado",
    "fechado",
    "perdido",
  ];
  if (!validStatus.includes(status)) {
    return {
      success: false,
      error: "Status inválido",
    };
  }

  try {
    const result = await sql`
      UPDATE leads 
      SET status = ${status}
      WHERE id = ${leadId}
      RETURNING id, status
    `;

    if (result.length === 0) {
      return {
        success: false,
        error: "Lead não encontrado",
      };
    }

    return {
      success: true,
      lead: result[0],
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao atualizar status do lead",
    };
  }
}