async function handler() {
  try {
    const leads = await sql`
      SELECT * FROM leads 
      ORDER BY data_cadastro DESC
    `;

    return {
      success: true,
      leads,
    };
  } catch (error) {
    return {
      success: false,
      error: "Erro ao buscar leads",
    };
  }
}